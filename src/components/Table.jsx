import * as React from "react"

import { getValidFilters } from "@/lib/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { Shell } from "@/components/shell"

import { FeatureFlagsProvider } from "@/app/_components/feature-flags-provider"
import { TasksTable } from "@/app/_components/tasks-table"
import {
  getTaskPriorityCounts,
  getTasks,
  getTaskStatusCounts,
} from "@/app/_lib/queries"
import { searchParamsCache } from "@/app/_lib/validations"

export default async function Table(props) {
//   const searchParams = await props.searchParams
//   const search = searchParamsCache.parse(searchParams)

//   const validFilters = getValidFilters(search.filters)

//   const promises = Promise.all([
//     getTasks({
//       ...search,
//       filters: validFilters,
//     }),
//     getTaskStatusCounts(),
//     getTaskPriorityCounts(),
//   ])

    const promises=[
        {
            "data": [
              {
                "id": "task123",
                "code": "TASK-001",
                "title": "Complete project report",
                "status": "in-progress",
                "label": "feature",
                "priority": "high",
                "archived": false,
                "createdAt": "2024-11-01T08:00:00Z",
                "updatedAt": "2024-11-03T10:00:00Z"
              },
              {
                "id": "task124",
                "code": "TASK-002",
                "title": "Team meeting",
                "status": "done",
                "label": "documentation",
                "priority": "medium",
                "archived": false,
                "createdAt": "2024-11-02T10:00:00Z",
                "updatedAt": "2024-11-04T12:00:00Z"
              }
            ],
            "pageCount": 2
        },
        {
            "todo": 10,
            "in-progress": 5,
            "done": 8,
            "canceled": 2
        },
        {
            "low": 6,
            "medium": 15,
            "high": 9
          }     
    ]

  return (
    <Shell className="gap-2">
      <FeatureFlagsProvider>
        <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
          <DateRangePicker
            triggerSize="sm"
            triggerClassName="ml-auto w-56 sm:w-60"
            align="end"
            shallow={false}
          />
        </React.Suspense>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={6}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]}
              shrinkZero
            />
          }
        >
          <TasksTable promises={promises} />
        </React.Suspense>
      </FeatureFlagsProvider>
    </Shell>
  )
}
