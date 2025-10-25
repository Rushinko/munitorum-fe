import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import React from 'react'
import { Edit } from 'lucide-react'
import { defaultDatasheetModifiers, type DatasheetModifiers } from './types'

export default function ModifiersDialog() {
  const modifiers: DatasheetModifiers = defaultDatasheetModifiers
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm underline underline-offset-4"><Edit size={16} /></button>
      </DialogTrigger>
      <DialogContent className="max-w-lg ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Modifiers</DialogTitle>
        </DialogHeader>
        <div className='flex flex-wrap flex-row gap-4 p-4 justify-start'>

          {
            Object.keys(modifiers).map((key) => (
              <div key={key} className="flex flex-row gap-2 space-x-2  rounded-lg p-2 items-center text-center mb-4">
                <label htmlFor={key} className='mb-1 text-end flex justify-end '>
                  {key}
                </label>
                {typeof modifiers[key as keyof DatasheetModifiers] === 'boolean' ? (
                  <input
                    id={key}
                    name={key}
                    type="checkbox"
                    value={modifiers[key as keyof DatasheetModifiers] as unknown as string}
                    checked={modifiers[key as keyof DatasheetModifiers] as boolean}
                    onChange={(e) => console.log(key, e.target.checked)}
                  />
                ) : typeof modifiers[key as keyof DatasheetModifiers] === 'number' ? (
                  <input
                    id={key}
                    name={key}
                    type="number"
                    className='max-w-12 flex text-center border border-input rounded px-2 py-1'
                    value={modifiers[key as keyof DatasheetModifiers] as number}
                    onChange={(e) => console.log(key, parseInt(e.target.value, 10))}
                  />
                ) : (
                  <select
                    value={modifiers[key as keyof DatasheetModifiers] as string}
                    onChange={(e) => console.log(key, e.target.value)}
                    className='w-24 max-w-24 border border-input rounded px-2 py-1'
                  >
                    <option value="none">None</option>
                    <option value="fails">Fails</option>
                    <option value="ones">Ones</option>
                    {
                      key !== 'rerollSaves' && <option value="non-crits">Non-Crits</option>
                    }
                  </select>
                )}
              </div>
            ))
          }
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition">Save</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
