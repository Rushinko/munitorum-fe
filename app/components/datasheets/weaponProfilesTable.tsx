


import React from 'react'
// Imports for Badge added, Table components removed
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import type { DatasheetModifiers, WeaponProfile, WeaponStats } from './types'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import ModifiersDialog from './modifiersDialog'

// This component now assumes your WeaponProfile type in './types'
// has an optional 'modifiers' property:
// export type WeaponProfile = {
//   id: string;
//   name: string;
//   A: string;
//   WS: string;
//   S: string;
//   AP: string;
//   D: string;
//   modifiers?: string[]; // <-- ADD THIS
// }

const ModifierChip = ({ modifier }: { modifier: DatasheetModifiers }) => (
  <Badge variant="secondary" className="font-normal">
    {Object.keys(modifier)[0]} {/* Display the first key as an example */}
  </Badge>
);

type WeaponProfilesListProps = {
  profiles: WeaponProfile[];
  onProfileChange: (id: string, name: keyof Omit<WeaponProfile, 'id'>, e: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileRemove: (id: string) => void;
}

// Define stat keys explicitly to avoid iterating over 'id', 'name', or 'modifiers'
const statKeys: (keyof WeaponStats)[] = ['attacks', 'weaponSkill', 'strength', 'armorPenetration', 'damage'];
const statHeaders = ['A', 'WS', 'S', 'AP', 'D'];

// Renamed component to reflect it's no longer a table
export default function WeaponProfilesList({ profiles, onProfileChange, onProfileRemove }: WeaponProfilesListProps) {

  const handleUpdateWeaponProfile = (id: string, name: keyof Omit<WeaponProfile, 'id'>, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Updating profile:', id, name, e.target.value);
    onProfileChange(id, name, e);
  };

  const handleRemoveProfile = (id: string) => {
    onProfileRemove(id);
  };

  return (
    <div className="space-y-2 px-2 w-full">

      {/* ---- HEADERS (replaces TableHeader) ---- */}
      <div className="grid grid-cols-[minmax(0,_2.5fr)_repeat(5,_minmax(0,_1fr))_minmax(0,_auto)] gap-1 md:gap-2 items-center px-1 border-b border-input pt-4">
        <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase">Name</div>
        {statHeaders.map(header => (
          <div key={header} className="text-xs md:text-sm font-semibold text-muted-foreground uppercase text-center">{header}</div>
        ))}
        {/* Spacer for actions column */}
        <div className="w-12" aria-hidden="true" />
      </div>

      {/* ---- PROFILES LIST (replaces TableBody) ---- */}
      <div className="space-y-2 overflow-x-auto">
        {profiles.map((profile) => (
          // This div is the new "row" container
          <div key={profile.id} className="rounded-lg hover:bg-muted/50 transition-colors">

            {/* --- Main Profile Row (replaces TableRow) --- */}
            <div className="grid grid-cols-[minmax(0,_2.5fr)_repeat(5,_minmax(0,_1fr))_minmax(0,_auto)] gap-1 md:gap-2 items-center ">

              {/* Name Input (replaces TableCell) */}
              <div>
                <Input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={(e) => handleUpdateWeaponProfile(profile.id, 'name', e)}
                  placeholder="Weapon Name"
                  className="!text-xs md:text-sm"
                />
              </div>

              {/* Stat Inputs (replaces mapping TableCells) */}
              {statKeys.map(statKey => (
                <div key={statKey} className="text-center min-w-8">
                  <Input
                    className='!text-xs !md:text-md text-center'
                    type="text"
                    name={statKey}
                    value={profile[statKey]}
                    onChange={e => handleUpdateWeaponProfile(profile.id, statKey, e)}
                  />
                </div>
              ))}

              {/* Actions (replaces TableCell) */}
              <div className="flex justify-end items-center">
                <ModifiersDialog />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveProfile(profile.id)}
                  aria-label="Remove Profile"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* ---- [NEW] MODIFIERS ROW (OPTIONAL) ---- */}
            {profile.modifiers && profile.modifiers.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-3 pb-2 pt-1 border-t border-dashed border-accent">
                {profile.modifiers.map((modifier, index) => (
                 <ModifierChip key={index} modifier={modifier} />
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}
