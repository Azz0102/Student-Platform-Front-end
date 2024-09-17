"use client";

import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/customCalendar.scss";
import { CustomToolbar } from "./CustomToolbarCalendar";
import { useWindowDimensions } from "@/hooks/useWindowDimension";

const localizer = dayjsLocalizer(dayjs);

const myEventsList = [
    {
        title: "Meeting",
        start: new Date(2024, 8, 28, 10, 30),
        end: new Date(2024, 8, 28, 12, 0),
    },
    {
        title: "Eat",
        start: new Date(2024, 8, 29, 10, 30),
        end: new Date(2024, 8, 29, 12, 0),
    },
];

export function MyCalendar({ className }) {
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState(Views.WEEK);
    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: new Date(),
            // views: [Views.MONTH, Views.DAY, Views.AGENDA],
        }),
        [],
    );
    const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
    const onView = useCallback((newView) => setView(newView), [setView]);
    const { width, height } = useWindowDimensions();

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
                startAccessor="start"
                endAccessor="end"
                components={{
                    toolbar: CustomToolbar,
                }}
                // views={views}
            />
        </div>
    );
}
