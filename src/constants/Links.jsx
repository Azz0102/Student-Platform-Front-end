import { Home, NotebookPen, MessageCircle } from "lucide-react";

const links = [
	{
		href: "/user/dashboard",
		icon: <Home className='h-5 w-5' />,
		title: "Dashboard",
	},
	{
		href: "/user/note",
		icon: <NotebookPen className='h-5 w-5' />,
		title: "Note",
	},
	{
		href: "/user/chat",
		icon: <MessageCircle className='h-5 w-5' />,
		title: "Note",
	},
];

export default links;
