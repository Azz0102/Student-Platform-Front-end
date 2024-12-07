"use client";

import { useState, useTransition } from "react";

import {
	Credenza,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
} from "@/components/ui/credenza";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { ImageUpload } from "./FileUpload";
import axios from "axios";
import { useTranslation } from "react-i18next";

function parseTime(timeString) {
	const [hours, period] = timeString.match(/(\d+)(am|pm)/i).slice(1);
	let hour = parseInt(hours);

	if (period.toLowerCase() === "pm" && hour !== 12) {
		hour += 12; // Chuyển PM sang giờ 24h
	}
	if (period.toLowerCase() === "am" && hour === 12) {
		hour = 0; // Chuyển 12am thành 0 giờ
	}

	return new Date(2024, 0, 1, hour, 0); // Mặc định ngày 2024-01-01
}

function convertToEvent(data, fromDate) {
	const dayOfWeekMap = {
		Sunday: 0,
		Monday: 1,
		Tuesday: 2,
		Wednesday: 3,
		Thursday: 4,
		Friday: 5,
		Saturday: 6,
	};

	// Tính ngày tiếp theo của ngày cụ thể trong tuần
	function getNextDayOfWeek(fromDate, dayOfWeek) {
		const date = new Date(fromDate);
		const currentDayOfWeek = date.getUTCDay(); // Lấy ngày trong tuần theo UTC
		const diff = (dayOfWeek - currentDayOfWeek + 7) % 7;
		date.setUTCDate(date.getUTCDate() + diff);
		return date;
	}

	// Chuyển đổi thời gian từ chuỗi sang giờ
	function parseTime(time) {
		const [_, hour, period] = time.match(/(\d+)(am|pm)/i) || [];
		let parsedHour = parseInt(hour, 10);
		if (period.toLowerCase() === "pm" && parsedHour !== 12) {
			parsedHour += 12;
		} else if (period.toLowerCase() === "am" && parsedHour === 12) {
			parsedHour = 0;
		}
		return parsedHour; // Chỉ trả về giờ (0-23)
	}

	// Lấy thông tin từ dữ liệu
	const { dayOfWeek, time, classSessionName, classroomName, numOfHour } =
		data;
	console.log("time", time);
	const startHour = parseTime(time); // Lấy giờ bắt đầu (local time UTC-7)
	const startDate = getNextDayOfWeek(fromDate, dayOfWeekMap[dayOfWeek]);

	// Chuyển đổi giờ bắt đầu và kết thúc sang UTC
	startDate.setUTCHours(startHour - 7); // Chuyển từ UTC-7 sang UTC

	const endDate = new Date(startDate);
	endDate.setUTCHours(endDate.getUTCHours() + parseInt(numOfHour)); // Thêm số giờ

	// Trả về đối tượng sự kiện
	return {
		resourceId: classroomName,
		title: classSessionName,
		start: startDate,
		end: endDate,
	};
}

function getNearestTimes(data, fromDate) {
	const dayOfWeekMap = {
		Sunday: 0,
		Monday: 1,
		Tuesday: 2,
		Wednesday: 3,
		Thursday: 4,
		Friday: 5,
		Saturday: 6,
	};

	const from = new Date(fromDate);

	return data.map((item) => {
		const { dayOfWeek, time, numOfHour } = item;

		// Tìm ngày gần nhất cho dayOfWeek
		const currentDay = from.getDay(); // Thứ hiện tại của fromDate
		const targetDay = dayOfWeekMap[dayOfWeek]; // Ngày trong tuần của môn học
		let dayDiff = (targetDay - currentDay + 7) % 7; // Tính khoảng cách ngày

		// Nếu targetDay đã qua (ví dụ: thứ 2 sau thứ 7), thêm 7 ngày
		if (dayDiff === 0 && currentDay !== targetDay) {
			dayDiff += 7;
		}

		const nearestDate = new Date(from);
		nearestDate.setDate(from.getDate() + dayDiff);

		// Tính giờ từ time (ví dụ "7am" -> 7:00 hoặc "1pm" -> 13:00)

		console.log("timeeee", time);
		const [_, hour, period] = time.match(/(\d+)(am|pm)/i) || [];
		let hour24 = parseInt(hour, 10);
		if (period.toLowerCase() === "pm" && hour24 !== 12) hour24 += 12;
		if (period.toLowerCase() === "am" && hour24 === 12) hour24 = 0;

		nearestDate.setHours(hour24, 0, 0, 0); // Đặt giờ, phút, giây

		// Tính thời gian kết thúc
		const endDate = new Date(nearestDate);
		endDate.setHours(endDate.getHours() + parseInt(numOfHour, 10));

		return {
			classSessionName: item.classSessionName,
			classroomName: item.classroomName,
			teacher: item.teacher,
			startTime: nearestDate.toISOString(),
			numOfHour: item.numOfHour,
			dayOfWeek: item.dayOfWeek,
			sessionType: item.classroomType,
			capacity: item.capacity,
		};
	});
}

export function ScheduleItem({
	semester,
	setEdited,
	setListEventSaved,
	setMetadata,
	setDate,
}) {
	const [isUpdatePending, startUpdateTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation();

	const [data, setData] = useState([]);

	function onSubmit() {
		startUpdateTransition(async () => {
			const response = await axios.post(
				`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/scheduling`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const { metadata } = response.data;

			console.log("metadata", metadata);

			if (typeof metadata == "string") {
				toast.error(metadata);
				return;
			}

			setListEventSaved(
				metadata.map((item) => {
					return convertToEvent(item, semester.fromDate);
				})
			);

			let date = new Date(semester.fromDate); // Tạo đối tượng Date từ chuỗi ISO
			date.setUTCDate(date.getUTCDate() + 7);
			console.log("dateSemester", date.toISOString());
			setDate(date);

			setMetadata(getNearestTimes(metadata, semester.fromDate));
			setIsOpen(false);
			setEdited(true);
			toast.success(t("successfulArrangements"));
		});
	}

	return (
		<Credenza open={isOpen} onOpenChange={setIsOpen}>
			<CredenzaTrigger onClick={() => setIsOpen(true)}>
				{t("admin.uploadFilesToOrganize")}
			</CredenzaTrigger>
			<CredenzaContent className='flex flex-col gap-6 sm:max-w-md'>
				<CredenzaHeader className='text-left'>
					<CredenzaDescription></CredenzaDescription>
					<CredenzaTitle>{t("admin.uploadFile")}</CredenzaTitle>
				</CredenzaHeader>
				<ScrollArea className='max-h-96 overflow-auto rounded-md'>
					<ImageUpload setData={setData} />
				</ScrollArea>
				<CredenzaFooter className='gap-2 pt-2 sm:space-x-0'>
					<CredenzaClose asChild>
						<Button type='button' variant='outline'>
							{t("admin.cancel")}
						</Button>
					</CredenzaClose>
					<Button
						disabled={isUpdatePending}
						onClick={() => {
							onSubmit();
						}}
					>
						{isUpdatePending && (
							<Icons.spinner
								className='mr-2 size-4 animate-spin'
								aria-hidden='true'
							/>
						)}
						{t("admin.save")}
					</Button>
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
}
