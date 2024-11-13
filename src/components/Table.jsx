"use client";

import * as React from "react"

// import { getValidFilters } from "@/lib/data-table"
// import { Skeleton } from "@/components/ui/skeleton"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
// import { DateRangePicker } from "@/components/date-range-picker"
import { Shell } from "@/components/shell"

import { FeatureFlagsProvider } from "@/app/_components/feature-flags-provider"
import { TasksTable } from "@/app/_components/tasks-table"
import {
  getList,
} from "@/app/_lib/queries"
// import { searchParamsCache } from "@/app/_lib/validations"

export default function Table({search}) {

    // const searchParams = await props.searchParams
    // if (typeof searchParams.filters === 'string') {
    //   try {
    //     searchParams.filters = JSON.parse(searchParams.filters); // Phân tích chuỗi JSON
    //   } catch (error) {
    //     console.error("Lỗi phân tích JSON:", error);
    //     searchParams.filters = []; // Gán mảng rỗng nếu có lỗi
    //   }
    // }
    // const search = searchParamsCache.parse(searchParams)
    // const validFilters = getValidFilters(search.filters)

    // const tasksData = await getList(search)
    // console.log("search",tasksData.metadata);

//   const promises = Promise.all([
//     getTasks({
//       ...search,
//       filters: validFilters,
//     }),
//     getTaskStatusCounts(),
//     getTaskPriorityCounts(),
//   ])
    // const promises= new Promise(async function(myResolve, myReject) {
    //   try {
    //     const result = await getList(search);  // Gọi getList và đợi kết quả
    //     myResolve([
    //       result.metadata,
    //       {
    //         "todo": 10,
    //         "in-progress": 5,
    //         "done": 8,
    //         "canceled": 2
    //     },
    //     {
    //         "low": 6,
    //         "medium": 15,
    //         "high": 9
    //       } 
    //     ]); // Gọi myResolve với kết quả khi thành công
    //   } catch (error) {
    //     myReject(error); // Gọi myReject với lỗi khi thất bại
    //   }
    // });

    // const promises= promisess.then((item)=> item)


    // const promises=[
    //     tasksData.metadata,
    //     {
    //         "todo": 10,
    //         "in-progress": 5,
    //         "done": 8,
    //         "canceled": 2
    //     },
    //     {
    //         "low": 6,
    //         "medium": 15,
    //         "high": 9
    //       }     
    // ]

  return (
    <Shell className="gap-2">
      <FeatureFlagsProvider>
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
          <TasksTable 
          //  promises={promises} 
          search={search}
          />
        </React.Suspense>
      </FeatureFlagsProvider>
    </Shell>
  )
}
