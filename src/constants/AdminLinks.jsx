import {
	Home,
	Calendar,
	AppWindow,
	UserRoundCog,
	Newspaper,
} from "lucide-react";

const links = [
	{
		href: "/admin/dashboard",
		icon: <Home className='h-5 w-5' />,
		title: "dashboard",
	},
	{
		href: "/admin/schedule",
		icon: <Calendar className='h-5 w-5' />,
		title: "schedule",
	},
	{
		href: "/admin/administration/0",
		icon: <UserRoundCog className='h-5 w-5' />,
		title: "administration",
	},
];

export default links;
