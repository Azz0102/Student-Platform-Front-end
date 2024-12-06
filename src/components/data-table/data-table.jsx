import * as React from "react";

import { flexRender } from "@tanstack/react-table";
import { getCommonPinningStyles } from "@/lib/data-table";
import { cn } from "@/lib/utils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ScrollArea } from "../ui/scroll-area";
import { useWindowDimensions } from "@/hooks/useWindowDimension";

export function DataTable({
	table,
	floatingBar = null,
	children,
	className,
	...props
}) {

	const {width,height}=useWindowDimensions();

	return (
		<div
			className={cn("w-full space-y-2.5 overflow-auto", className)}
			{...props}
		>
			{children}
			<div className=' rounded-md border w-full overflow-y-auto ' style={{ height: `${height - 290}px` }}>
			{/* <ScrollArea className='h-72' > */}
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											style={{
												...getCommonPinningStyles({
													column: header.column,
												}),
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
						<TableBody>
					{/* <ScrollArea className='h-72' > */}
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={
											row.getIsSelected() && "selected"
										}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												style={{
													...getCommonPinningStyles({
														column: cell.column,
													}),
												}}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={table.getAllColumns().length}
										className='h-24 text-center'
									>
										No results.
									</TableCell>
								</TableRow>
							)}
					{/* </ScrollArea> */}
						</TableBody>
				</Table>
			{/* </ScrollArea> */}
			</div>
			<div className='flex flex-col gap-2.5'>
				<DataTablePagination table={table} />
				{table.getFilteredSelectedRowModel().rows.length > 0 &&
					floatingBar}
			</div>
		</div>
	);
}
