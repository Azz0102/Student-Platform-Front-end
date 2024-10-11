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
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

// import earth from '../../../public/'

const getMessageVariant = (messageName, selectedUserName) =>
	messageName == selectedUserName ? "sent" : "received";

const checkTypeFile = (filePath) => {
	const ImageType = ["jpeg", "png", "jpg"];

	for (let i = 0; i < ImageType.length; i++) {
		const element = ImageType[i];
		if (filePath.includes(element)) return element;
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

	const [imageArray, setImageArray] = useState([]);

	const doSth = async () => {
		console.log("ue4");

		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}

		for (let i = 0; i < messages.length; i++) {
			const element = messages[i];

			console.log(element);
			if (element.file && checkTypeFile(element.message)) {
				const file = await axios.get(
					`https://localhost:3001/api/message/file/${element.id}`,
					{
						headers: {
							refreshToken: Cookies.get("refreshToken"),
						},
					}
				);
				console.log("file", file);
				setImageArray((array) => {
					return [
						...array,
						{
							id: element.id,
							data: file.data,
							type: `image/${checkTypeFile(element.message)}`,
						},
					];
				});
			}
		}
	};

	useDeepCompareEffect(() => {
		doSth();
	}, [messages]); //

	// useDeepCompareEffect(() => {}, []);

	return (
		<div className='flex h-full w-full flex-col overflow-y-auto'>
			<ChatMessageList ref={messagesContainerRef}>
				<AnimatePresence>
					{messages.map((message, index) => {
						const refreshToken = Cookies.get("refreshToken");
						const { userId } = jwtDecode(refreshToken);
						console.log('Huy',message,'-',userId)
						const variant = getMessageVariant(
							message.usedId,
							userId
						);

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
									{message.name}
								</div>

								<ChatBubble variant={variant}>
									<ChatBubbleAvatar src={"/user.png"} />

									<ChatBubbleMessage
										variant={variant}
										isLoading={false}
									>
										{message.file &&
											!checkTypeFile(message.message) && (
												<Link
													href={"#"}
													onClick={async (e) => {
														e.preventDefault();
														const file =
															await axios.get(
																`https://localhost:3001/api/message/file/${message.id}`,
																{
																	headers: {
																		refreshToken:
																			Cookies.get(
																				"refreshToken"
																			),
																	},
																}
															);
													}}
												>
													{
														message.message.split(
															"/"
														)[
															message.message.split(
																"/"
															).length - 1
														]
													}
												</Link>
											)}
										{message.file &&
											checkTypeFile(message.message) &&
											imageArray.map((img, index) => {
												if (img.id === message.id)
													return (
														<img
															key={index}
															src={`data:${img.type};base64,${img.data.toString("base64")}`}
														></img>
													);
											})}
										{!message.file && message.message}
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
