"use client";

import { Button } from "@/components/ui/button";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import styles
import "../styles/customCalendar.scss";
import { CustomToolbar } from "./CustomToolbarCalendar";


import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { useGetlistEventQuery, useGetlistRoomQuery, useGetlistSemesterQuery } from "@/lib/services/calender";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ArrowDownToLine } from 'lucide-react';
import { CreactSemester } from "./CreactSemester";
import { ScheduleItem } from "./ScheduleItem";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
const localizer = momentLocalizer(moment);

function isTodayInRange(fromDate, endDate) {
	// Lấy ngày hiện tại
	const today = new Date();

	// Chuyển đổi từ chuỗi ngày trong `fromDate` và `endDate` thành đối tượng Date
	const start = new Date(fromDate);
	const end = new Date(endDate);

	// Kiểm tra nếu ngày hiện tại nằm trong khoảng từ `fromDate` đến `endDate`
	return today >= start && today <= end;
}

const Empty = () => {
	return <div className="h-2"></div>;
};


const Schedule = () => {
	const { width, height } = useWindowDimensions();
	const [theme, setTheme] = useState();
	const [edited, setEdited] = useState(false);

	const {
		data: listSemester,
		isLoading: isLoadingSemester,
		refetch: refetchSemester,
	} = useGetlistSemesterQuery({}, {
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		if (listSemester) {
			setTheme(listSemester.metadata.find((item) => {
				return isTodayInRange(item.fromDate, item.endDate);
			}));
			console.log("theme", listSemester.metadata.find((item) => {
				return isTodayInRange(item.fromDate, item.endDate);
			}).name)
		}
	}, [listSemester])



	const {
		data: listRoom,
		isLoading,
		isError,
		isSuccess,
		refetch,
	} = useGetlistRoomQuery({}, {
		skip: !theme,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const {
		data: listEvent,
		isLoading: isLoadinglistEvent,
		isError: isErrorlistEvent,
		isSuccess: isSuccesslistEvent,
		refetch: refetchlistEvent,
	} = useGetlistEventQuery(theme?.id, {
		skip: !theme,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const [resources, setResources] = useState();
	const [events, setEvents] = useState();
	const [listEventSaved, setListEventSaved] = useState([]);
	const [Metadata, setMetadata] = useState([]);

	console.log('listEventSaved', Metadata)

	useEffect(() => {
		if (listRoom) {
			setResources(listRoom.metadata.data.map((item) => {
				return {
					resourceId: item.name,
					resourceTitle: item.name
				}
			}))
		}
	}, [listRoom])

	useEffect(() => {
		if (listEvent) {
			setEvents(listEvent.metadata.map((item) => {
				return {
					title: item.title,
					resourceId: item.resourceId,
					start: new Date(item.start),
					end: new Date(item.end)
				}
			}))
		}
	}, [listEvent])

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
	const handleThemeChange = (value) => {
		console.log('value', value)
		setTheme(value);
		setDate(new Date(value.fromDate));
		// setResources();
		// refetch();
		// refetchlistEvent();
	};

	if (isLoading || isLoadinglistEvent || isLoadingSemester) {
		return (
			<h1>Loading...</h1>
		)
	}
	
	return (
		<div className='flex flex-col lg:flex-row'>
			<div
				style={{
					height: `${height - 100}px`,
					zIndex: 0,
				}}
				className='w-full lg:w-4/5'
			>
				{!edited ?
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
					:
					<Calendar
						date={date}
						localizer={localizer}
						events={listEventSaved}
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
							toolbar: Empty,
						}}
					/>
				}
			</div>
			<div
				className='m-2 flex flex-col items-center justify-between lg:w-1/5'
				style={{
					height: `${height - 100}px`,
				}}
			>
				<div className="flex flex-col gap-2 items-center">
					<Button
						variant="outline"
						size="sm"
						className="gap-2 w-[180px]"
						asChild
					>
						<div>
							<PlusCircledIcon className="size-4" aria-hidden="true" />
							<CreactSemester
								refetchSemester={refetchSemester}
							/>
						</div>
					</Button>
					<Select value={theme} onValueChange={handleThemeChange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Chọn Kỳ Học" />
						</SelectTrigger>
						<SelectContent>
							{listSemester.metadata.map((item, index) => {
								return (
									<SelectItem key={index} value={item}>{item.name}</SelectItem>
								)
							})}
						</SelectContent>
					</Select>
					{/* <ImageUpload /> */}
					<Button
						variant="outline"
						size="sm"
						className="gap-2 w-[180px]"
						asChild
					>
						<div>
							<PlusCircledIcon className="size-4" aria-hidden="true" />
							<ScheduleItem
								semester={theme}
								setEdited={setEdited}
								setListEventSaved={setListEventSaved}
								setMetadata={setMetadata}
								setDate={setDate}
							/>
						</div>
					</Button>

					<Button
						variant="outline"
						size="sm"
						className="gap-2 w-[180px]"
						onClick={async() => {
							const response = await axios.get(`https://localhost:3001/api/session_details/down/${theme.id}`, {
								headers: {
									refreshToken: Cookies.get("refreshToken"),
								},
								responseType: 'blob',
							});
							// Tạo URL từ blob dữ liệu trả về
							const url = window.URL.createObjectURL(new Blob([response.data]));
					
							// Tạo một thẻ <a> tạm để tải xuống file
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'class_sessions.csv'); // Tên file tải xuống
							document.body.appendChild(link);
							link.click(); // Kích hoạt tải xuống
							document.body.removeChild(link); // Xóa thẻ <a> tạm sau khi tải xong
						}}
					>
						<div className="flex flex-row items-center justify-center">
							<ArrowDownToLine className="size-4 mr-2" aria-hidden="true" />
							<div>Tải lịch học</div>
						</div>
					</Button>

					<div className="flex flex-col gap-2 w-full">
						<Label htmlFor="email">Ngày Bắt Đầu</Label>
						<div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
							{moment(theme?.fromDate).format("DD/MM/YYYY")}
						</div>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<Label htmlFor="email">Ngày Kết Thúc </Label>
						<div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						{moment(theme?.endDate).format("DD/MM/YYYY")}
						</div>
					</div>
				</div>

				{edited && <div className="flex my-2 mx-8 justify-between w-5/6">
					<Button type="button" variant="outline" onClick={() => {
						setEdited(false);
						refetchlistEvent();
					}}>
						Cancel
					</Button>
					<Button
					// disabled={isUpdatePending}
					onClick ={async()=>{
						try {
							const response = await axios.post(`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/save-schedule`, {
								data: Metadata,
								id: theme.id,
							  }, {
								headers: {
								  'Content-Type': 'application/json',
								}
							  });
							setEdited(false);
							refetchlistEvent();

						} catch (error) {
							console.log("error",error);
							toast.error(error.response.data.message)
						}
					}}
					>
						{/* {isUpdatePending && (
								<Icons.spinner
									className="mr-2 size-4 animate-spin"
									aria-hidden="true"
								/>
							)} */}
						Save
					</Button>
				</div>}

			</div>
		</div>
	);
};

export default Schedule;
