"use client"

import React, { useMemo, useState } from "react"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { toSentenceCase } from "@/lib/utils"
import { getPriorityIcon, getStatusIcon } from "../_lib/utils"
import { DeleteTasksDialog } from "./delete-tasks-dialog"
import { useFeatureFlags } from "./feature-flags-provider"
import { getColumns } from "./tasks-table-columns"
import { TasksTableFloatingBar } from "./tasks-table-floating-bar"
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions"
import { UpdateTaskSheet } from "./update-task-sheet"

// Định nghĩa các giá trị enum dưới dạng hằng số
const STATUS_VALUES = ["todo", "in-progress", "done", "canceled"]
const PRIORITY_VALUES = ["low", "medium", "high"]

export function TasksTable({ promises }) {
  const { featureFlags } = useFeatureFlags()

  const [{ data, pageCount }, statusCounts, priorityCounts] =
    React.use(promises)
  // const [results, setResults] = useState(promises)
  // promises.then((resolvedPromises) => {
  //   setResults(resolvedPromises)
  // })

  // console.log('results',results)

  // const [{ data, pageCount }, statusCounts, priorityCounts] = results || [
  //   { data: [], pageCount: 0 },
  //   {},
  //   {},
  // ]

  const [rowAction, setRowAction] = useState(null)

  const columns = useMemo(() => getColumns({ setRowAction }), [setRowAction])

  const filterFields = [
    {
      id: "title",
      label: "Title",
      placeholder: "Filter titles...",
    },
    // {
    //   id: "status",
    //   label: "Status",
    //   options: STATUS_VALUES.map((status) => ({
    //     label: toSentenceCase(status),
    //     value: status,
    //     icon: getStatusIcon(status),
    //     count: statusCounts[status],
    //   })),
    // },
    // {
    //   id: "priority",
    //   label: "Priority",
    //   options: PRIORITY_VALUES.map((priority) => ({
    //     label: toSentenceCase(priority),
    //     value: priority,
    //     icon: getPriorityIcon(priority),
    //     count: priorityCounts[priority],
    //   })),
    // },
  ]

  const advancedFilterFields = [
    {
      id: "title",
      label: "Title",
      type: "text",
    },
    // {
    //   id: "status",
    //   label: "StatusAd",
    //   type: "multi-select",
    //   options: STATUS_VALUES.map((status) => ({
    //     label: toSentenceCase(status),
    //     value: status,
    //     icon: getStatusIcon(status),
    //     count: statusCounts[status],
    //   })),
    // },
    // {
    //   id: "priority",
    //   label: "PriorityAd",
    //   type: "multi-select",
    //   options: PRIORITY_VALUES.map((priority) => ({
    //     label: toSentenceCase(priority),
    //     value: priority,
    //     icon: getPriorityIcon(priority),
    //     count: priorityCounts[priority],
    //   })),
    // },
    {
      id: "createdAt",
      label: "Created at",
      type: "date",
    },
  ]

  const enableAdvancedTable = featureFlags.includes("advancedTable")
  const enableFloatingBar = featureFlags.includes("floatingBar")

  console.log('enableAdvancedTable',enableAdvancedTable);
  console.log('enableFloatingBar',enableFloatingBar);


  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: enableAdvancedTable,
    initialState: {
      sorting: [],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
  })

  return (
    <>
      <DataTable
        table={table}
        floatingBar={
          enableFloatingBar ? <TasksTableFloatingBar table={table} /> : null
        }
      >
        {enableAdvancedTable ? (
          <DataTableAdvancedToolbar
            table={table}
            filterFields={advancedFilterFields}
            shallow={false}
          >
            <TasksTableToolbarActions table={table} />
          </DataTableAdvancedToolbar>
        ) : (
          <DataTableToolbar table={table} filterFields={filterFields}>
            <TasksTableToolbarActions table={table} />
          </DataTableToolbar>
        )}
      </DataTable>
      <UpdateTaskSheet
        open={rowAction?.type === "update"}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null}
      />
      <DeleteTasksDialog
        open={rowAction?.type === "delete"}
        onOpenChange={() => setRowAction(null)}
        tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  )
}
