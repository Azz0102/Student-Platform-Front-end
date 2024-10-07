import moment from 'moment';
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import styles
import "../styles/customCalendar.scss";
import { CustomToolbar } from "./CustomToolbarCalendar";
import { useWindowDimensions } from '@/hooks/useWindowDimension';

const localizer = momentLocalizer(moment);

const Schedule = () => {

    const { width, height } = useWindowDimensions();

    const resources = Array.from({ length: 20 }, (v, i) => ({
        resourceId: i + 1,
        resourceTitle: `Resource ${i + 1}`
    }));

    const events = Array.from({ length: 20 }, (v, i) => ({
        title: `Event for Resource ${i + 1}`,
        start: new Date(2024, 9, 7, 10, 0),  // Events from 9:00 AM, 10:00 AM, etc.
        end: new Date(2024, 9, 7, 11, 0),   // End time is 1 hour after start
        resourceId: i + 1,                       // Match event to its corresponding resource
    }));


    const [date, setDate] = useState(new Date());
    const [view, setView] = useState(Views.WEEK);
    const router = useRouter();

    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: new Date(),
            // views: [Views.MONTH, Views.DAY, Views.AGENDA],
        }),
        []
    );
    const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
    const onView = useCallback((newView) => setView(newView), [setView]);
    // const { width, height } = useWindowDimensions();

    const onSelectEvent = useCallback(
        (event) => {
            router.push(`/user/dashboard/class/${event.id}`);
        },
        [router]
    );

    return (
        <div style={{ height: `${height - 100}px`, zIndex: 0 }}>
            <Calendar
                date={date}
                localizer={localizer}
                events={events}

                resources={resources}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"

                onNavigate={onNavigate}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                view={view}
                onView={onView}
                defaultDate={defaultDate}
                onSelectEvent={onSelectEvent}
                components={{
                    toolbar: CustomToolbar,

                }}
            />
        </div>
    );
};

export default Schedule;
