import { number } from "zod";
import { da } from "zod/v4/locales";
import type { Datasheet, WeaponProfile } from "~/components/datasheets/types";

const SIDES = 6;

export const runCalculation = (attackers: Datasheet[], defenders: Datasheet[]) => {
  attackers.forEach(attacker => {
    defenders.forEach(defender => {
      console.log(`Calculating combat between attacker ${attacker.name} and defender ${defender.name}`);
      // Placeholder for actual combat calculation logic
      attacker.weaponProfiles.forEach(weapon => {
        console.log(` - Attacker weapon: ${weapon.name}`);
        const avgDamage = averageDamage(weapon.damage);
        const hits = calculateHits(weapon.weaponSkill, weapon.attacks * attacker.models);
      });
    });
  });
};

export const calculateWeapon = (weapon: WeaponProfile, defender: Datasheet, cover: boolean = false) => {
  const avgDamage = averageDamage(weapon.damage);
  const hits = calculateHits(weapon.weaponSkill, weapon.attacks);
  const wounds = hits * calculateWoundChance(weapon.strength, defender.stats.toughness);
  const saves = wounds * calculateSaveChance(defender.stats.save, weapon.armorPenetration, cover, defender.stats.invulnerableSave);
  let modelsKilled = 0;
  if (defender.stats.feelNoPain <= 0) {
    modelsKilled = saves * avgDamage / defender.stats.wounds;
  }
  else {
    modelsKilled = calculateAverageKillsFocused(
      defender.models,
      defender.stats.wounds,
      saves,
      avgDamage,
      defender.stats.feelNoPain,
    );
  }
  return { hits, wounds, saves, modelsKilled };
};

export const parseDamageDice = (damage: string) => {
  const cleanString = damage.trim().toUpperCase();
  const diceRegex = /^(\d*)D(\d+)(?:\+(\d+))?$/;
  const match = cleanString.match(diceRegex);
  if (match) {
    const count = parseInt(match[1], 10);
    const sides = parseInt(match[2], 10);
    const additional = parseInt(match[3], 10);
    return { count, sides, additional };
  }
  const flatRegex = /^\d+$/;
  if (cleanString.match(flatRegex)) {
    return { count: 0, sides: 0, additional: parseInt(cleanString, 10) };
  }
  return null;
};

const averageDamage = (damage: string): number => {
  const parsed = parseDamageDice(damage);
  if (parsed) {
    const { count, sides, additional } = parsed;
    if (count === 0) {
      return additional;
    }
    return (count * (sides + 1)) / 2 + additional;
  }
  return 0;
};

const calculateHits = (weaponSkill: number, attacks: number): number => {

  const hitsChance = (SIDES - weaponSkill + 1) / SIDES;
  console.log(weaponSkill, attacks, hitsChance);
  return hitsChance * attacks;
};

const calculateWoundChance = (strength: number, toughness: number) => {
  if (strength * 2 <= toughness) {
    return 1 / 6;
  }
  if (strength < toughness) {
    return 1 / 3
  }
  if (strength === toughness) {
    return 1 / 2;
  }
  if (strength >= toughness * 2) {
    return 5 / 6;
  }
  if (strength > toughness) {
    return 5 / 6;
  }
  return 0;
};

const calculateSaveChance = (save: number, armorPenetration: number, hasCover: boolean, invulnerableSave?: number) => {
  let effectiveSave = save + Math.abs(armorPenetration);
  if (hasCover) {
    effectiveSave -= 1;
  }
  if (invulnerableSave && invulnerableSave > 0 && effectiveSave < invulnerableSave) {
    effectiveSave = invulnerableSave;
  }
  const saveChance = diceOdds(6, effectiveSave);
  return saveChance;
};

const calculateFeelNoPain = (numberOfWounds: number, feelNoPainSave: number, damage: number, health: number) => {
  if (numberOfWounds <= 0 || feelNoPainSave <= 0 || damage <= 0) return numberOfWounds;
  if (health < damage) {
    const oddsOfModelNotDying = probabilityOfAtLeast(6, numberOfWounds, (damage - health + 1), feelNoPainSave);
  }
  return 0;
};

const diceOdds = (sides: number, target: number) => {
  const intTarget = Math.floor(target);
  const intSides = Math.floor(sides);
  if (intTarget === 1) {
    return 1;
  }
  if (intTarget > intSides) {
    return 0;
  }
  return (intSides - intTarget + 1) / intSides;
};

const factorialCache: { [key: number]: number } = {};

const factorial = (n: number): number => {
  if (n < 0) throw new Error("Negative factorial not defined");
  if (n === 0) return 1;
  if (factorialCache[n]) return factorialCache[n];
  factorialCache[n] = n * factorial(n - 1);
  return factorialCache[n];
};

const combinations = (n: number, r: number): number => {
  if (r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
};

const probabilityOfExactly = (sides: number, rolls: number, needed: number, target: number): number => {
  if (sides < 0 || rolls < 0 || needed < 0 || target < 0) return 0;

  const successfulOutcomes = sides - Math.floor(target);
  if (successfulOutcomes <= 0) return needed === 0 ? 1 : 0; // If success is impossible, prob is 100% only if 0 successes are needed.
  if (successfulOutcomes >= sides) return needed === rolls ? 1 : 0; // If success is guaranteed, prob is 100% only if all dice are successes.
  const p = successfulOutcomes / sides;

  // Binomial probability formula
  const numberOfCombinations = combinations(rolls, needed);
  const probOfSuccess = Math.pow(p, needed);
  const probOfFailure = Math.pow(1 - p, rolls - needed);
  return numberOfCombinations * probOfSuccess * probOfFailure;
};

const probabilityOfAtLeast = (sides: number, rolls: number, needed: number, target: number): number => {
  let totalProbability = 0;
  for (let i = needed; i <= rolls; i++) {
    totalProbability += probabilityOfExactly(sides, rolls, i, target);
  }
  return totalProbability;
};

const calculateAverageKillsFocused = (models: number, health: number, attacks: number, damage: number, fnp: number): number => {
  // STEP 1: Pre-calculate the damage probability distribution
  const pSave = diceOdds(6, fnp);
  const damageProbDist: number[] = new Array(damage + 1).fill(0);
  for (let saves = 0; saves <= damage; saves++) {
    const effDamage = damage - saves;
    const prob = combinations(damage, saves) * Math.pow(pSave, saves) * Math.pow(1 - pSave, damage - saves);
    damageProbDist[saves] = prob;
  }

  // STEP 2: Initialize the state probabilities
  let stateProbabilities = new Map<string, number>();
  stateProbabilities.set(`${0},${health}`, 1); // Start with all models at full health

  // STEP 3: Iterate through each attack
  for (let i = 0; i < attacks; i++) {
    const newStateProbabilities = new Map<string, number>();

    stateProbabilities.forEach((stateProb, stateKey) => {
      const [killed, currentHealth] = stateKey.split(',').map(Number);
      if (killed >= models) {
        // All models are already killed
        newStateProbabilities.set(stateKey, (newStateProbabilities.get(stateKey) || 0) + stateProb);
        return;
      }

      // Apply each possible damage outcome
      damageProbDist.forEach((pDamage, saves) => {
        const effDamage = damage - saves;
        let newHealth = currentHealth - effDamage;
        let newKilled = killed;
        const probOfOutcome = stateProb * pDamage

        if (newHealth <= 0) {
          newKilled += 1;
          newHealth = health; // Reset health for the next model
        }

        const newStateKey = `${newKilled},${newHealth}`;
        newStateProbabilities.set(newStateKey, (newStateProbabilities.get(newStateKey) || 0) + probOfOutcome);
      });
    });

    stateProbabilities = newStateProbabilities;
  }

  // STEP 4: Calculate the final expected value
  let averageKills = 0;

  stateProbabilities.forEach((stateProb, stateKey) => {
    const [killed, currentHealth] = stateKey.split(',').map(Number);
    averageKills += killed * stateProb;
  });

  return averageKills;
}
