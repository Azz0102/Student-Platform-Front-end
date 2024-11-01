import { Home, NotebookPen, MessageCircle } from "lucide-react";

const links = [
	{
		href: "/user/dashboard",
		icon: <Home className='h-5 w-5' />,
		title: "dashboard",
	},
	{
		href: "/user/note",
		icon: <NotebookPen className='h-5 w-5' />,
		title: "note",
	},
	{
		href: "/user/chat",
		icon: <MessageCircle className='h-5 w-5' />,
		title: "chat",
	},
];

export default links;
