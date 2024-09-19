"use client";
import { Dashboard } from "@/components/dashboard";
import useFcmToken from "@/hooks/useFcmToken";

export default function Page() {
	const { token, notificationPermissionStatus } = useFcmToken();

	return (
		<div>
			<Dashboard />
		</div>
	);
}
