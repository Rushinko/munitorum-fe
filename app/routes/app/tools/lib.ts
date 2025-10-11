import type { CalculationResult } from "~/components/calculator/types";
import type { Datasheet, DatasheetModifiers, WeaponProfile } from "~/components/datasheets/types";
import { convolvePower, getBinomialDistribution, getConvolvedDistribution, getCumulativeProbabilities, getDiceProbabilities, getDiceSumDistribution, trimInsignificantProbabilities, valueToTarget, type DiceProbability } from "~/lib/probability";

const SIDES = 6;

const parseDice = (damage: string) => {
  const cleanString = damage.trim().toUpperCase();
  const diceRegex = /^(\d*)D(\d+)(?:\+(\d+))?$/;
  const match = cleanString.match(diceRegex);
  if (match) {
    const count = match[1] === '' ? 1 : parseInt(match[1], 10);
    const sides = match[2] === '' ? 0 : parseInt(match[2], 10);
    const additional = match[3] === '' || match[3] === undefined ? 0 : parseInt(match[3], 10);
    return { count, sides, additional };
  }
  const flatRegex = /^\d+$/;
  if (cleanString.match(flatRegex)) {
    return { count: 0, sides: 0, additional: parseInt(cleanString, 10) };
  }
  return null;
};



export const runCalculation = (attackers: Datasheet[], defenders: Datasheet[], modifiers: DatasheetModifiers): CalculationResult[] | null => {
  const results: CalculationResult[] = [];
  attackers.forEach(attacker => {
    defenders.forEach(defender => {
      attacker.weaponProfiles.forEach(weapon => {
        const attacks = parseDice(weapon.attacks.toString());
        const isVariableAttacks = (!(attacks?.count === 0 || attacks === null || attacks.count === undefined) && attacks?.count > 0);
        const effectiveSave = Math.min(defender.stats.save + Math.abs(weapon.armorPenetration), defender.stats.invulnerableSave === 0 ? 7 : defender.stats.invulnerableSave);
        const woundTarget = getWoundTarget(weapon.strength, defender.stats.toughness, modifiers);
        console.log(woundTarget);
        let result: CalculationResult = { hits: [], wounds: [], saves: [] };
        if (isVariableAttacks) {
          result = calculateVariableAttackSequence(
            attacks.count * attacker.models,
            attacks.sides,
            attacks.additional * attacker.models,
            SIDES,
            weapon.weaponSkill,
            woundTarget,
            effectiveSave,
            modifiers
          );
        }
        else {
          result = calculateAttackSequence(
            attacker.models * parseInt(weapon.attacks, 10),
            SIDES,
            weapon.weaponSkill,
            woundTarget,
            effectiveSave,
            modifiers
          );
        }
        const avgDamage = averageDamage(weapon.damage);
        const avgTotalDamage = result.saves.reduce((sum, dp) => sum + dp.exact * dp.orHigher, 0) * avgDamage;
        const avgDamagePerModel = avgTotalDamage / attacker.models;
        result.attacker = attacker.name;
        result.damagePerModel = avgDamagePerModel;
        result.defender = defender.name;
        result.weapon = weapon.name;
        results.push(result);
      });
    });
  });
  console.log("Full calculation results:", results);
  return results.length > 0 ? results : null;
};

const averageDamage = (damage: string): number => {
  const parsed = parseDice(damage);
  if (parsed) {
    const { count, sides, additional } = parsed;
    if (count === 0) {
      return additional;
    }
    return (count * (sides + 1)) / 2 + additional;
  }
  return 0;
};

/**
 * Determines the target number needed to wound a target based on the attacker's strength and the target's toughness.
 * @param strength The strength of the attacking unit.
 * @param toughness The toughness of the defending unit.
 * @param modifiers Any modifiers that may affect the wound calculation.
 * @returns The target number needed to successfully wound the target.
 */
const getWoundTarget = (strength: number, toughness: number, modifiers: DatasheetModifiers): number => {
  let ret;
  if (strength >= 2 * toughness) ret = 2;
  else if (strength > toughness) ret = 3;
  else if (strength === toughness) ret = 4;
  else if (strength * 2 <= toughness) ret = 6;
  else ret = 5;
  if (modifiers.woundModifier !== 0) {
    ret -= modifiers.woundModifier;
    if (ret < 2) ret = 2;
    if (ret > 6) ret = 6;
  }
  return ret;
};

/**
 * Calculates the probability of rolling a target value or higher on a die.
 * e.g., a 4+ on a d6 is getSuccessProbability(4, 6) = 3/6 = 0.5.
 */
function getSuccessProbability(targetValue: number, sides: number): number {
  if (targetValue <= 1) return 1.0;
  if (targetValue > sides) return 0.0;
  return (sides - targetValue + 1) / sides;
}

/**
 * Creates a probability distribution for an auto-success event.
 */
function createAutoSuccessDistribution(count: number): DiceProbability[] {
  const distribution: DiceProbability[] = Array(count + 1);
  for (let i = 0; i <= count; i++) {
    distribution[i] = {
      exact: (i === count) ? 1.0 : 0.0,
      orHigher: 1.0,
    };
  }
  return distribution;
}

/**
 * Recalculates the 'orHigher' probabilities from the 'exact' ones.
 */
function recalculateOrHigher(probabilities: DiceProbability[]): void {
  let cumulativeProb = 0;
  for (let i = probabilities.length - 1; i >= 0; i--) {
    cumulativeProb += probabilities[i].exact;
    probabilities[i].orHigher = cumulativeProb;
  }
}


function processHitStage(
  attacks: number,
  sides: number,
  hitValue: number,
  modifiers: DatasheetModifiers
): DiceProbability[] {
  // Handle auto-hitting attacks
  if (hitValue === 0) {
    return createAutoSuccessDistribution(attacks);
  }

  // Sustained Hits requires the convolution method.
  if (modifiers.sustainedHits && modifiers.sustainedHits > 0) {
    const pSuccess = getSuccessProbability(hitValue, sides);
    
    // If Sustained Hits is active, the default critical hit should be the highest
    // face of the die (e.g., 6), not an impossible value.
    const critTarget = modifiers.criticalHits > 0 ? modifiers.criticalHits : sides;

    const pCrit = getSuccessProbability(critTarget, sides);
    
    // Ensure pNormal isn't negative if hit and crit values overlap.
    const pNormal = Math.max(0, pSuccess - pCrit);
    const pMiss = 1 - pNormal - pCrit;

    const numBonusHits = modifiers.sustainedHits;
    const maxHitsFromOneDie = 1 + numBonusHits;

    // Create the probability distribution for a SINGLE die roll.
    const singleDieDistribution = new Array(maxHitsFromOneDie + 1).fill(0);

    singleDieDistribution[0] = pMiss;
    if (pNormal > 0) { singleDieDistribution[1] = pNormal; }
    if (pCrit > 0) { singleDieDistribution[maxHitsFromOneDie] = pCrit; }
    
    // Convolve the distribution for the total number of attacks.
    const exactProbabilities = convolvePower(singleDieDistribution, attacks);

    // Convert the result into the DiceProbability[] format.
    const hitProbabilities: DiceProbability[] = exactProbabilities.map(p => ({ exact: p, orHigher: 0 }));
    recalculateOrHigher(hitProbabilities);
    return hitProbabilities;

  } else {
    // Standard logic for non-sustained hits.
    return getDiceProbabilities(attacks, sides, hitValue, modifiers.rerollHits);
  }
}

function processWoundStage(
  attacks: number,
  hitProbabilities: DiceProbability[],
  sides: number,
  hitValue: number,
  woundValue: number,
  modifiers: DatasheetModifiers
): DiceProbability[] {
  // Standard calculation: apply wound probability to the distribution of hits.
  if (!modifiers.lethalHits) {
    return getCumulativeProbabilities(hitProbabilities, woundValue, attacks, sides);
  }

  // --- Lethal Hits Logic ---
  const critTarget = (modifiers.criticalHits && modifiers.criticalHits > 0) ? modifiers.criticalHits : sides;
  const pSuccessHit = getSuccessProbability(hitValue, sides);
  
  // Avoid division by zero if hits are impossible
  if (pSuccessHit === 0) {
    const emptyDist = new Array(attacks + 1).fill(0).map(() => ({ exact: 0, orHigher: 0 }));
    emptyDist[0].orHigher = 1.0;
    return emptyDist;
  }
  
  const pCritHit = getSuccessProbability(critTarget, sides);
  
  // Probability that a successful hit is a critical one (and thus auto-wounds).
  const pCritGivenSuccess = pCritHit / pSuccessHit;
  const pWoundOnNormalHit = getSuccessProbability(woundValue, sides);

  const maxWounds = hitProbabilities.length - 1;
  const finalWoundProbs = new Array(maxWounds + 1).fill(0);

  // For each possible number of hits...
  for (let numHits = 1; numHits <= maxWounds; numHits++) {
    const probOfThisManyHits = hitProbabilities[numHits].exact;
    if (probOfThisManyHits === 0) continue;

    // ...calculate the distribution of how many of those hits were criticals.
    const critDistribution = getBinomialDistribution(numHits, pCritGivenSuccess);
    
    for (let numCrits = 0; numCrits <= numHits; numCrits++) {
      const probOfThisManyCrits = critDistribution[numCrits];
      if (probOfThisManyCrits === 0) continue;
      
      const numNormalHits = numHits - numCrits;
      
      // For the remaining normal hits, calculate the distribution of successful wounds.
      const normalWoundDistribution = getBinomialDistribution(numNormalHits, pWoundOnNormalHit);

      for (let numNormalWounds = 0; numNormalWounds <= numNormalHits; numNormalWounds++) {
        const probOfThisManyNormalWounds = normalWoundDistribution[numNormalWounds];
        if (probOfThisManyNormalWounds === 0) continue;
        
        const totalWounds = numCrits + numNormalWounds; // Auto-wounds + normal wounds
        
        // The final probability is the chain of all events occurring.
        finalWoundProbs[totalWounds] += probOfThisManyHits * probOfThisManyCrits * probOfThisManyNormalWounds;
      }
    }
  }

  // The chance of getting 0 wounds is 1 minus the chance of getting any wound.
  // Or more simply, add the probability of getting 0 hits in the first place.
  finalWoundProbs[0] = hitProbabilities[0]?.exact ?? 0;
  let totalProb = finalWoundProbs.reduce((sum, p) => sum + p, 0);
  finalWoundProbs[0] += (1 - totalProb); // Account for rounding errors and the 0-hit case.

  // Convert to the final format.
  const woundDistribution: DiceProbability[] = finalWoundProbs.map(p => ({ exact: p, orHigher: 0 }));
  recalculateOrHigher(woundDistribution); // Your existing helper to fill in 'orHigher'
  
  return woundDistribution;
}

function processSaveStage(
  attacks: number, // Max possible successes
  woundProbabilities: DiceProbability[],
  sides: number,
  woundValue: number,
  saveValue: number,
  modifiers: DatasheetModifiers
): DiceProbability[] {
  // Standard calculation: apply save probability to the distribution of wounds.
  if (!modifiers.devastatingWounds) {
    return getCumulativeProbabilities(woundProbabilities, saveValue, attacks, sides);
  }

  // --- Devastating Wounds Logic ---
  const pSuccessWound = getSuccessProbability(woundValue, sides);

  // Avoid division by zero if wounds are impossible.
  if (pSuccessWound === 0) {
    const emptyDist = new Array(attacks + 1).fill(0).map(() => ({ exact: 0, orHigher: 0 }));
    emptyDist[0].orHigher = 1.0;
    return emptyDist;
  }
  
  // IMPORTANT: Devastating Wounds typically triggers on a 6 to wound, regardless of hit modifiers.
  const critWoundTarget = sides; 
  const pCritWound = getSuccessProbability(critWoundTarget, sides);

  // Probability that a successful wound is a critical one (and thus auto-succeeds).
  const pCritGivenSuccess = pCritWound / pSuccessWound;
  const pFailedSaveOnNormalWound = 1 - getSuccessProbability(saveValue, sides);

  const maxUnsaved = woundProbabilities.length - 1;
  const finalUnsavedProbs = new Array(maxUnsaved + 1).fill(0);

  // For each possible number of incoming wounds...
  for (let numWounds = 1; numWounds <= maxUnsaved; numWounds++) {
    const probOfThisManyWounds = woundProbabilities[numWounds].exact;
    if (probOfThisManyWounds === 0) continue;

    // ...calculate the distribution of how many of those wounds were criticals.
    const critDistribution = getBinomialDistribution(numWounds, pCritGivenSuccess);
    
    for (let numCrits = 0; numCrits <= numWounds; numCrits++) {
      const probOfThisManyCrits = critDistribution[numCrits];
      if (probOfThisManyCrits === 0) continue;
      
      const numNormalWounds = numWounds - numCrits;
      
      // For the remaining normal wounds, calculate the distribution of failed saves.
      const failedSavesDistribution = getBinomialDistribution(numNormalWounds, pFailedSaveOnNormalWound);

      for (let numFailedSaves = 0; numFailedSaves <= numNormalWounds; numFailedSaves++) {
        const probOfThisManyFailedSaves = failedSavesDistribution[numFailedSaves];
        if (probOfThisManyFailedSaves === 0) continue;
        
        const totalUnsaved = numCrits + numFailedSaves; // Auto-successes + failed saves
        
        // The final probability is the chain of all events occurring.
        finalUnsavedProbs[totalUnsaved] += probOfThisManyWounds * probOfThisManyCrits * probOfThisManyFailedSaves;
      }
    }
  }

  // The chance of getting 0 unsaved wounds includes the chance of getting 0 wounds to begin with.
  finalUnsavedProbs[0] += woundProbabilities[0]?.exact ?? 0;
  // Normalize to account for any floating point dust.
  const totalProb = finalUnsavedProbs.reduce((sum, p) => sum + p, 0);
  if (totalProb < 1.0) {
    finalUnsavedProbs[0] += (1 - totalProb);
  }

  // Convert to the final format.
  const unsavedDistribution: DiceProbability[] = finalUnsavedProbs.map(p => ({ exact: p, orHigher: 0 }));
  recalculateOrHigher(unsavedDistribution);
  
  return unsavedDistribution;
}

export function calculateAttackSequence(
  attacks: number,
  sides: number,
  hitValue: number,
  woundValue: number,
  saveValue: number,
  modifiers: DatasheetModifiers,
): CalculationResult {
  const attackProbabilities = getDiceProbabilities(attacks, sides, 1); // Every attack is a "success"

  // --- Stage 1: Hits ---
  const hitProbabilities = processHitStage(attacks, sides, hitValue, modifiers);

  // --- Stage 2: Wounds ---
  const woundProbabilities = processWoundStage(attacks, hitProbabilities, sides, hitValue, woundValue, modifiers);

  // --- Stage 3: Unsaved Wounds ---
  const unsavedWoundProbabilities = processSaveStage(attacks, woundProbabilities, sides, woundValue, saveValue, modifiers);

  return {
    attacks: attackProbabilities, 
    hits: trimInsignificantProbabilities(hitProbabilities),
    wounds: trimInsignificantProbabilities(woundProbabilities),
    saves: trimInsignificantProbabilities(unsavedWoundProbabilities),
  };
}

export function calculateVariableAttackSequence(
  attackDiceNum: number,
  attackDiceSides: number,
  attackBonus: number,
  sides: number,
  hitValue: number,
  woundValue: number,
  saveValue: number,
  modifiers: DatasheetModifiers,
): CalculationResult {
  const attackDistribution = getDiceSumDistribution(attackDiceNum, attackDiceSides);
  const maxAttacks = (attackDistribution.length - 1) + attackBonus;

  // Initialize empty result arrays
  const finalResult: CalculationResult = {
    attacks: attackDistribution,
    hits: Array(maxAttacks + 1).fill(null).map(() => ({ exact: 0, orHigher: 0 })),
    wounds: Array(maxAttacks + 1).fill(null).map(() => ({ exact: 0, orHigher: 0 })),
    saves: Array(maxAttacks + 1).fill(null).map(() => ({ exact: 0, orHigher: 0 })),
  };

  // Iterate over each possible number of attacks
  for (let rollSum = 0; rollSum < attackDistribution.length; rollSum++) {
    const probOfThisManyAttacks = attackDistribution[rollSum].exact;
    if (probOfThisManyAttacks === 0) continue;

    const numAttacks = rollSum + attackBonus;
    const sequenceResult = calculateAttackSequence(
      numAttacks, sides, hitValue, woundValue, saveValue, modifiers
    );

    // Weight the results of this sequence by its probability and add to the final tally
    for (let i = 0; i <= numAttacks; i++) {
      finalResult.hits[i].exact += (sequenceResult.hits[i]?.exact ?? 0) * probOfThisManyAttacks;
      finalResult.wounds[i].exact += (sequenceResult.wounds[i]?.exact ?? 0) * probOfThisManyAttacks;
      finalResult.saves[i].exact += (sequenceResult.saves[i]?.exact ?? 0) * probOfThisManyAttacks;
    }
  }

  // Recalculate cumulative probabilities for the final distributions
  recalculateOrHigher(finalResult.hits);
  recalculateOrHigher(finalResult.wounds);
  recalculateOrHigher(finalResult.saves);

  // --- FINAL STEP: Trim the results before returning ---
  return {
    attacks: finalResult.attacks,
    hits: trimInsignificantProbabilities(finalResult.hits),
    wounds: trimInsignificantProbabilities(finalResult.wounds),
    saves: trimInsignificantProbabilities(finalResult.saves),
  };
};

export const getDatasheetStatString = (datasheet: Datasheet) => {
  return `T${datasheet.stats.toughness} W${datasheet.stats.wounds}  ${datasheet.stats.save}+ ${datasheet.stats.invulnerableSave}++ ${datasheet.stats.feelNoPain? datasheet.stats.feelNoPain + '+++':''  }`.trim();
};
