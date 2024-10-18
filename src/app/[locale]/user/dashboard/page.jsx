"use client";
import { Dashboard } from "@/components/dashboard";
import useFcmToken from "@/hooks/useFcmToken";
import { useSubSubscriptionMutation } from "@/lib/services/subscription";
import { useEffect } from "react";

export default function Page() {
	const { token, notificationPermissionStatus } = useFcmToken();
	const [subScription, {}] = useSubSubscriptionMutation();
	useEffect(() => {
		if (notificationPermissionStatus === "granted") {
			subScription({ endpoint: token });
		}
	}, []);

	return (
		<div>
			<Dashboard />
		</div>
	);
}
