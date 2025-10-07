import React from 'react'
import type { DatasheetModifiers } from './types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { camelCaseToString } from '~/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

type ModifiersTableProps = {
  modifiers: DatasheetModifiers;
  updateModifier: (key: string, value: any) => void;
}

export default function ModifiersTable({ modifiers, updateModifier }: ModifiersTableProps) {
  return (
    <Accordion type="single" collapsible className='w-full' >
      <AccordionItem value="weapon-profiles" >
        <AccordionTrigger className='text-xl text-center rounded w-full px-4 hover:bg-accent/20 duration-200'>
          Modifiers
        </AccordionTrigger>
        <AccordionContent className='flex flex-wrap flex-row gap-6 p-4 justify-start'>
          {Object.keys(modifiers).map((key) => (
            <div key={key} className="flex flex-row gap-2 justify-end items-center text-center">
              <Label htmlFor={key} className='mb-1 text-end flex justify-end '>
                {camelCaseToString(key)}
              </Label>
              {typeof modifiers[key as keyof DatasheetModifiers] === 'boolean' ? (
                <Checkbox
                  id={key}
                  name={key}
                  checked={modifiers[key as keyof DatasheetModifiers] as boolean}
                  onCheckedChange={(value) => updateModifier(key, value)}
                />
              ) : typeof modifiers[key as keyof DatasheetModifiers] === 'number' ? (
                <Input
                  id={key}
                  name={key}
                  type="number"
                  className='max-w-12 flex text-center'
                  value={modifiers[key as keyof DatasheetModifiers] as number}
                  onChange={(e) => updateModifier(key, parseInt(e.target.value, 10))}
                />
              ) : (
                <Select value={modifiers[key as keyof DatasheetModifiers] as string} onValueChange={(value) => updateModifier(key, value)}>
                  <SelectTrigger className='w-24 max-w-24'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="ones">Ones</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem >
    </Accordion >
  )
}
