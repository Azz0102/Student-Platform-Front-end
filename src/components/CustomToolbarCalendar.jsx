import React from "react";
import { DatePicker } from "./DatePicker";
import { useTranslation } from "react-i18next";
// Custom Toolbar Component
export function CustomToolbar(props) {
	const { date, onNavigate } = props;
	const { t } = useTranslation();

	const handleDateChange = (newDate) => {
		if (newDate) {
			onNavigate("DATE", newDate); // Navigate to the selected date in react-big-calendar
		}
	};

	return (
		<div className='rbc-toolbar'>
			<span className='rbc-btn-group'>
				<button onClick={() => onNavigate("TODAY")}>
					{t("today")}
				</button>
				<button onClick={() => onNavigate("PREV")}>{t("back")}</button>
				<button onClick={() => onNavigate("NEXT")}>{t("next")}</button>
			</span>

			<span className='rbc-toolbar-label my-1 flex items-center justify-center'>
				<DatePicker date={date} onDateChange={handleDateChange} />
			</span>

			<span className='rbc-btn-group'>
				<button onClick={() => props.onView("month")}>
					{t("month")}
				</button>
				<button onClick={() => props.onView("week")}>
					{t("week")}
				</button>
				<button onClick={() => props.onView("day")}>{t("day")}</button>
				<button onClick={() => props.onView("agenda")}>
					{t("agenda")}
				</button>
			</span>
		</div>
	);
}
