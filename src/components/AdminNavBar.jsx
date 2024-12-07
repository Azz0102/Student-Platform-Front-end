"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings, UniversityIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { filterUrl } from "@/utils/filterUrl";
import links from "@/constants/AdminLinks";
import { useTranslation } from "react-i18next";

export default function AdminNavBar() {
	const { t } = useTranslation();
	const pathName = usePathname();
	return (
		<TooltipProvider>
			<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
				<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
					<Link
						href='/admin/dashboard'
						className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
					>
						<UniversityIcon className='h-4 w-4 transition-all group-hover:scale-110' />
						<span className='sr-only'>Acme Inc</span>
					</Link>
					{links.map((link, index) => {
						return (
							<Tooltip key={index}>
								<TooltipTrigger asChild>
									<Link
										href={link.href}
										className={`flex h-9 w-9 items-center justify-center rounded-lg ${
											link.href === filterUrl(pathName)
												? "bg-accent text-accent-foreground"
												: "text-muted-foreground"
										} transition-colors hover:text-foreground md:h-8 md:w-8`}
									>
										{link.icon}
										<span className='sr-only'>
											{t("dashboard")}
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>
									{t(`${link.title}`)}
								</TooltipContent>
							</Tooltip>
						);
					})}
				</nav>
				<nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='/admin/setting'
								className={`flex h-9 w-9 items-center justify-center rounded-lg ${
									"/admin/setting" === filterUrl(pathName)
										? "bg-accent text-accent-foreground"
										: "text-muted-foreground"
								} transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<Settings className='h-5 w-5' />
								<span className='sr-only'>{t("settings")}</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>
							{t("settings")}
						</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	);
}
