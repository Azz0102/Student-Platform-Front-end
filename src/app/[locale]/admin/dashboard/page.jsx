"use client";
import { AdminDashBoard } from "@/components/AdminDashBoard";
import useFcmToken from "@/hooks/useFcmToken";

export default function Page() {
	const { token, notificationPermissionStatus } = useFcmToken();

	return (
		<div>
			<AdminDashBoard />
		</div>
	);
}
