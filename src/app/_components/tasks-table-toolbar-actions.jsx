"use client"

import { DownloadIcon,PlusCircledIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { exportTableToCSV } from "@/lib/export"
import { Button } from "@/components/ui/button"

import { DeleteTasksDialog } from "./delete-tasks-dialog"
import { useRouter } from 'next/navigation';
import { Input26, Input8 } from "@/components/Input"
import { useSelector } from "react-redux"
import { CreactTaskSheet } from "./creact-task-sheet"

export function TasksTableToolbarActions({
  table,
  setLoadingDelete,
  onOpenChange
}) {

  const router = useRouter();
  const selected = useSelector((state) => state.adminContent.selectedContent);

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            table.toggleAllRowsSelected(false)
            setLoadingDelete(true)
          }}
        />
      ) : null}

      {(selected == 6 || selected == 7) && <Input26 />}
      {selected == 8 && <Input8 />}
      
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        asChild
      >
        <div>
          <PlusCircledIcon className="size-4" aria-hidden="true" />
          <CreactTaskSheet setLoadingDelete={setLoadingDelete}  onOpenChange={onOpenChange} />
        </div>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "tasks",
            excludeColumns: ["select", "actions"],
          })
        }
        className="gap-2"
      >
        <DownloadIcon className="size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
