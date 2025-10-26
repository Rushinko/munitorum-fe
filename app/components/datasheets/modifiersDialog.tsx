import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import React from 'react'
import { Edit } from 'lucide-react'
import { defaultDatasheetModifiers, defaultWeaponProfileModifiers, type DatasheetModifiers, type WeaponProfile, type WeaponProfileModifiers } from './types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { Toggle } from '../ui/toggle'

type ModifierDialogProps = {
  modifiers: Partial<WeaponProfileModifiers>;
  id: string
  updateModifier: (key: string, value: any) => void;
}

export default function ModifiersDialog({ modifiers, id, updateModifier }: ModifierDialogProps) {

  const handleUpdateModifier = (key: string, value: any) => {
    const newModifiers = { ...modifiers, [key]: value };
    updateModifier(id, newModifiers);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-xs underline w-8 underline-offset-4"><Edit size={12} /></Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Modifiers</DialogTitle>
        </DialogHeader>
        <div className='flex flex-wrap flex-row gap-4 p-4 justify-start'>

          {
            Object.keys(modifiers).map((key) => (
              <div key={key} className="flex flex-row gap-2 rounded-lg p-2 items-center text-center mb-4">
                {typeof modifiers[key as keyof WeaponProfileModifiers] === 'boolean' ? (
                  <Toggle
                    aria-label={key}
                    className='data-[state=on]:bg-primary data-[state=off]:bg-muted h-8 px-3 rounded-lg'
                    id={key}
                    name={key}
                    pressed={modifiers[key as keyof WeaponProfileModifiers] as boolean}
                    onPressedChange={(value) => handleUpdateModifier(key, value)}
                  >
                    {key}
                  </Toggle>
                ) : typeof modifiers[key as keyof WeaponProfileModifiers] === 'number' ? (
                  <>
                    <Label htmlFor={key} className='mb-1 text-end text-sm flex justify-end '>
                      {key}
                    </Label>
                    <Input
                      id={key}
                      name={key}
                      type="number"
                      className='max-w-12 flex text-center border border-input rounded px-2 py-1'
                      value={modifiers[key as keyof WeaponProfileModifiers] as number}
                      onChange={(e) => handleUpdateModifier(key, parseInt(e.target.value) || 0)}
                    />
                  </>
                ) : (
                  null
                )}
              </div>
            ))
          }
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="default">Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
