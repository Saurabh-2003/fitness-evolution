'use client'

import { Input } from '@/components/ui/input'
import { Table } from '@tanstack/react-table'
import { DataTableFacetedFilter } from './user-data-table-faceted-filter'
import { Button } from '@/components/ui/button'
import { DataTableViewOptions } from './user-data-table-view-options'
import { DeleteIcon } from 'lucide-react'
import { roles } from './user-data-table-columns'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search User By Name"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="h-10 w-full  "
        />
        {/* {table.getColumn('role') && (
          <DataTableFacetedFilter column={table.getColumn('role')} title="Roles" options={roles} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <DeleteIcon className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
