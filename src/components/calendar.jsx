"use client";

import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/customCalendar.scss";
import { CustomToolbar } from "./CustomToolbarCalendar";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { useRouter } from "next/navigation";
import { useGetcalenderQuery } from "@/lib/services/calender";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
	useDeepCompareEffect,
	useDeepCompareLayoutEffect,
} from "use-deep-compare";
import "dayjs/locale/vi"; // Import Vietnamese locale
import "dayjs/locale/en"; // Ensure English is also available
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "./ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const localizer = dayjsLocalizer(dayjs);

// const myEventsList = [
// 	{
// 		id: 1,
// 		title: "INT-2002",
// 		start: new Date(2024, 8, 28, 10, 30),
// 		end: new Date(2024, 8, 28, 12, 0),
// 	},
// 	{
// 		id: 2,
// 		title: "INT-2001",
// 		start: new Date(2024, 8, 29, 10, 30),
// 		end: new Date(2024, 8, 29, 12, 0),
// 	},
// ];

export function MyCalendar({ className }) {
	const { t, i18n } = useTranslation(); // Access i18n to get current language
	const refreshToken = Cookies.get("refreshToken");
	const decoded = jwtDecode(refreshToken);
	const {
		data: listEvents,
		isLoading,
		isError,
		isSuccess,
	} = useGetcalenderQuery({ userId: decoded.userId });

	const [myEventsList, setMyEventsList] = useState([]);

	const [date, setDate] = useState(new Date());
	const [view, setView] = useState(Views.WEEK);
	const router = useRouter();

	// console.log('listEvents',listEvents);

	useEffect(() => {
		// Update dayjs locale whenever i18n.language changes
		const locale = i18n.language === "vn" ? "vi" : "en";
		dayjs.locale(locale);
	}, [i18n.language]);

	useDeepCompareEffect(() => {
		if (listEvents) {
			console.log("listEvents2", listEvents);

			// Only update state if the messages have changed
			setMyEventsList(
				listEvents.metadata.map((item, index) => {
					return {
						...item,
						start: new Date(item.start),
						end: new Date(item.end),
					};
				})
			);
		}
	}, [listEvents]);

	const { defaultDate, views } = useMemo(
		() => ({
			defaultDate: new Date(),
			// views: [Views.MONTH, Views.DAY, Views.AGENDA],
		}),
		[]
	);
	const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
	const onView = useCallback((newView) => setView(newView), [setView]);
	const { width, height } = useWindowDimensions();

	const onSelectEvent = useCallback(
		(event) => {
			router.push(`/user/dashboard/class/${event.classSessionId}`);
		},
		[router]
	);

	if (isLoading) {
		return (
			<div className='flex w-full items-center justify-center'>
				<LoadingSpinner />
			</div>
		);
	}

	if (isError) {
		return (
			<div className='mx-auto w-full max-w-2xl'>
				<Alert variant='destructive' className='w-5/6'>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>{t("error")}</AlertTitle>
					<AlertDescription>
						{t("errorFetchingEvents")}
					</AlertDescription>
				</Alert>
			</div>
		);
	}
	return (
		<div className={`${className}`} style={{ height: `${height - 120}px` }}>
			<Calendar
				date={date}
				localizer={localizer}
				onNavigate={onNavigate}
				defaultDate={defaultDate}
				events={myEventsList}
				view={view}
				onView={onView}
				startAccessor='start'
				endAccessor='end'
				components={{
					toolbar: CustomToolbar,
				}}
				// views={views}
				onSelectEvent={onSelectEvent}
			/>
		</div>
	);
}
