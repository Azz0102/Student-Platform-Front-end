"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LineChart, Package2, PanelLeft, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import favicon from "../app/[locale]/favicon.ico";
import { ModeToggle } from "./mode-toggle";
import { NotiToggle } from "./notification-toggle";
import { DynamicBreadcrumb } from "./DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import links from "@/constants/Links";
import { usePathname, useRouter } from "next/navigation";
import { filterUrl } from "@/utils/filterUrl";
import Cookies from "js-cookie";
import { useLogoutMutation } from "@/lib/services/auth";

export function Header() {
	const pathName = usePathname();
	const router = useRouter();
	const [logout, { isLoading, isError }] = useLogoutMutation();
	return (
		<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
			<Sheet>
				<SheetTrigger asChild>
					<Button size='icon' variant='outline' className='sm:hidden'>
						<PanelLeft className='h-5 w-5' />
						<span className='sr-only'>Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='sm:max-w-xs'>
					<nav className='grid gap-6 text-lg font-medium'>
						<Link
							href='#'
							className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
						>
							<Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
							<span className='sr-only'>Acme Inc</span>
						</Link>
						{links.map((link, index) => {
							return (
								<Link
									key={index}
									href={link.href}
									className={`flex items-center gap-4 px-2.5 ${
										link.href === filterUrl(pathName)
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									{link.icon}
									{link.title}
								</Link>
							);
						})}
						<Link
							href='/user/setting'
							className={`flex items-center gap-4 px-2.5 ${
								"/user/setting" === filterUrl(pathName)
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Settings className='h-5 w-5' />
							Settings
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<DynamicBreadcrumb />
			<div className='relative ml-auto flex-1 md:grow-0'>
			</div>
			<NotiToggle />
			<ModeToggle />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='outline'
						size='icon'
						className='overflow-hidden rounded-full'
					>
						<Image
							src={favicon}
							width={36}
							height={36}
							alt='Avatar'
							className='overflow-hidden rounded-full'
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onSelect={() => {
							router.push("/user/setting");
						}}
					>
						Settings
					</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onSelect={() => {
							logout({
								refreshToken: Cookies.get("refreshToken"),
							});
							Cookies.remove("refreshToken");
							router.push("/login");
						}}
					>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
