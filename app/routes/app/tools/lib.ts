import { da } from "zod/v4/locales";
import type { Datasheet } from "~/components/datasheets/types";

export const calculateCombat = (attackers: Datasheet[], defenders: Datasheet[]) => {
  attackers.forEach(attacker => {
    defenders.forEach(defender => {
      console.log(`Calculating combat between attacker ${attacker.name} and defender ${defender.name}`);
      // Placeholder for actual combat calculation logic
      attacker.weaponProfiles.forEach(weapon => {
        console.log(` - Attacker weapon: ${weapon.name}`);
        const avgDamage = averageDamage(weapon.damage);
      });
    });
  });
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

const averageDamage = (damage: string) => {
  const parsed = parseDamageDice(damage);
  if (parsed) {
    const { count, sides, additional } = parsed;
    if (count === 0) {
      return additional;
    }
    return (count * (sides + 1)) / 2 + additional;
  }
  return null;
};

const calculateHits = (weaponSkill: number, attacks: number) => {
  const averageNumberOfHits = 6 - (weaponSkill - 1);
  return (averageNumberOfHits / 6) * attacks;
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

const calculateSaveChance = (save: number, armorPenetration: number, hasCover: boolean) => {
   let effectiveSave = save - Math.abs(armorPenetration);
  if (hasCover) {
    effectiveSave += 1;
  }
  return effectiveSave / 6;
};
