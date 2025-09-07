export type Datasheet = {
  id: string;
  name: string;
  models: number;
  stats: DatasheetStats;
  weaponProfiles: WeaponProfile[];
};

export type DatasheetStats = {
  movement: number;
  toughness: number;
  wounds: number;
  save: number;
  invulnerableSave: number;
  feelNoPain: number;
}

export type WeaponProfile = {
  id: string;
  name: string;
  attacks: number;
  weaponSkill: number;
  strength: number;
  armorPenetration: number;
  damage: string;
};

export type WeaponStats = Omit<WeaponProfile, 'id'>;

export type DatasheetActions = {
  updateDatasheet: (datasheetId: string, data: Partial<Datasheet>) => void;
  updateDatasheetField: (datasheetId: string, field: keyof Datasheet, value: string | number) => void;
  updateDatasheetStat: (datasheetId: string, stat: keyof DatasheetStats, value: string | number) => void;
  addWeaponProfile: (datasheetId: string) => void;
  removeWeaponProfile: (datasheetId: string, profileId: string) => void;
  updateWeaponProfile: (datasheetId: string, profileId: string, field: keyof Omit<WeaponProfile, 'id'>, value: string | number) => void;
}

export const defaultDatasheet: Omit<Datasheet, 'id'> = {
  name: 'New Datasheet',
  models: 1,
  stats: {
    movement: 0,
    toughness: 0,
    wounds: 0,
    save: 0,
    invulnerableSave: 0,
    feelNoPain: 0,
  },
  weaponProfiles: [],
};

export enum DatasheetStatShorthand {
  movement = 'M',
  toughness = 'T',
  wounds = 'W',
  save = 'Sv',
  invulnerableSave = 'InvSv',
  feelNoPain = 'FNP',
}

export const omitKeys = (key: string) => key !== 'id' && key !== 'name' && key !== 'weaponProfiles';
