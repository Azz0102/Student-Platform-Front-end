"use client"

import { DownloadIcon } from "@radix-ui/react-icons"


import { exportTableToCSV } from "@/lib/export"
import { Button } from "@/components/ui/button"

import { DeleteTasksDialog } from "./delete-tasks-dialog"
import { useRouter } from 'next/navigation';

export function TasksTableToolbarActions({
  table,
}) {

  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            table.toggleAllRowsSelected(false)
            router.refresh();
          }}
        />
      ) : null}
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
