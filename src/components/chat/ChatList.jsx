import { Message, UserData } from "@/app/data";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";
import ChatBottombar from "./ChatBottomBar";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import {
	ChatBubbleAvatar,
	ChatBubbleMessage,
	ChatBubbleTimestamp,
	ChatBubble,
} from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { useGetFileQuery } from "@/lib/services/file";
import axios from "axios";
import Earth from "/public/android-chrome-192x192.png";
import { useDeepCompareEffect } from "use-deep-compare";

// import earth from '../../../public/'

const getMessageVariant = (messageName, selectedUserName) =>
	messageName == selectedUserName ? "sent" : "received";

const checkTypeFile = (filePath) => {
	const ImageType = ["jpeg", "png", "jpg"];

	for (let i = 0; i < ImageType.length; i++) {
		const element = ImageType[i];
		if (filePath.includes(element)) return true;
	}

	return false;
};

export function ChatList({
	messages,
	selectedUser,
	isMobile,
	messagesState,
	selectedChat,
	setMessages,
}) {
	const messagesContainerRef = useRef(null);

	useDeepCompareEffect(() => {
		console.log("ue4");

		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [messages]); //

	useDeepCompareEffect(() => {}, []);

	return (
		<div className='flex h-full w-full flex-col overflow-y-auto'>
			<ChatMessageList ref={messagesContainerRef}>
				<AnimatePresence>
					{messages.map((message, index) => {
						const variant = getMessageVariant(
							message.enrollmentId,
							selectedUser
						);
						// if (message.file && checkTypeFile(message.message)) {
						// 	const file = await axios.get(
						// 		`https://localhost:3001/api/message/file/${message.id}`,
						// 		{
						// 			headers: {
						// 				refreshToken:
						// 					Cookies.get("refreshToken"),
						// 			},
						// 		}
						// 	);

						// 	console.log(file);
						// }

						return (
							<motion.div
								key={index}
								layout
								initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
								animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
								exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
								transition={{
									opacity: { duration: 0.1 },
									layout: {
										type: "spring",
										bounce: 0.3,
										duration: index * 0.05 + 0.2,
									},
								}}
								style={{ originX: 0.5, originY: 0.5 }}
								className='flex flex-col gap-2 p-4'
							>
								<div
									className={`text-foreground ${variant === "sent" ? "mr-14 self-end" : "ml-14"}`}
								>
									{message.user.name}
								</div>

								<ChatBubble variant={variant}>
									<ChatBubbleAvatar src={Earth} />

									<ChatBubbleMessage
										variant={variant}
										isLoading={false}
									>
										{
											// !message.file &&
											message.content
										}
										{message.timestamp && (
											<ChatBubbleTimestamp
												timestamp={message.timestamp}
											/>
										)}
									</ChatBubbleMessage>
								</ChatBubble>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</ChatMessageList>
			<ChatBottombar
				setMessages={setMessages}
				selectedChat={selectedChat}
				messages={messagesState}
				isMobile={isMobile}
			/>
		</div>
	);
}
