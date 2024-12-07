"use client";
import BarGraph from "./BarGraph";
import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Book, Building2, CalendarClock, Users } from "lucide-react";
import BarChartHorizontSubject from "./BarChartHorizontSubject";
import BarChartHorizontalTeacher from "./BarChartHorizontalTeacher";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useGetlistDashboardQuery,
	useGetlistSemesterQuery,
} from "@/lib/services/calender";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function isTodayInRange(fromDate, endDate) {
	// Lấy ngày hiện tại
	const today = new Date();

	// Chuyển đổi từ chuỗi ngày trong `fromDate` và `endDate` thành đối tượng Date
	const start = new Date(fromDate);
	const end = new Date(endDate);

	// Kiểm tra nếu ngày hiện tại nằm trong khoảng từ `fromDate` đến `endDate`
	return today >= start && today <= end;
}

export default function AdminDashBoard() {
	const [theme, setTheme] = useState();
	const [data, setData] = useState();

	const { t } = useTranslation();

	const {
		data: listSemester,
		isLoading: isLoadingSemester,
		refetch: refetchSemester,
	} = useGetlistSemesterQuery(
		{},
		{
			refetchOnFocus: true,
			refetchOnMountOrArgChange: true,
		}
	);

	const {
		data: listData,
		isLoading: isLoadingData,
		refetch: refetchData,
	} = useGetlistDashboardQuery(theme?.id, {
		skip: !theme,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		if (listSemester) {
			setTheme(
				listSemester.metadata.find((item) => {
					return isTodayInRange(item.fromDate, item.endDate);
				})
			);
			console.log(
				"theme",
				listSemester.metadata.find((item) => {
					return isTodayInRange(item.fromDate, item.endDate);
				}).name
			);
		}
	}, [listSemester]);

	const handleThemeChange = (value) => {
		console.log("value", value);
		setTheme(value);
		// setDate(new Date(value.fromDate));
	};
	useEffect(() => {
		if (listData) {
			setData(listData.metadata);
		}
	}, [listData]);

	if (isLoadingSemester || isLoadingData || !data) {
		return <h1>Loading...</h1>;
	}

	console.log("data", data);

	return (
		<PageContainer scrollable>
			<div className='space-y-2'>
				<div className='flex items-center justify-between space-y-2'>
					<h2 className='hidden text-2xl font-bold tracking-tight md:flex'>
						{t("admin.hiWelcomeBack")}
					</h2>
					<div className='items-center space-x-2'>
						{/* <CalendarDateRangePicker /> */}
						<Select value={theme} onValueChange={handleThemeChange}>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Chọn Kỳ Học' />
							</SelectTrigger>
							<SelectContent>
								{listSemester.metadata.map((item, index) => {
									return (
										<SelectItem key={index} value={item}>
											{item.name}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
					</div>
				</div>
				<Tabs defaultValue='overview' className='space-y-4'>
					<TabsContent value='overview' className='space-y-4'>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										{t("admin.classRooms")}
									</CardTitle>
									<Building2 className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>
										{data.classroom}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										{t("admin.classSessions")}
									</CardTitle>
									<Book className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>
										{data.classSession}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										{t("admin.lessons")}
									</CardTitle>
									<CalendarClock className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>
										{data.sessionDetail}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										{t("admin.students")}
									</CardTitle>
									<Users className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>
										{data.user}
									</div>
								</CardContent>
							</Card>
						</div>
						<div className='grid grid-cols-1 gap-4 lg:grid-cols-8'>
							<div className='col-span-1 lg:col-span-8'>
								<BarGraph chartData={data.usageCount} />
							</div>
							<div className='col-span-1 lg:col-span-4'>
								<BarChartHorizontalTeacher
									chartData={data.topTeachers}
								/>
							</div>
							<div className='col-span-1 lg:col-span-4'>
								<BarChartHorizontSubject
									chartData={data.topSubjects}
								/>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</PageContainer>
	);
}
