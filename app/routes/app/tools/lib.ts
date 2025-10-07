import type { CalculationResult } from "~/components/calculator/types";
import type { Datasheet, DatasheetModifiers, WeaponProfile } from "~/components/datasheets/types";
import { getCumulativeProbabilities, getDiceProbabilities, getDiceSumDistribution, valueToTarget, type DiceProbability } from "~/lib/probability";

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
        const effectiveSave = Math.min(defender.stats.save + Math.abs(weapon.armorPenetration), defender.stats.invulnerableSave);
        const woundTarget = getWoundTarget(weapon.strength, defender.stats.toughness, modifiers);
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

const getDamageProbabilities = (weapon: WeaponProfile, unsavedWounds: DiceProbability[], modifiers: DatasheetModifiers): DiceProbability[] => {
  const damageProbabilities: DiceProbability[] = [];

}

export function calculateAttackSequence(
  attacks: number,
  sides: number,
  hitValue: number,
  woundValue: number,
  saveValue: number,
  modifiers: DatasheetModifiers,
): CalculationResult {

  // --- Stage 1: Calculate Hit Probabilities ---

  let hitProbabilities: DiceProbability[];

  // --- MODIFICATION START ---
  // Check for auto-hitting attacks.
  const pCritHit = (sides - modifiers.criticalHits + 1) / sides;
  const pSuccessHit = (sides - hitValue + 1) / sides;
  const pNormalHit = pSuccessHit - pCritHit;

  let effectivePHit = pSuccessHit;
  if (hitValue === 0) {
    // Manually construct the hit probabilities array.
    // The probability of getting exactly 'attacks' number of hits is 1.0.
    // The probability of getting any other number of hits is 0.
    hitProbabilities = new Array(attacks + 1);
    for (let i = 0; i <= attacks; i++) {
      const isTotalHits = (i === attacks);
      hitProbabilities[i] = {
        exact: isTotalHits ? 1.0 : 0.0,
        // The probability of getting i or more hits is 1.0 for all i <= attacks.
        orHigher: 1.0,
      };
    }
  } else {
    if (modifiers.sustainedHits && modifiers.sustainedHits > 0) {
      // With Sustained Hits, a '6' is worth (1 + X) hits.
      effectivePHit = pNormalHit + (1 + modifiers.sustainedHits) * pCritHit;
    }

    const hitTarget = sides - (sides * effectivePHit);
    hitProbabilities = getDiceProbabilities(attacks, sides, hitTarget, modifiers.rerollHits);
  }

  // --- Stage 2: Calculate Wound Probabilities ---

  let woundProbabilities: DiceProbability[];

  if (modifiers.lethalHits) {
    // Lethal Hits bypass the hit distribution. We calculate a new effective
    // probability from the start of the attack.
    const pWoundSuccess = (sides - woundValue + 1) / sides;
    const pFromLethal = pCritHit; // A '6' on the hit roll auto-wounds.
    const pFromNormal = pNormalHit * pWoundSuccess; // A normal hit that then wounds.

    const effectivePWound = pFromLethal + pFromNormal;
    const effectiveWoundTarget = sides - (sides * effectivePWound);

    // Note: This is an approximation based on the initial number of attacks.
    woundProbabilities = getDiceProbabilities(attacks, sides, effectiveWoundTarget);
  } else {
    // Standard calculation using the hit results.
    woundProbabilities = getCumulativeProbabilities(hitProbabilities, woundValue, attacks, sides);
  }

  // --- Stage 3: Calculate Unsaved Wound Probabilities ---

  let unsavedWoundProbabilities: DiceProbability[];
  const saveTarget = valueToTarget(saveValue, sides);
  if (modifiers.devastatingWounds) {
    // Devastating Wounds bypass the save roll. We calculate a new effective
    // probability for a wound to get past the save.
    const pCritWound = 1 / sides;
    const pSuccessWound = (sides - woundValue + 1) / sides;
    const pNormalWound = pSuccessWound - pCritWound;
    const pFailedSave = (saveValue - 1) / sides;

    const pFromDevastating = pCritWound; // A '6' on the wound roll.
    const pFromNormalUnsaved = pNormalWound * pFailedSave;

    const effectivePUnsaved = pFromDevastating + pFromNormalUnsaved;
    const effectiveUnsavedTarget = sides - (sides * effectivePUnsaved);

    // This calculation assumes Lethal Hits do not trigger Devastating Wounds.
    // We apply this effective probability to the results of the wound stage.
    unsavedWoundProbabilities = getCumulativeProbabilities(woundProbabilities, effectiveUnsavedTarget, attacks, sides);

  } else {
    // Standard save calculation.
    unsavedWoundProbabilities = getCumulativeProbabilities(woundProbabilities, saveTarget, attacks, sides);
  }

  return {
    hits: hitProbabilities,
    wounds: woundProbabilities,
    saves: unsavedWoundProbabilities,
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

  const finalHits: DiceProbability[] = Array(maxAttacks + 1).fill(0).map(() => ({ exact: 0, orHigher: 0 }));
  const finalWounds: DiceProbability[] = Array(maxAttacks + 1).fill(0).map(() => ({ exact: 0, orHigher: 0 }));
  const finalUnsaved: DiceProbability[] = Array(maxAttacks + 1).fill(0).map(() => ({ exact: 0, orHigher: 0 }));

  // *** THIS LOOP IS THE PRIMARY CHANGE ***
  // Iterate over the DiceProbability[] array.
  for (let rollSum = 0; rollSum < attackDistribution.length; rollSum++) {
    const probOfRoll = attackDistribution[rollSum].exact;
    if (probOfRoll === 0) continue; // Skip sums with zero probability

    const numAttacks = rollSum + attackBonus;

    const sequenceResult = calculateAttackSequence(
      numAttacks, sides, hitValue, woundValue, saveValue, modifiers
    );

    for (let i = 0; i <= numAttacks; i++) {
      finalHits[i].exact += sequenceResult.hits[i]?.exact * probOfRoll || 0;
      finalWounds[i].exact += sequenceResult.wounds[i]?.exact * probOfRoll || 0;
      finalUnsaved[i].exact += sequenceResult.saves[i]?.exact * probOfRoll || 0;
    }
  }

  // Recalculate 'orHigher' probabilities from the final 'exact' values.
  let cumulativeHits = 0, cumulativeWounds = 0, cumulativeUnsaved = 0;
  for (let i = maxAttacks; i >= 0; i--) {
    cumulativeHits += finalHits[i].exact;
    finalHits[i].orHigher = cumulativeHits;

    cumulativeWounds += finalWounds[i].exact;
    finalWounds[i].orHigher = cumulativeWounds;

    cumulativeUnsaved += finalUnsaved[i].exact;
    finalUnsaved[i].orHigher = cumulativeUnsaved;
  }

  return {
    attacks: attackDistribution,
    hits: finalHits,
    wounds: finalWounds,
    saves: finalUnsaved,
  };
}

export const getDatasheetStatString = (datasheet: Datasheet) => {
  return `T${datasheet.stats.toughness} W${datasheet.stats.wounds}  ${datasheet.stats.save}+ ${datasheet.stats.invulnerableSave}++ ${datasheet.stats.feelNoPain? datasheet.stats.feelNoPain + '+++':''  }`.trim();
};
