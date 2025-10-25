
import React, { useState } from 'react';
import { Card } from '../ui/card/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { type WeaponProfile, type Datasheet, type DatasheetActions, DatasheetStatShorthand, omitKeys, type DatasheetStats } from './types';
import WeaponProfilesTable from './weaponProfilesTable';
import { ChevronDown, Trash } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { data } from 'react-router';
import { Separator } from '../ui/separator';
import { getDatasheetStatString } from '~/lib/datasheetUtils';


// Define a TypeScript interface for the structure of a weapon profile.
// This ensures type safety for all profile objects.
// A simple SVG icon for the delete button. No changes needed here.
type DatasheetCardProps = {
  datasheet: Datasheet,
  actions: DatasheetActions,
  className?: string,
}

// Main application component, now a React Functional Component (FC).
const DatasheetCard: React.FC<DatasheetCardProps> = ({ datasheet, actions, className }: DatasheetCardProps) => {
  const { weaponProfiles } = datasheet;
  const { updateDatasheetStat, updateDatasheetField, updateWeaponProfile, addWeaponProfile, removeWeaponProfile, deleteDatasheet } = actions;

  const handleDeleteDatasheet = () => {
    if (deleteDatasheet) deleteDatasheet(datasheet.id);
  };

  const handleToggleOpen = () => {
    if (datasheet.open !== undefined) {
      updateDatasheetField(datasheet.id, 'open', !datasheet.open);
    }
  }

  /**
   * Handles changes to datasheet input fields on the datasheet
   * Parameters are now typed for better code safety and autocompletion.
   * @param {keyof Omit<Datasheet, 'id' | 'name' | 'profiles'>} field - The field being updated.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleDatasheetStatChange = (field: keyof DatasheetStats, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = parseInt(value, 10);
    // Ensure we only pass numbers to stats
    const valueToUse = isNaN(parsedValue) ? 0 : parsedValue;
    updateDatasheetStat(datasheet.id, field, valueToUse);
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
  const handleWeaponProfileUpdate = (id: string, field: keyof Omit<WeaponProfile, 'id'>, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (field === 'damage' || field === 'attacks' || field === 'name') {
      updateWeaponProfile(datasheet.id, id, field, value);
      return;
    }
    const parsedValue = parseInt(value, 10);
    // Ensure we only pass numbers to stats
    const valueToUse = isNaN(parsedValue) ? 0 : parsedValue;
    updateWeaponProfile(datasheet.id, id, field, valueToUse);
  };

  /**
   * Adds a new, empty weapon profile to the end of the list.
   * The newProfile object must conform to the WeaponProfile interface.
   */
  const addProfile = () => {
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
    <Card className={`flex w-full flex-col min-w-xs ${className}`} >
      <Collapsible className='flex w-full flex-col' defaultOpen open={datasheet.open} onOpenChange={handleToggleOpen}>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center ">
          <div className='gap-2 flex flex-row w-full justify-between'>
            <div className='flex flex-row gap-2 items-center self-center'>

              <CollapsibleTrigger asChild>
                <Button variant="ghost" className='p-0 w-2 sm:w-4 sm:mr-2'><ChevronDown className={`transition-transform duration-200 ${datasheet.open ? "rotate-180" : "rotate-0"}`} /></Button>
              </CollapsibleTrigger>
              <div className='flex flex-row gap-2 items-center'>

                <input
                  type="text"
                  // onChange={(e) => updateDatasheetName(datasheet.id, e.target.value)}
                  placeholder='Datasheet name'
                  value={datasheet.name}
                  onChange={(e) => handleDatasheetFieldChange('name', e)}
                  className={`text-md sm:text-xl w-full font-bold transition-[color,box-shadow] rounded-sm outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`}
                />
                {
                  !datasheet.open && (
                    <span className='flex text-nowrap w-fit justify-end text-xs mr-2 italic text-muted-foreground'>{getDatasheetStatString(datasheet)}</span>
                  )
                }
              </div>
            </div>

            <div className='flex flex-row gap-2 items-center'>
              <div className='flex flex-row items-center text-end'>

                <Label htmlFor='models' className='mr-2 text-xs sm:text-sm'>Models</Label>
                <Input
                  key='models'
                  type="number"
                  className='max-w-20 text-xs sm:max-w-20 text-start'
                  value={datasheet.models}
                  onChange={(e) => handleDatasheetFieldChange('models', e)}
                />
              </div>
              {
                deleteDatasheet && (
                  <Button
                    variant="ghost"
                    onClick={handleDeleteDatasheet}
                    aria-label="Remove Datasheet"
                  >
                    <Trash />
                  </Button>
                )
              }
            </div>
          </div>
        </div>
        <CollapsibleContent className='w-full flex flex-col mt-6'>
          {/* <Separator className='mb-2' /> */}
          <div className="overflow-x-auto gap-2 flex flex-col">
            <div className='flex flex-row flex-grow gap-2 justify-evenly'>
              {Object.keys(datasheet.stats).filter(omitKeys).map((key) => (
                <div key={key} className=" flex flex-col text-center justify-center">
                  <Label htmlFor={key} className='mb-1 text-center text-xs sm:text-sm flex justify-center'>
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
              variant="outline"
            >
              + Add Weapon Profile
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card >

  );
}

export default DatasheetCard;
