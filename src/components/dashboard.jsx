"use client";

import * as React from "react";

import { MyCalendar } from "./calendar";
import { NewsCard } from "./NewsCard";
import useFcmToken from "@/hooks/useFcmToken";
import { useSubSubscriptionMutation } from "@/lib/services/subscription";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
export function Dashboard() {
	const { token, notificationPermissionStatus } = useFcmToken();
	const [subScription, {}] = useSubSubscriptionMutation();
	const { t } = useTranslation();

	useEffect(() => {
		if (notificationPermissionStatus === "granted") {
			try {
				subScription({ endpoint: token });
			} catch (error) {
				toast.error(t("notificationError"));
			}
		}
	}, [notificationPermissionStatus, subScription, t, token]);
	return (
		<main className='flex flex-col lg:m-2 lg:flex-row'>
			<div className='block w-full lg:w-3/5'>
				<MyCalendar />
			</div>
			<div className='my-2 ml-2 flex w-full flex-col items-center justify-center p-0 lg:w-2/5'>
				<NewsCard />
			</div>
		</main>
	);
}
