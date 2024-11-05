import { Home, Calendar, AppWindow } from "lucide-react";

const links = [
	{
		href: "/admin/dashboard",
		icon: <Home className='h-5 w-5' />,
		title: "Dashboard",
	},
	{
		href: "/admin/schedule",
		icon: <Calendar className='h-5 w-5' />,
		title: "Schedule",
	},
	{
		href: "/admin/app",
		icon: <AppWindow className='h-5 w-5' />,
		title: "App",
	},
	{
		href: "/admin/quantri",
		icon: <AppWindow className='h-5 w-5' />,
		title: "Quan Tri",
	},
];

export default links;
