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
import { MessageCircle, FileText, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentNoteId } from "@/lib/features/noteSlice";

const classInfo = {
	name: "Introduction to Computer Science",
	teacher: {
		name: "Dr. Jane Smith",
		email: "jane.smith@university.edu",
		office: "Room 305, CS Building",
		officeHours: "Tuesdays and Thursdays, 2-4 PM",
	},
	sessions: [
		{
			day: "Monday",
			time: "10:00 AM - 11:30 AM",
			location: "Room 101, CS Building",
		},
		{
			day: "Wednesday",
			time: "10:00 AM - 11:30 AM",
			location: "Room 101, CS Building",
		},
		{
			day: "Friday",
			time: "2:00 PM - 3:30 PM",
			location: "Lab 203, CS Building",
		},
	],
	scores: [
		{ name: "Midterm Exam", score: 85, weight: 30 },
		{ name: "Final Exam", score: 92, weight: 40 },
		{ name: "Assignments", score: 88, weight: 20 },
		{ name: "Participation", score: 95, weight: 10 },
	],
	relatedNotes: [
		{
			id: 1,
			title: "Data Structures Overview",
		},
		{ id: 2, title: "Algorithms Basics" },
		{ id: 3, title: "Object-Oriented Programming" },
	],
	notifications: [
		{
			id: 1,
			date: "2023-05-15",
			title: "Midterm Exam Schedule",
			type: "Exam",
			link: "/notifications/midterm-exam-schedule",
		},
		{
			id: 2,
			date: "2023-05-10",
			title: "Assignment 3 Due",
			type: "Assignment",
			link: "/notifications/assignment-3-due",
		},
		{
			id: 3,
			date: "2023-05-05",
			title: "Guest Lecture Announcement",
			type: "Event",
			link: "/notifications/guest-lecture",
		},
	],
};

const overallGrade = classInfo.scores.reduce(
	(acc, score) => acc + (score.score * score.weight) / 100,
	0
);

export default function Page() {
	const dispatch = useDispatch();
	// This would typically come from props or a data fetch
	const router = useRouter();

	return (
		<div className='min-h-screen bg-background p-4 sm:bg-transparent'>
			<div className='mx-auto space-y-6'>
				<Card>
					<CardHeader>
						<CardTitle className='text-center text-2xl font-bold'>
							{classInfo.name}
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='grid gap-6 md:grid-cols-2'>
							<div>
								<h3 className='mb-2 text-lg font-semibold'>
									Teacher Information
								</h3>
								<div className='space-y-2'>
									<p>
										<strong>Name:</strong>{" "}
										{classInfo.teacher.name}
									</p>
									<p>
										<strong>Email:</strong>{" "}
										{classInfo.teacher.email}
									</p>
									<p>
										<strong>Office:</strong>{" "}
										{classInfo.teacher.office}
									</p>
									<p>
										<strong>Office Hours:</strong>{" "}
										{classInfo.teacher.officeHours}
									</p>
								</div>
							</div>
							<div>
								<h3 className='mb-2 text-lg font-semibold'>
									Class Sessions
								</h3>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Day</TableHead>
											<TableHead>Time</TableHead>
											<TableHead>Location</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{classInfo.sessions.map(
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
								Scores
							</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Assessment</TableHead>
										<TableHead>Score</TableHead>
										<TableHead>Weight</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{classInfo.scores.map((score, index) => (
										<TableRow key={index}>
											<TableCell>{score.name}</TableCell>
											<TableCell>
												{score.score}%
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
									Overall Grade
								</h3>
								<span className='text-2xl font-bold'>
									{overallGrade.toFixed(2)}%
								</span>
							</div>
							<Progress
								value={overallGrade}
								className='w-full'
								aria-label={`Overall Grade: ${overallGrade.toFixed(2)}%`}
							/>
						</div>

						<div className='flex justify-center'>
							<Button asChild>
								<Link href='/class-chat'>
									<MessageCircle className='mr-2 h-4 w-4' />{" "}
									Open Class Chat
								</Link>
							</Button>
						</div>

						<div>
							<h3 className='mb-2 text-lg font-semibold'>
								Related Notes
							</h3>
							<ul className='space-y-2'>
								{classInfo.relatedNotes.map((note, index) => (
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
													router.push(`/user/note`);
												}}
											>
												{note.title}
											</a>
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className='mb-2 text-lg font-semibold'>
								Class Notifications and News
							</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Date</TableHead>
										<TableHead>Title</TableHead>
										<TableHead>Type</TableHead>
										<TableHead className='sr-only'>
											Link
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{classInfo.notifications.map(
										(notification) => (
											<TableRow key={notification.id}>
												<TableCell>
													{notification.date}
												</TableCell>
												<TableCell>
													<Link
														href={notification.link}
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
														href={notification.link}
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
