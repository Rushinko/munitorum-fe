import type { D } from "node_modules/framer-motion/dist/types.d-Cjd591yU";
import type { DiceProbability, Probabilities } from "~/lib/probability";

export type CalculationResult = {
  attacker?: string;
  defender?: string;
  weapon?: string;
  attacks?: number | DiceProbability[]
  mortalWounds?: DiceProbability[]
  hits: DiceProbability[];
  wounds: DiceProbability[];
  saves: DiceProbability[];
  damagePerModel?: number | DiceProbability[];
  totalDamage?: number | DiceProbability[];
};