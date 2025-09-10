import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { defaultDatasheet, type Datasheet } from "~/components/datasheets/types";
import { v4 as uuidv4 } from 'uuid';
import type { DatasheetActions, DatasheetStats } from "~/components/datasheets/types";
import { da } from "zod/v4/locales";

type ToolsState = {
  attackersIds: string[],
  defendersIds: string[],
  datasheets: Datasheet[],
}

type ToolsActions = {
  addDatasheet: () => string;
  removeDatasheet: (datasheetId: string) => void;
  datasheetActions: DatasheetActions;
  addAttacker: (datasheetId: string) => void;
  addDefender: (datasheetId: string) => void;
}

type ToolsStore = ToolsState & ToolsActions;

const useToolsStore = create<ToolsStore>()(immer((set) => ({
  attackersIds: [],
  defendersIds: [],
  datasheets: [],
  addDatasheet: () => {
    const newId = uuidv4();
    set(state => {
      state.datasheets.push({ id: newId, ...defaultDatasheet });
    });
    return newId;
  },
  removeDatasheet: (datasheetId) => set(state => ({
    datasheets: state.datasheets.filter(ds => ds.id !== datasheetId)
  })),
  datasheetActions: {
    updateDatasheet: (datasheetId, data) => set(state => ({
      datasheets: state.datasheets.map(ds =>
        ds.id === datasheetId ? { ...ds, ...data } : ds
      )
    })),
    updateDatasheetStat: (datasheetId, stat, value) => {
      set(state => {
        const datasheet = state.datasheets.find((ds) => ds.id === datasheetId);
        if (datasheet?.stats) {
          (datasheet.stats[stat] as typeof value) = value;
        }
      });
    },
    updateDatasheetField(datasheetId, field, value) {
      set(state => {
        const datasheet = state.datasheets.find((ds) => ds.id === datasheetId);
        if (datasheet) {
          (datasheet[field] as typeof value) = value;
        }
      });
    },
    addWeaponProfile: (datasheetId) => set(state => ({
      datasheets: state.datasheets.map(ds =>
        ds.id === datasheetId
          ? { ...ds, weaponProfiles: [...ds.weaponProfiles, { id: uuidv4(), name: '', attacks: 0, weaponSkill: 0, strength: 0, armorPenetration: 0, damage: 0 }] }
          : ds
      )
    })),
    removeWeaponProfile: (datasheetId, profileId) => set(state => ({
      datasheets: state.datasheets.map(ds =>
        ds.id === datasheetId
          ? { ...ds, weaponProfiles: [...ds.weaponProfiles, { id: uuidv4(), name: '', attacks: 0, weaponSkill: 0, strength: 0, armorPenetration: 0, damage: 0 }] }
          : ds
      )
    })),
    updateWeaponProfile: (datasheetId, profileId, field, value) => set(state => {
      const datasheet = state.datasheets.find(ds => ds.id === datasheetId);
      if (!datasheet) return;
      const profile = datasheet.weaponProfiles.find(p => p.id === profileId);
      if (!profile) return;
      (profile[field] as typeof value) = value;
    })
  },
  addAttacker: (datasheetId) => set(state => ({
    attackersIds: [...state.attackersIds, datasheetId]
  })),
  addDefender: (datasheetId) => set(state => ({
    defendersIds: [...state.defendersIds, datasheetId]
  })),

})));

export default useToolsStore;
