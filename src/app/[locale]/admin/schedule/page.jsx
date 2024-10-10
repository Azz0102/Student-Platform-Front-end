import Schedule from "@/components/Schedule";
import useFcmToken from "@/hooks/useFcmToken";

export default function Page() {
	// const { token, notificationPermissionStatus } = useFcmToken();

	return (
		<div>
			<Schedule />
		</div>
	);
}
