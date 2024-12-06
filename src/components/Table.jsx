"use client";

import * as React from "react";

// import { getValidFilters } from "@/lib/data-table"
// import { Skeleton } from "@/components/ui/skeleton"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
// import { DateRangePicker } from "@/components/date-range-picker"
import { Shell } from "@/components/shell";

import { FeatureFlagsProvider } from "@/app/_components/feature-flags-provider";
import { TasksTable } from "@/app/_components/tasks-table";
import { getList } from "@/app/_lib/queries";
// import { searchParamsCache } from "@/app/_lib/validations"

export default function Table({ search }) {
	return (
		<Shell className='gap-2'>
			<FeatureFlagsProvider>
				<React.Suspense
					fallback={
						<DataTableSkeleton
							columnCount={6}
							searchableColumnCount={1}
							filterableColumnCount={2}
							cellWidths={[
								"10rem",
								"40rem",
								"12rem",
								"12rem",
								"8rem",
								"8rem",
							]}
							shrinkZero
						/>
					}
				>
					<TasksTable searchAs={search} />
				</React.Suspense>
			</FeatureFlagsProvider>
		</Shell>
	);
}
