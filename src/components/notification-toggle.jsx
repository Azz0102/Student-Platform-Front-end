"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "./ui/button";
import { socket } from "./Header";
import { useDeepCompareEffect } from "use-deep-compare";
import {
	useGetListNotiQuery,
	useUpdateNotiUserMutation,
} from "@/lib/services/noti";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

export function NotiToggle() {
	const { userId } = jwtDecode(Cookies.get("refreshToken"));
	const { data, isLoading, isError } = useGetListNotiQuery(userId);
	const [updateNotiUser, {}] = useUpdateNotiUserMutation();
	const [notiList, setNotiList] = useState([]);
	const router = useRouter();

	useDeepCompareEffect(() => {
		socket.on("NewsNoti", (msg) => {
			console.log("onNoti", msg);
		});

		return () => {
			socket.off("NewsNoti");
		};
	}, []);

	useEffect(() => {
		if (data) {
			console.log("data", data);
			setNotiList(data.metadata);
		}
	}, [data]);

	const handleNotificationClick = (notiUserId) => {
		try {
			updateNotiUser({ id: notiUserId });

			setNotiList((prevNotifications) =>
				prevNotifications.map((notification) => {
					if (notification.NotiUsers[0].id === notiUserId) {
						return {
							...notification,
							NotiUsers: notification.NotiUsers.map(
								(notiUser) => {
									if (notiUser.id === notiUserId) {
										return {
											...notiUser,
											isRead: true,
										}; // Update isRead
									}
									return notiUser; // Return the unchanged notiUser
								}
							),
						};
					}
					return notification; // Return the unchanged notification
				})
			);

			router.push(`/user/dashboard/news/${notiUserId}`);
		} catch {
			toast.error("Update Notification Error");
		}
	};

	// Function to mark all notifications as read
	const handleMarkAllAsRead = () => {
		// Update all notifications locally
		setNotiList((prevNotifications) =>
			prevNotifications.map((notification) => ({
				...notification,
				NotiUsers: notification.NotiUsers.map((notiUser) => ({
					...notiUser,
					isRead: true, // Mark all as read
				})),
			}))
		);

		// Call update for each notification
		notiList.forEach((notification) => {
			notification.NotiUsers.forEach((notiUser) => {
				if (!notiUser.isRead) {
					updateNotiUser({ id: notiUser.id });
				}
			});
		});
	};
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size='icon' className='relative flex'>
					{notiList.length > 0 && !isLoading && (
						<div className='absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-primary px-1 py-0.5 text-center align-baseline text-xs font-bold leading-none text-primary-foreground'>
							{notiList.length < 10 ? `${notiList.length}` : "9+"}
						</div>
					)}
					<Bell className='h-[1.2rem] w-[1.2rem]' />
				</Button>
			</PopoverTrigger>
			<PopoverContent align='end' className='w-80'>
				<h3 className='mb-2 text-lg font-semibold'>Notifications</h3>
				<ScrollArea className='h-60'>
					<div className='space-y-4'>
						{notiList.length > 0 &&
							notiList.map((notification) => {
								const temp =
									notification.noti_content.split("-");

								return (
									<Button
										key={notification.id}
										onClick={() =>
											handleNotificationClick(
												notification.NotiUsers[0].id
											)
										}
										className={`flex h-auto w-72 flex-col items-start rounded-lg p-3 text-left ${
											notification.NotiUsers[0].isRead
												? "bg-background hover:bg-muted"
												: "bg-muted hover:bg-muted/80"
										}`}
										variant='ghost'
									>
										<div className='flex w-full items-start justify-between'>
											<h4 className='text-sm font-semibold'>
												{notification.noti_type ===
													"NEWS-001" && "News"}
											</h4>
											<span className='text-xs text-muted-foreground'>
												{(() => {
													const diffInMinutes =
														dayjs().diff(
															dayjs(
																notification.createdAt
															),
															"minute"
														);
													const diffInHours =
														dayjs().diff(
															dayjs(
																notification.createdAt
															),
															"hour"
														);
													const diffInDays =
														dayjs().diff(
															dayjs(
																notification.createdAt
															),
															"day"
														);

													if (diffInMinutes < 60) {
														return `${diffInMinutes} mins ago`;
													} else if (
														diffInHours < 24
													) {
														return `${diffInHours} hours ago`;
													} else {
														return `${diffInDays} days ago`;
													}
												})()}
											</span>
										</div>
										<p className='mt-1 text-sm text-muted-foreground'>
											{temp[2].split(":")[1]}
										</p>
									</Button>
								);
							})}
					</div>
				</ScrollArea>
				<div className='mt-2 w-full'>
					<Button
						className='m-0 w-full p-0'
						onClick={handleMarkAllAsRead}
					>
						Mark all as read
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
