"use client";

import * as React from "react";
import { format } from "date-fns";
import { enUS, vi } from "date-fns/locale"; // Import locales
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
export function DatePicker({ date, onDateChange }) {
	const { i18n } = useTranslation();

	// Determine the locale based on i18n language
	const currentLocale = i18n.language === "vn" ? vi : enUS;
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"!flex w-[280px] items-center justify-start text-left font-normal",
						!date && "!text-muted-foreground",
						date && "!text-foreground"
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? (
						format(date, "PPP", { locale: currentLocale })
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={onDateChange}
					locale={currentLocale}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
