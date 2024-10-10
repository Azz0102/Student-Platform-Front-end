"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import styles
import "../styles/customCalendar.scss";
import { CustomToolbar } from "./CustomToolbarCalendar";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import ImageUpload from "./FileUpload";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
const localizer = momentLocalizer(moment);

const Schedule = () => {
	const { width, height } = useWindowDimensions();

	const resources = Array.from({ length: 20 }, (v, i) => ({
		resourceId: i + 1,
		resourceTitle: `Resource ${i + 1}`,
	}));

	const events = Array.from({ length: 20 }, (v, i) => ({
		title: `Event for Resource ${i + 1}`,
		start: new Date(2024, 9, 7, 10, 0), // Events from 9:00 AM, 10:00 AM, etc.
		end: new Date(2024, 9, 7, 11, 0), // End time is 1 hour after start
		resourceId: i + 1, // Match event to its corresponding resource
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
		<div className='flex flex-col lg:flex-row'>
			<div
				style={{
					height: `${height - 100}px`,
					zIndex: 0,
				}}
				className='w-full lg:w-4/5'
			>
				<Calendar
					date={date}
					localizer={localizer}
					events={events}
					resources={resources}
					resourceIdAccessor='resourceId'
					resourceTitleAccessor='resourceTitle'
					onNavigate={onNavigate}
					startAccessor='start'
					endAccessor='end'
					defaultView='week'
					view={view}
					onView={onView}
					defaultDate={defaultDate}
					onSelectEvent={onSelectEvent}
					components={{
						toolbar: CustomToolbar,
					}}
				/>
			</div>
			<div className='flex'>
				<Card>
					<CardHeader>
						<CardTitle>Card Title</CardTitle>
						<CardDescription>Card Description</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Card Content</p>
					</CardContent>
					<CardFooter>
						<p>Card Footer</p>
					</CardFooter>
				</Card>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							className='rounded-full shadow'
							variant='outline'
						>
							File upload
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle className='text-center'>
								Upload your files
							</DialogTitle>
							<DialogDescription className='text-center'>
								The only file upload you will ever need
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<ImageUpload />
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default Schedule;
