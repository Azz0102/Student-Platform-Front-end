"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	MessageCircle,
	FileText,
	ExternalLink,
	AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentNoteId } from "@/lib/features/noteSlice";
import { usePathname } from "next/navigation";
import { useDeepCompareEffect } from "use-deep-compare";
import { useGetclassInfoQuery } from "@/lib/services/classInfo";
import { useEffect, useState } from "react";
import { setSelectedChat } from "@/lib/features/chatSlice";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "./ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function calculateOverallGrade(scores) {
	return scores.reduce(
		(acc, score) => acc + (score.score * score.weight) / 100,
		0
	);
}

function formatTime(startTime, numOfHour) {
	const start = new Date(startTime);

	// Tính thời gian kết thúc
	const end = new Date(start.getTime() + numOfHour * 60 * 60 * 1000);

	// Hàm để định dạng giờ và phút theo AM/PM
	const formatAMPM = (date) => {
		let hours = date.getHours();
		let minutes = date.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12;
		hours = hours ? hours : 12; // nếu là 0 thì chuyển thành 12
		minutes = minutes < 10 ? "0" + minutes : minutes; // thêm số 0 nếu cần
		return `${hours}:${minutes} ${ampm}`;
	};

	const startTimeFormatted = formatAMPM(start);
	const endTimeFormatted = formatAMPM(end);

	// Trả về chuỗi thời gian định dạng "10:00 AM - 11:30 AM"
	return `${startTimeFormatted} - ${endTimeFormatted}`;
}

export default function ClassId() {
	const dispatch = useDispatch();
	// This would typically come from props or a data fetch
	const router = useRouter();

	const pathname = usePathname().split("/");
	const classSessionId = pathname[pathname.length - 1];
	const { t } = useTranslation();

	const {
		data: classInfos,
		isLoading,
		isError,
		isSuccess,
	} = useGetclassInfoQuery({ classSessionId });

	const [classInfo, setclassInfo] = useState({});

	useEffect(() => {
		if (classInfos) {
			console.log("classInfo", classInfos);
			setclassInfo({
				name: classInfos.metadata.classSessionDetails.name,
				teacher: {
					name: classInfos.metadata.classSessionDetails
						.SessionDetails[0].Teacher.name,
					email: classInfos.metadata.classSessionDetails
						.SessionDetails[0].Teacher.email,
					// office: "Room 305, CS Building",
					// officeHours: "Tuesdays and Thursdays, 2-4 PM",
				},
				sessions:
					classInfos.metadata.classSessionDetails.SessionDetails.map(
						(item) => {
							return {
								day: item.dayOfWeek,
								time: formatTime(
									item.startTime,
									item.numOfHour
								),
								location:
									item.Classroom.name +
									", " +
									item.Classroom.Amphitheater.name,
							};
						}
					),
				scores: classInfos.metadata.classSessionDetails.Grades.map(
					(item) => {
						return {
							name: item.name,
							score: item.value,
							weight: item.type,
						};
					}
				),
				relatedNotes: classInfos.metadata.userNotes,
				notifications: classInfos.metadata.classSessionDetails.News.map(
					(item) => ({
						id: item.id,
						date: new Date(item.time).toISOString().split("T")[0],
						title: item.name,
						type: t(
							item.type === "EVENT-002"
								? "classId.event"
								: item.type === "EXAM-001"
									? "classId.exam"
									: item.type === "ASSIGNMENT-003"
										? "classId.assignment"
										: ""
						),
						link: `/user/dashboard/news/${item.id}`,
					})
				),
			});
		}
	}, [classInfos, t]);

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
					<AlertTitle>{t("classId.error")}</AlertTitle>
					<AlertDescription>
						{t("classId.errorFetchingInfo")}
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-background p-4 sm:bg-transparent'>
			<div className='mx-auto space-y-6'>
				<Card>
					<CardHeader>
						<CardTitle className='text-center text-2xl font-bold'>
							{classInfo.name ? classInfo.name : ""}
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='grid gap-6 md:grid-cols-2'>
							<div>
								<h3 className='mb-2 text-lg font-semibold'>
									{t("classId.teacherInformation")}
								</h3>
								<div className='space-y-2'>
									<p>
										<strong>{t("classId.name")}</strong>{" "}
										{classInfo.teacher &&
											classInfo.teacher.name}
									</p>
									<p>
										<strong>Email:</strong>{" "}
										{classInfo.teacher &&
											classInfo.teacher.email}
									</p>
								</div>
							</div>
							<div>
								<h3 className='mb-2 text-lg font-semibold'>
									{t("classId.classSessions")}
								</h3>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>
												{t("classId.day")}
											</TableHead>
											<TableHead>
												{t("classId.time")}
											</TableHead>
											<TableHead>
												{t("classId.location")}
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{classInfo.sessions &&
											classInfo.sessions.map(
												(session, index) => (
													<TableRow key={index}>
														<TableCell>
															{session.day}
														</TableCell>
														<TableCell>
															{session.time}
														</TableCell>
														<TableCell>
															{session.location}
														</TableCell>
													</TableRow>
												)
											)}
									</TableBody>
								</Table>
							</div>
						</div>

						<div>
							<h3 className='mb-2 text-lg font-semibold'>
								{t("classId.scores")}
							</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											{t("classId.assessment")}
										</TableHead>
										<TableHead>
											{t("classId.score")}
										</TableHead>
										<TableHead>
											{t("classId.weight")}
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{classInfo.scores &&
										classInfo.scores.map((score, index) => (
											<TableRow key={index}>
												<TableCell>
													{score.name}
												</TableCell>
												<TableCell>
													{score.score}
												</TableCell>
												<TableCell>
													{score.weight}%
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</div>

						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<h3 className='text-lg font-semibold'>
									{t("classId.overallGrade")}
								</h3>
								<span className='text-2xl font-bold'>
									{classInfo.scores &&
										calculateOverallGrade(
											classInfo.scores
										).toFixed(2)}
								</span>
							</div>
							<Progress
								value={
									classInfo.scores &&
									calculateOverallGrade(classInfo.scores) * 10
								}
								className='w-full'
								aria-label={
									classInfo.scores &&
									`Overall Grade: ${calculateOverallGrade(classInfo.scores).toFixed(2)}%`
								}
							/>
						</div>

						<div className='flex justify-center'>
							<Button asChild>
								<Link
									href='/class-chat'
									onClick={(e) => {
										e.preventDefault();
										dispatch(
											setSelectedChat(
												classInfos.metadata
													.classSessionDetails.id
											)
										);
										router.push("/user/chat");
									}}
								>
									<MessageCircle className='mr-2 h-4 w-4' />{" "}
									{t("classId.openClassChat")}
								</Link>
							</Button>
						</div>

						<div>
							<h3 className='mb-2 text-lg font-semibold'>
								{t("classId.relatedNotes")}
							</h3>
							<ul className='space-y-2'>
								{classInfo.relatedNotes &&
									classInfo.relatedNotes.map(
										(note, index) => (
											<li key={index}>
												<Link
													href='/user/note'
													className='flex items-center text-blue-600 hover:underline'
												>
													<FileText className='mr-2 h-4 w-4' />{" "}
													<a
														onClick={(e) => {
															e.preventDefault();
															dispatch(
																setCurrentNoteId(
																	note.id
																)
															);
															router.push(
																`/user/note`
															);
														}}
													>
														{note.name}
													</a>
												</Link>
											</li>
										)
									)}
							</ul>
						</div>

						<div>
							<h3 className='mb-2 text-lg font-semibold'>
								{t("classId.classNotificationsAndNews")}
							</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											{t("classId.date")}
										</TableHead>
										<TableHead>
											{t("classId.title")}
										</TableHead>
										<TableHead>
											{t("classId.type")}
										</TableHead>
										<TableHead className='sr-only'>
											{t("classId.Link")}
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{classInfo.notifications &&
										classInfo.notifications.map(
											(notification) => (
												<TableRow key={notification.id}>
													<TableCell>
														{notification.date}
													</TableCell>
													<TableCell>
														<Link
															href={
																notification.link
															}
															className='text-blue-600 hover:underline'
														>
															{notification.title}
														</Link>
													</TableCell>
													<TableCell>
														<Badge variant='secondary'>
															{notification.type}
														</Badge>
													</TableCell>
													<TableCell>
														<Link
															href={
																notification.link
															}
															className='text-blue-600 hover:underline'
															aria-label={`Read more about ${notification.title}`}
														>
															<ExternalLink className='h-4 w-4' />
														</Link>
													</TableCell>
												</TableRow>
											)
										)}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
