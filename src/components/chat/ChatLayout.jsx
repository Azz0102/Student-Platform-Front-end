"use client";

import { userData } from "@/app/data";
import React, { useEffect, useRef, useState } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "../ChatSideBar";
import { Chat } from "./Chat";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { useGetChatListQuery } from "@/lib/services/chat";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setSelectedChat } from "@/lib/features/chatSlice";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import _ from "lodash";
import { useDeepCompareEffect } from "use-deep-compare";
import io from "socket.io-client";
import { socket } from "../../components/Header";

export function ChatLayout({
	defaultLayout = [320, 480],
	defaultCollapsed = false,
	navCollapsedSize,
}) {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

	const [isMobile, setIsMobile] = useState(false);
	const { width, height } = useWindowDimensions();
	const dispatch = useDispatch();

	const refreshToken = Cookies.get("refreshToken");
	const decoded = jwtDecode(refreshToken);
	console.log("decoded", decoded);
	const {
		data: listChat,
		isLoading,
		isError,
		isSuccess,
	} = useGetChatListQuery({ userId: decoded.userId });

	const selectedChat = useSelector((state) => state.chat.selectedChat);
	// const messages = useSelector((state) => state.chat.messages);

	const [messages, setMessages] = useState([]);
	const [selected, setSelected] = useState(selectedChat ? selectedChat : 0);

	useEffect(() => {
		// Nhận tin nhắn từ server
		socket.on("chatMessaged", (msg, room) => {
			console.log("onMessage", room);

			setMessages((prevSessions) =>
				prevSessions.map((session) => {
					// Check if this is the session to update by matching enrollmentId

					console.log("check", session.classSession.id, selected);

					if (session.classSession.id == room) {
						// Return a new object with updated messages
						session.newmessages.map((e) => {
							if (e.id == msg.id) return session;
						});
						return {
							...session,
							newmessages: [...session.newmessages, msg],
						};
					}
					return session; // For other sessions, return unchanged
				})
			);
			// console.log(messages);
		});

		// Nhận tin nhắn file
		socket.on("fileReceived", (fileMessage, room) => {
			console.log("Received file message:", fileMessage);

			setMessages((prevSessions) =>
				prevSessions.map((session) => {
					// Check if this is the session to update by matching enrollmentId
					if (session.classSession.id == room) {
						// Return a new object with updated messages
						session.newmessages.map((e) => {
							if (e.id == fileMessage.id) return session;
						});
						return {
							...session,
							newmessages: [...session.newmessages, fileMessage],
						};
					}
					return session; // For other sessions, return unchanged
				})
			);
		});

		return () => {
			socket.off("chatMessaged");
			socket.off("fileReceived");
		};
	}, [selected, messages]);

	useDeepCompareEffect(() => {
		console.log("ue3");

		if (messages.length > 0) {
			for (let i = 0; i < messages.length; i++) {
				socket.emit("joinRoom", messages[i].classSession.id);
			}
		}

		// Tham gia vào một room
		// socket.emit("joinRoom", selectedChat);

		// return () => {
		// 	socket.disconnect();
		// };
	}, [selected, messages]); // messages, room, setMessages

	useDeepCompareEffect(() => {
		console.log("ue1");

		if (listChat) {
			// Only update state if the messages have changed
			setMessages(listChat.metadata.data);
		}
	}, [listChat]);

	useEffect(() => {
		console.log("ue2");

		const checkScreenWidth = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		// Initial check
		checkScreenWidth();

		// Event listener for screen width changes
		window.addEventListener("resize", checkScreenWidth);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener("resize", checkScreenWidth);
		};
	}, []);

	if (isLoading) return <LoadingSpinner />;

	if (isError)
		return (
			<Alert variant='destructive' className='w-5/6'>
				<AlertCircle className='h-4 w-4' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Error fetching tags</AlertDescription>
			</Alert>
		);

	if (!listChat)
		return (
			<Alert variant='destructive' className='w-5/6'>
				<AlertCircle className='h-4 w-4' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Error fetching tags</AlertDescription>
			</Alert>
		);

	return (
		<ResizablePanelGroup
			direction='horizontal'
			onLayout={(sizes) => {
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes
				)}`;
			}}
			className={`w-full items-stretch`}
			style={{
				height: isMobile ? `${height - 58}px` : `${height - 89}px`,
			}}
		>
			<ResizablePanel
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible={true}
				minSize={isMobile ? 13 : 24}
				maxSize={isMobile ? 13 : 30}
				onCollapse={() => {
					setIsCollapsed(true);
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						true
					)}`;
				}}
				onExpand={() => {
					setIsCollapsed(false);
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						false
					)}`;
				}}
				className={cn(
					isCollapsed &&
						"min-w-[50px] transition-all duration-300 ease-in-out md:min-w-[70px]"
				)}
			>
				<Sidebar
					isCollapsed={isCollapsed || isMobile}
					chats={
						Array.isArray(messages)
							? messages.map((chat) => ({
									id: chat.classSession?.id,
									name: chat.classSession?.name,
									messages: chat.newmessages ?? [],
									avatar: "",
									variant:
										selected === chat.classSession?.id
											? "secondary"
											: "ghost",
								}))
							: []
					}
					isMobile={isMobile}
					setSelected={setSelected}
				/>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
				{selected > 0 && (
					<Chat
						selectedChat={selected}
						isMobile={isMobile}
						messagesState={messages}
						setMessages={setMessages}
					/>
				)}
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
