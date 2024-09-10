import React from "react";
import { DatePicker } from "./DatePicker";
// Custom Toolbar Component
export function CustomToolbar(props) {
    const { date, onNavigate } = props;

    const handleDateChange = (newDate) => {
        if (newDate) {
            onNavigate("DATE", newDate); // Navigate to the selected date in react-big-calendar
        }
    };

    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button onClick={() => onNavigate("TODAY")}>Today</button>
                <button onClick={() => onNavigate("PREV")}>Back</button>
                <button onClick={() => onNavigate("NEXT")}>Next</button>
            </span>

            <span className="rbc-toolbar-label flex items-center justify-center my-1">
                <DatePicker date={date} onDateChange={handleDateChange} />
            </span>

            <span className="rbc-btn-group">
                <button onClick={() => props.onView("month")}>Month</button>
                <button onClick={() => props.onView("week")}>Week</button>
                <button onClick={() => props.onView("day")}>Day</button>
                <button onClick={() => props.onView("agenda")}>Agenda</button>
            </span>
        </div>
    );
}
