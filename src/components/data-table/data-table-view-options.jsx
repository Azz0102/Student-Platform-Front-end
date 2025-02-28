"use client";

import * as React from "react";
import {
	CaretSortIcon,
	CheckIcon,
	MixerHorizontalIcon,
} from "@radix-ui/react-icons";

import { cn, toSentenceCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";

export function DataTableViewOptions({ table }) {
	const [open, setOpen] = React.useState(false);
	const { t } = useTranslation();

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					aria-label='Toggle columns'
					variant='outline'
					role='combobox'
					aria-expanded={open}
					size='sm'
					className='ml-auto hidden h-8 gap-2 lg:flex'
				>
					<MixerHorizontalIcon className='size-4' />
					{t("views")}
					<CaretSortIcon className='ml-auto size-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent align='end' className='w-44 p-0'>
				<Command>
					<CommandInput placeholder={t("searchColumns")} />
					<CommandList>
						<CommandEmpty>{t("noColumnsFound")}</CommandEmpty>
						<CommandGroup>
							{table
								.getAllColumns()
								.filter(
									(column) =>
										typeof column.accessorFn !==
											"undefined" && column.getCanHide()
								)
								.map((column) => {
									return (
										<CommandItem
											key={column.id}
											onSelect={() =>
												column.toggleVisibility(
													!column.getIsVisible()
												)
											}
										>
											<span className='truncate'>
												{toSentenceCase(column.id)}
											</span>
											<CheckIcon
												className={cn(
													"ml-auto size-4 shrink-0",
													column.getIsVisible()
														? "opacity-100"
														: "opacity-0"
												)}
											/>
										</CommandItem>
									);
								})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
