import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: "AIzaSyDJTi8mCLaxGMYm1MT3X2x86ufUf9DbIpc",
	authDomain: "fcm-doan-d019a.firebaseapp.com",
	projectId: "fcm-doan-d019a",
	storageBucket: "fcm-doan-d019a.appspot.com",
	messagingSenderId: "946699487658",
	appId: "1:946699487658:web:28ce653341d1aafd5383d3",
	measurementId: "G-N8Z64WCRQ3",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
	const supported = await isSupported();
	return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
	try {
		const fcmMessaging = await messaging();
		if (fcmMessaging) {
			const token = await getToken(fcmMessaging, {
				vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
			});
			return token;
		}
		return null;
	} catch (err) {
		console.error("An error occurred while fetching the token:", err);
		return null;
	}
};

export { app, messaging };
