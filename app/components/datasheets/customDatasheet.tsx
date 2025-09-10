import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '../ui/card/card';
import { Input } from '../ui/input';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { type WeaponProfile, type Datasheet, type DatasheetActions, DatasheetStatShorthand, omitKeys, type DatasheetStats, type WeaponStats } from './types';
import WeaponProfilesTable from './weaponProfilesTable';

// Define a TypeScript interface for the structure of a weapon profile.
// This ensures type safety for all profile objects.
// A simple SVG icon for the delete button. No changes needed here.
type DatasheetCardProps = {
  datasheet: Datasheet,
  actions: DatasheetActions,
}

// Main application component, now a React Functional Component (FC).
const DatasheetCard: React.FC<DatasheetCardProps> = ({ datasheet, actions }: DatasheetCardProps) => {
  const { weaponProfiles } = datasheet;
  const { updateDatasheetStat, updateDatasheetField, updateWeaponProfile, addWeaponProfile, removeWeaponProfile } = actions;

  /**
   * Handles changes to datasheet input fields on the datasheet
   * Parameters are now typed for better code safety and autocompletion.
   * @param {keyof Omit<Datasheet, 'id' | 'name' | 'profiles'>} field - The field being updated.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleDatasheetStatChange = (field: keyof DatasheetStats, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateDatasheetStat(datasheet.id, field, value);
  };

  const handleDatasheetFieldChange = (field: keyof Datasheet, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateDatasheetField(datasheet.id, field, value);
  };

  /**
   * Handles changes to any weapon profile field in the table.
   * Parameters are now typed for better code safety and autocompletion.
   * @param {number} id - The unique ID of the profile being edited.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleWeaponProfileUpdate = (id: string, field: keyof Omit<WeaponProfile, 'id'>, value: string | number) => {
    updateWeaponProfile(datasheet.id, id, field, value);
  };

  /**
   * Adds a new, empty weapon profile to the end of the list.
   * The newProfile object must conform to the WeaponProfile interface.
   */
  const addProfile = () => {
    console.log("Adding new weapon profile...");
    addWeaponProfile(datasheet.id);
  };

  /**
   * Removes a weapon profile from the list based on its ID.
   * The 'id' parameter is explicitly typed as a number.
   * @param {number} id - The unique ID of the profile to remove.
   */
  const removeProfile = (id: string) => {
    removeWeaponProfile(datasheet.id, id);
  };

  return (
    <Card className='max-w-2xl'>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className='gap-2 flex flex-row w-full justify-between'>
          <input
            type="text"
            // onChange={(e) => updateDatasheetName(datasheet.id, e.target.value)}
            placeholder='Datasheet name'
            value={datasheet.name}
            onChange={(e) => handleDatasheetFieldChange('name', e)}
            className="text-xl font-bold transition-[color,box-shadow] rounded-sm outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          />
          <div className='flex flex-row'>
            <Label htmlFor='models' className='mr-2'>Models</Label>
            <Input
              key='models'
              type="number"
              className='max-w-20 text-start'
              value={datasheet.models}
              onChange={(e) => handleDatasheetFieldChange('models', e)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto gap-2 flex flex-col">
        <div className='flex flex-row flex-grow gap-2 justify-around'>
          {Object.keys(datasheet.stats).filter(omitKeys).map((key) => (
            <div key={key} className="p-3 flex flex-col text-center justify-center">
              <Label htmlFor={key} className='mb-1 text-center flex justify-center'>
                {DatasheetStatShorthand[key as keyof typeof DatasheetStatShorthand] || key}
              </Label>
              <Input
                type='text'
                name={key}
                value={datasheet.stats[key as keyof DatasheetStats]}
                onChange={(e) => handleDatasheetStatChange(key as keyof DatasheetStats, e)}
                className="flex justify-center text-center max-w-16"
              />
            </div>
          ))
          }
        </div>
        {
          weaponProfiles.length > 0 && (
            <WeaponProfilesTable profiles={weaponProfiles} onProfileChange={handleWeaponProfileUpdate} onProfileRemove={removeProfile} />
          )
        }
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={addProfile}

        >
          + Add Weapon Profile
        </Button>
      </div>
    </Card >

  );
}

export default DatasheetCard;
