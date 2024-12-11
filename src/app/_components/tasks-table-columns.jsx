"use client";

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { useTranslation } from "react-i18next";

const STATUS_VALUES = ["EXAM-001", "EVENT-002", "ASSIGNMENT-003"];
const lables = {
	"EXAM-001": "EXAM",
	"EVENT-002": "EVENT",
	"ASSIGNMENT-003": "ASSIGNMENT",
};

export function getColumns({ setRowAction, selected }) {
	const colums = [
		[
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label='Select all'
						className='translate-y-0.5'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
						className='translate-y-0.5'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Tên' />
				),
				cell: ({ row }) => {
					// const label = LABELS.find(
					//   (label) => label === row.original.label
					// )

					return (
						<div className='flex space-x-2'>
							{/* {label && <Badge variant="outline">{label}</Badge>} */}
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("name")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "lastLogin",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Đăng nhập lần cuối' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian tạo' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian cập nhật' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					const [isUpdatePending, startUpdateTransition] =
						React.useTransition();
					const { t } = useTranslation();
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									aria-label='Open menu'
									variant='ghost'
									className='flex size-8 p-0 data-[state=open]:bg-muted'
								>
									<DotsHorizontalIcon
										className='size-4'
										aria-hidden='true'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-40'>
								{/* <DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "update" })
									}
								>
									{t("edit")}
								</DropdownMenuItem>
								<DropdownMenuSeparator /> */}
								<DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "delete" })
									}
								>
									{t("delete")}
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 40,
			},
		],
		[
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label='Select all'
						className='translate-y-0.5'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
						className='translate-y-0.5'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Tên' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("name")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "email",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Email' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("email")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "dateOfBirth",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Ngày sinh'
					/>
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian tạo' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian cập nhật' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					const [isUpdatePending, startUpdateTransition] =
						React.useTransition();
					const { t } = useTranslation();
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									aria-label='Open menu'
									variant='ghost'
									className='flex size-8 p-0 data-[state=open]:bg-muted'
								>
									<DotsHorizontalIcon
										className='size-4'
										aria-hidden='true'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-40'>
								{/* <DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "update" })
									}
								>
									{t("edit")}
								</DropdownMenuItem>
								<DropdownMenuSeparator /> */}
								<DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "delete" })
									}
								>
									{t("delete")}
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 40,
			},
		],
		[
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label='Select all'
						className='translate-y-0.5'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
						className='translate-y-0.5'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Tên' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("name")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "type",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Kiểu' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("type")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "nameAmphitheater",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Giảng đường'
					/>
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameAmphitheater")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "location",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Địa điểm' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("location")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "capacity",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Sức chứa' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("capacity")}
							</span>
						</div>
					);
				},
			},
			{
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian tạo' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian cập nhật' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					const [isUpdatePending, startUpdateTransition] =
						React.useTransition();
					const { t } = useTranslation();
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									aria-label='Open menu'
									variant='ghost'
									className='flex size-8 p-0 data-[state=open]:bg-muted'
								>
									<DotsHorizontalIcon
										className='size-4'
										aria-hidden='true'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-40'>
								{/* <DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "update" })
									}
								>
									{t("edit")}
								</DropdownMenuItem>
								<DropdownMenuSeparator /> */}
								<DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "delete" })
									}
								>
									{t("delete")}
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 40,
			},
		],
		[
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label='Select all'
						className='translate-y-0.5'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
						className='translate-y-0.5'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Tiêu đề' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("name")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			// {
			//   accessorKey: "content",
			//   header: ({ column }) => (
			//     <DataTableColumnHeader column={column} title="Content" />
			//   ),
			//   cell: ({ row }) => {
			//     return (
			//       <div className="flex space-x-2">
			//         <span className="max-w-[31.25rem] truncate font-medium">
			//           {row.getValue("content")}
			//         </span>
			//       </div>
			//     )
			//   },
			//   enableSorting: false,
			//   enableHiding: false,
			// },
			{
				accessorKey: "owner",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Người tạo' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("owner")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "isGeneralSchoolNews",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Toàn trường'
					/>
				),
				cell: ({ row }) => (
					<Badge variant='outline'>
						{row.original.isGeneralSchoolNews ? "Yes" : "No"}
					</Badge>
				),
			},
			{
				accessorKey: "type",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Kiểu' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{lables[row.getValue("type")]}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "location",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Địa điểm' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("location")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "time",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian tạo' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian cập nhật' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					const [isUpdatePending, startUpdateTransition] =
						React.useTransition();
					const { t } = useTranslation();
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									aria-label='Open menu'
									variant='ghost'
									className='flex size-8 p-0 data-[state=open]:bg-muted'
								>
									<DotsHorizontalIcon
										className='size-4'
										aria-hidden='true'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-40'>
								{/* <DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "update" })
									}
								>
									Edit
								</DropdownMenuItem>
								<DropdownMenuSeparator /> */}
								<DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "delete" })
									}
								>
									{t("delete")}
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 40,
			},
		],
		[
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label='Select all'
						className='translate-y-0.5'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
						className='translate-y-0.5'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Tên' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("name")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "description",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Mô tả'
					/>
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("description")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian tạo' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian cập nhật' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					const [isUpdatePending, startUpdateTransition] =
						React.useTransition();
					const { t } = useTranslation();
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									aria-label='Open menu'
									variant='ghost'
									className='flex size-8 p-0 data-[state=open]:bg-muted'
								>
									<DotsHorizontalIcon
										className='size-4'
										aria-hidden='true'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-40'>
								{/* <DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "update" })
									}
								>
									{t("edit")}
								</DropdownMenuItem> */}
								{/* <DropdownMenuSeparator /> */}
								<DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "delete" })
									}
								>
									{t("delete")}
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 40,
			},
		],
		[
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label='Select all'
						className='translate-y-0.5'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
						className='translate-y-0.5'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Tên' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("name")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "nameSubject",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Môn học' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameSubject")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			// {
			//   accessorKey: "descriptionSubject",
			//   header: ({ column }) => (
			//     <DataTableColumnHeader column={column} title="Description Subject" />
			//   ),
			//   cell: ({ row }) => {
			//     return (
			//       <div className="flex space-x-2">
			//         <span className="max-w-[31.25rem] truncate font-medium">
			//           {row.getValue("descriptionSubject")}
			//         </span>
			//       </div>
			//     )
			//   },
			//   enableSorting: false,
			//   enableHiding: false,
			// },
			{
				accessorKey: "nameSemester",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Học kỳ' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameSemester")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "numOfSessionAWeek",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Số buổi 1 tuần'
					/>
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("numOfSessionAWeek")}
							</span>
						</div>
					);
				},
				// enableSorting: false,
				// enableHiding: false,
			},
			{
				accessorKey: "capacity",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Sức chứa' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("capacity")}
							</span>
						</div>
					);
				},
				// enableSorting: false,
				// enableHiding: false,
			},
			{
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian tạo' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian cập nhật' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					const [isUpdatePending, startUpdateTransition] =
						React.useTransition();
					const { t } = useTranslation();
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									aria-label='Open menu'
									variant='ghost'
									className='flex size-8 p-0 data-[state=open]:bg-muted'
								>
									<DotsHorizontalIcon
										className='size-4'
										aria-hidden='true'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-40'>
								{/* <DropdownMenuItem
                  onSelect={() => setRowAction({ row, type: "update" })}
                >
                  Edit
                </DropdownMenuItem> */}
								{/* <DropdownMenuSeparator /> */}
								<DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "delete" })
									}
								>
									{t("delete")}
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 40,
			},
		],
		[
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label='Select all'
						className='translate-y-0.5'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
						className='translate-y-0.5'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "id",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Id' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("id")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "nameClassSession",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Học phần'
					/>
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameClassSession")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "nameClassroom",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Phòng học' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameClassroom")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "nameTeacher",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Giáo viên' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameTeacher")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "startTime",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Bắt đầu' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "numOfHour",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Số giờ' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("numOfHour")}
							</span>
						</div>
					);
				},
				// enableSorting: false,
				// enableHiding: false,
			},
			{
				accessorKey: "dayOfWeek",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thứ' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("dayOfWeek")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "sessionType",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Kiểu' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("sessionType")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "capacity",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Sức chứa' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("capacity")}
							</span>
						</div>
					);
				},
				// enableSorting: false,
				// enableHiding: false,
			},
			{
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian tạo' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Cập nhật' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					const [isUpdatePending, startUpdateTransition] =
						React.useTransition();
					const { t } = useTranslation();
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									aria-label='Open menu'
									variant='ghost'
									className='flex size-8 p-0 data-[state=open]:bg-muted'
								>
									<DotsHorizontalIcon
										className='size-4'
										aria-hidden='true'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-40'>
								{/* <DropdownMenuItem
                  onSelect={() => setRowAction({ row, type: "update" })}
                >
                  Edit
                </DropdownMenuItem> */}
								{/* <DropdownMenuSeparator /> */}
								<DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "delete" })
									}
								>
									{t("delete")}
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 40,
			},
		],
		[
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label='Select all'
						className='translate-y-0.5'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
						className='translate-y-0.5'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "nameUser",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Sinh viên' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameUser")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Tên điểm' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("name")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "type",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Trọng số'
					/>
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("type")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "value",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Giá trị' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("value")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "nameClassSession",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Học phần'
					/>
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameClassSession")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian tạo' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian cập nhật' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					const [isUpdatePending, startUpdateTransition] =
						React.useTransition();
					const { t } = useTranslation();
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									aria-label='Open menu'
									variant='ghost'
									className='flex size-8 p-0 data-[state=open]:bg-muted'
								>
									<DotsHorizontalIcon
										className='size-4'
										aria-hidden='true'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-40'>
								{/* <DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "update" })
									}
								>
									{t("edit")}
								</DropdownMenuItem>
								<DropdownMenuSeparator /> */}
								<DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "delete" })
									}
								>
									{t("delete")}
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 40,
			},
		],
		[
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label='Select all'
						className='translate-y-0.5'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
						className='translate-y-0.5'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "nameUser",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Sinh viên' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameUser")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "nameClassSession",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Học phần'
					/>
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("nameClassSession")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "sessionType",
				header: ({ column }) => (
					<DataTableColumnHeader
						column={column}
						title='Kiểu'
					/>
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("sessionType")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "dayOfWeek",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thứ' />
				),
				cell: ({ row }) => {
					return (
						<div className='flex space-x-2'>
							<span className='max-w-[31.25rem] truncate font-medium'>
								{row.getValue("dayOfWeek")}
							</span>
						</div>
					);
				},
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "startTime",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Bắt đầu' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian tạo' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title='Thời gian cập nhật' />
				),
				cell: ({ cell }) => formatDate(cell.getValue()),
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					const [isUpdatePending, startUpdateTransition] =
						React.useTransition();
					const { t } = useTranslation();
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									aria-label='Open menu'
									variant='ghost'
									className='flex size-8 p-0 data-[state=open]:bg-muted'
								>
									<DotsHorizontalIcon
										className='size-4'
										aria-hidden='true'
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-40'>
								{/* <DropdownMenuItem
                  onSelect={() => setRowAction({ row, type: "update" })}
                >
                  Edit
                </DropdownMenuItem> */}
								{/* <DropdownMenuSeparator /> */}
								<DropdownMenuItem
									onSelect={() =>
										setRowAction({ row, type: "delete" })
									}
								>
									{t("delete")}
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 40,
			},
		],
	];

	return colums[selected];
}
