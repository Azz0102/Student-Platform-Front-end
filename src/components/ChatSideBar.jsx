"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Message } from "@/app/data";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "@/lib/features/chatSlice";

import Earth from "/public/android-chrome-192x192.png";

export function Sidebar({ chats, isCollapsed, isMobile, setSelected }) {
	return (
		<div
			data-collapsed={isCollapsed}
			className='group relative flex h-full flex-col gap-4 bg-muted/10 p-2 data-[collapsed=true]:p-2 dark:bg-muted/20'
		>
			{!isCollapsed && (
				<div className='flex items-center justify-between p-2'>
					<div className='flex items-center gap-2 text-2xl'>
						<p className='font-medium'>Chats</p>
						<span className='text-zinc-300'>({chats.length})</span>
					</div>

					<div>
						
					</div>
				</div>
			)}
			<nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
				{chats.map((chat, index) =>
					isCollapsed ? (
						<TooltipProvider key={index}>
							<Tooltip key={index} delayDuration={0}>
								<TooltipTrigger asChild>
									<Link
										href='#'
										className={cn(
											buttonVariants({
												variant: chat.variant,
												size: "icon",
											}),
											"h-11 w-11 md:h-16 md:w-16",
											chat.variant === "secondary" &&
												"dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
										)}
										onClick={(e) => {
											e.preventDefault();
                                            console.log(chat.id)
											setSelected(chat.id)
										}}
									>
										<Avatar className='flex items-center justify-center'>
											<AvatarImage
												src={'/message.png'}
												alt={'logo'}
												width={6}
												height={6}
												className='h-10 w-10'
											/>
										</Avatar>{" "}
										<span className='sr-only'>
											{chat.name}
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent
									side='right'
									className='flex items-center gap-4'
								>
									{chat.name}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						<Link
							key={index}
							href='/'
							className={cn(
								buttonVariants({
									variant: chat.variant,
									size: "xl",
								}),
								chat.variant === "secondary" &&
									"shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
								"h-16 justify-start gap-4 px-5"
							)}
							onClick={(e) => {
								e.preventDefault();
								setSelected(chat.id);
                                console.log(chat.id)

							}}
						>
							<Avatar className='flex items-center justify-center'>
								<AvatarImage
									src={'/message.png'}
									alt={'logo'}
									width={6}
									height={6}
									className='h-10 w-10'
								/>
							</Avatar>
							<div className='flex max-w-28 flex-col'>
								<span>{chat.name}</span>
								{chat.messages.length > 0 && (
									<span className='truncate text-xs text-zinc-300'>
										{
											chat.messages[
												chat.messages.length - 1
											].name
										}
										:{"  "}
										{
											chat.messages[
												chat.messages.length - 1
											].message
										}
									</span>
								)}
							</div>
						</Link>
					)
				)}
			</nav>
		</div>
	);
}
