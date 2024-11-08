import { Home, Calendar, AppWindow,UserRoundCog,Newspaper } from "lucide-react";

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
		href: "/admin/quantri",
		icon: <UserRoundCog className='h-5 w-5' />,
		title: "Quan Tri",
	},
	{
		href: "/admin/news",
		icon: <Newspaper className='h-5 w-5' />,
		title: "New",
	},
];

export default links;
