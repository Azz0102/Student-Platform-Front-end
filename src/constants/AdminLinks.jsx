import { Home, Calendar, AppWindow,UserRoundCog,Newspaper, Users, UsersRound, Building2, CalendarClock, LibraryBig } from "lucide-react";

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
		href: "/admin/sinhsien",
		icon: <Users className='h-5 w-5' />,
		title: "SinhVien",
	},
	{
		href: "/admin/giaovien",
		icon: <UsersRound className='h-5 w-5' />,
		title: "GiaoVien",
	},
	{
		href: "/admin/phonghoc",
		icon: <Building2 className='h-5 w-5' />,
		title: "PhongHoc",
	},
	{
		href: "/admin/tintuc",
		icon: <Newspaper className='h-5 w-5' />,
		title: "TinTuc",
	},
	{
		href: "/admin/buoihoc",
		icon: <CalendarClock className='h-5 w-5' />,
		title: "BuoiHoc",
	},
	{
		href: "/admin/monhoc",
		icon: <LibraryBig className='h-5 w-5' />,
		title: "Monhoc",
	},
];

export default links;
