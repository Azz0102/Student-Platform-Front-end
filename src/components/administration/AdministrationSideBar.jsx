import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

const AdministrationSideBar = ({ lists, setSelected, isCollapsed }) => {
	return (
		<div
			data-collapsed={isCollapsed}
			className='group relative flex h-full flex-col gap-4 bg-muted/10 p-2 data-[collapsed=true]:p-2 dark:bg-muted/20'
		>
			<nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
				{lists.map((list, index) =>
					isCollapsed ? (
						<TooltipProvider key={index}>
							<Tooltip key={index} delayDuration={0}>
								<TooltipTrigger asChild>
									<Link
										href='#'
										className={cn(
											buttonVariants({
												variant: list.variant,
												size: "icon",
											}),
											"h-11 w-11 md:h-16 md:w-16",
											list.variant === "secondary" &&
												"dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
										)}
										onClick={(e) => {
											e.preventDefault();
											setSelected(list.id);
										}}
									>
										{/* <Avatar className='flex items-center justify-center'>
											<AvatarImage
												src={"/message.png"}
												alt={"logo"}
												width={6}
												height={6}
												className='h-10 w-10'
											/>
										</Avatar>{" "} */}
										{list.icon}
										<span className='sr-only'>
											{list.name}
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent
									side='right'
									className='flex items-center gap-4'
								>
									{list.name}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						<Link
							key={index}
							href='/'
							className={cn(
								buttonVariants({
									variant: list.variant,
									size: "xl",
								}),
								list.variant === "secondary" &&
									"shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
								"h-16 justify-start gap-4 px-5"
							)}
							onClick={(e) => {
								e.preventDefault();
								setSelected(list.id);
							}}
						>
							<div className='flex max-w-28 flex-row items-center'>
								{list.icon}
								<span className='ml-4'>{list.name}</span>
							</div>
						</Link>
					)
				)}
			</nav>
		</div>
	);
};

export default AdministrationSideBar;
