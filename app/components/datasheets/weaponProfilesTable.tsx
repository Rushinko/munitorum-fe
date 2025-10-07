import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import type { WeaponProfile, WeaponStats } from './types'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'


type WeaponProfilesTableProps = {
  profiles: WeaponProfile[];
  onProfileChange: (id: string, name: keyof Omit<WeaponProfile, 'id'>, e: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileRemove: (id: string) => void;
}



export default function WeaponProfilesTable({ profiles, onProfileChange, onProfileRemove }: WeaponProfilesTableProps) {

  const handleUpdateWeaponProfile = (id: string, name: keyof Omit<WeaponProfile, 'id'>, e: React.ChangeEvent<HTMLInputElement>) => {
    onProfileChange(id, name, e);
  };

  const handleRemoveProfile = (id: string) => {
    onProfileRemove(id);
  };

  return (
      <Table className="text-left">
        <TableHeader className="border-b border-accent">
          <TableRow>
            <TableHead className="p-3 text-sm font-semibold text-muted-foreground uppercase w-40">Name</TableHead>
            <TableHead className="p-3 text-sm font-semibold text-muted-foreground uppercase text-center w-24">A</TableHead>
            <TableHead className="p-3 text-sm font-semibold text-muted-foreground uppercase text-center w-16">WS</TableHead>
            <TableHead className="p-3 text-sm font-semibold text-muted-foreground uppercase text-center w-16">S</TableHead>
            <TableHead className="p-3 text-sm font-semibold text-muted-foreground uppercase text-center w-16">AP</TableHead>
            <TableHead className="p-3 text-sm font-semibold text-muted-foreground uppercase text-center w-24">D</TableHead>
          </TableRow>
        </TableHeader>
          <TableBody className="min-w-full">
            {profiles.map((profile) => (
              <TableRow key={profile.id} className="border-b border-accent hover:bg-muted transition-colors">
                <TableCell>
                  <Input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={(e) => handleUpdateWeaponProfile(profile.id, 'name', e)}
                    placeholder="Weapon Name"
                    className=""
                  />
                </TableCell>
                {/* The key for the mapped input is now the stat name */}
                {Object.keys(profile).filter(key => key !== 'id' && key !== 'name').map(stat => (
                  <TableCell key={stat}>
                    <Input
                      type="text"
                      name={stat}
                      value={profile[stat as keyof WeaponStats]}
                      onChange={e => handleUpdateWeaponProfile(profile.id, stat as keyof WeaponStats, e)}
                    />
                  </TableCell>
                ))}
                <TableCell className="text-end">
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveProfile(profile.id)}
                    aria-label="Remove Profile"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
  )
}
