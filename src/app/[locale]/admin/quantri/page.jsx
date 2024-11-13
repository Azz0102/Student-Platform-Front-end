// "use client";

import * as React from "react"
import { unstable_cache } from "@/lib/unstable-cache"
// import { getValidFilters } from "@/lib/data-table"
// import { Skeleton } from "@/components/ui/skeleton"
// import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
// import { DateRangePicker } from "@/components/date-range-picker"
// import { Shell } from "@/components/shell"

// import { FeatureFlagsProvider } from "@/app/_components/feature-flags-provider"
// import { TasksTable } from "@/app/_components/tasks-table"
// import {
//   getList,
//   getTaskPriorityCounts,
//   getTasks,
//   getTaskStatusCounts,
// } from "@/app/_lib/queries"
import { searchParamsCache } from "@/app/_lib/validations"
import AdministrationLayout from "@/components/administration/AdministrationLayout"
import { getList, getTasks } from "@/app/_lib/queries";

export default async function Page(props) {

    const searchParams = await props.searchParams
    if (typeof searchParams.filters === 'string') {
      try {
        searchParams.filters = JSON.parse(searchParams.filters); // Phân tích chuỗi JSON
      } catch (error) {
        console.error("Lỗi phân tích JSON:", error);
        searchParams.filters = []; // Gán mảng rỗng nếu có lỗi
      }
    }
    const search = searchParamsCache.parse(searchParams)
    // const validFilters = getValidFilters(search.filters)

    const promises= new Promise(async function(myResolve, myReject) {
      try {
        const result = await getList(search);  // Gọi getList và đợi kết quả
        myResolve([
          result.metadata,
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
        ]); // Gọi myResolve với kết quả khi thành công
      } catch (error) {
        myReject(error); // Gọi myReject với lỗi khi thất bại
      }
    });

    // const promises = getTasks(search);

    return (
      <div>
        <AdministrationLayout 
          search={search}
          // promises={promises}
        />
      </div>
    );
}
