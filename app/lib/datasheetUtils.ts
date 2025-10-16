import type { Datasheet } from "~/components/datasheets/types";

export const getDatasheetStatString = (datasheet: Datasheet) => {
  return `T${datasheet.stats.toughness} W${datasheet.stats.wounds}  ${datasheet.stats.save}+ ${datasheet.stats.invulnerableSave}++ ${datasheet.stats.feelNoPain? datasheet.stats.feelNoPain + '+++':''  }`.trim();
};