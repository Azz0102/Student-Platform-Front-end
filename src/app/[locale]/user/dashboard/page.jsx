"use client";
import { Dashboard } from "@/components/dashboard";
import useFcmToken from "@/hooks/useFcmToken";
import { useSubSubscriptionMutation } from "@/lib/services/subscription";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
	const { token, notificationPermissionStatus } = useFcmToken();
	const [subScription, {}] = useSubSubscriptionMutation();
	useEffect(() => {
		if (notificationPermissionStatus === "granted") {
			try {
				subScription({ endpoint: token });
			} catch (error) {
				toast.error("Notification error");
			}
		}
	}, [notificationPermissionStatus, subScription, token]);

	return (
		<div>
			<Dashboard />
		</div>
	);
}
