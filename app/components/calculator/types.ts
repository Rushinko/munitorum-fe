import type { D } from "node_modules/framer-motion/dist/types.d-Cjd591yU";
import type { DiceProbability, Probabilities } from "~/lib/probability";

export type CalculationResult = {
  attacker?: string;
  defender?: string;
  weapon?: string;
  attacks: number | DiceProbability[]
  mortalWounds?: DiceProbability[]
  hits: DiceProbability[];
  wounds: DiceProbability[];
  unsaved: DiceProbability[];
  devastatingWounds: DiceProbability[];
  damagePerModel?: number | DiceProbability[];
  totalDamage?: number | DiceProbability[];
};

export type SaveStageResult = {
  unsavedNormalWounds: DiceProbability[];
  devastatingWounds: DiceProbability[];
  totalUnsaved: DiceProbability[];
};

export type VariableDiceResult = {
  count: number;
  sides: number;
  additional: number;
};