import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserData } from "@/app/data";
import { Info, Phone, Video } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ExpandableChatHeader } from "../ui/chat/expandable-chat";
import Earth from "/public/android-chrome-192x192.png";

// export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({ selectedUser }) {
	return (
		<ExpandableChatHeader>
			<div className='flex items-center gap-2'>
				<Avatar className='flex items-center justify-center'>
					<AvatarImage
						src={"/chat.png"}
						alt={"logo"}
						width={8}
						height={8}
						className='h-8 w-8'
					/>
				</Avatar>
				<div className='flex flex-col'>
					<span className='font-medium'>{selectedUser.name}</span>
				</div>
			</div>

			<div className='flex gap-1'>
				{/* {TopbarIcons.map((icon, index) => (
                    <Link
                        key={index}
                        href="#"
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "h-9 w-9"
                        )}
                    >
                        <icon.icon
                            size={20}
                            className="text-muted-foreground"
                        />
                    </Link>
                ))} */}
			</div>
		</ExpandableChatHeader>
	);
}
