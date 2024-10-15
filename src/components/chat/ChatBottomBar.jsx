import {
	FileImage,
	Mic,
	Paperclip,
	PlusCircle,
	SendHorizontal,
	ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Message, loggedInUserData } from "@/app/data";
import { EmojiPicker } from "../EmojiPicker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChatInput } from "../ui/chat/chat-input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMessages, setHasInitialResponse } from "@/lib/features/chatSlice";
import { useDeepCompareEffect } from "use-deep-compare";

import { socket } from "../Header";
export const BottombarIcons = [{ icon: Paperclip }];

export default function ChatBottombar({
	messages,
	isMobile,
	selectedChat,
	setMessages,
}) {
	const dispatch = useAppDispatch();

	const [message, setMessage] = useState("");
	const inputRef = useRef(null);
	const [room, setRoom] = useState(selectedChat); // Tạo room mặc định

	// const messages = useAppSelector(
	// 	(state) => state.chat.messages
	// );
	// const selectedChat = useAppSelector(
	// 	(state) => state.chat.selectedChat
	// );

	const [isLoading, setisLoading] = useState(false);

	const handleInputChange = (event) => {
		setMessage(event.target.value);
	};

	const sendMessage = (newMessage) => {
		// dispatch(setMessages([...messages, newMessage]));
		// console.log(messages);
	};

	useEffect(() => {
		// Nhận tin nhắn từ server
		socket.on("chatMessage", (msg) => {
			console.log("onMessage", msg);

			setMessages((prevSessions) =>
				prevSessions.map((session) => {
					// Check if this is the session to update by matching enrollmentId

					console.log("check",session.classSession.id, selectedChat);

					if (
						session.classSession.id === selectedChat

					) {
						// Return a new object with updated messages
						session.newmessages.map((e) => {
							if (e.id === msg.id) return session;
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
		socket.on("fileReceived", (fileMessage) => {
			console.log("Received file message:", fileMessage);

			setMessages((prevSessions) =>
				prevSessions.map((session) => {
					// Check if this is the session to update by matching enrollmentId
					if (
						session.classSession.id === selectedChat
					) {
						// Return a new object with updated messages
						session.newmessages.map((e) => {
							if (e.id === fileMessage.id) return session;
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
			socket.off("chatMessage");
			socket.off("fileReceived");
		};
	}, []);

	useDeepCompareEffect(() => {
		// // Kết nối tới server socket với HTTPS và port 5000
		// socket = io('https://localhost:5000', {
		//     transports: ['websocket'],
		// });
		console.log("ue3");

		// Tham gia vào một room
		socket.emit("joinRoom", selectedChat);

		// return () => {
		// 	socket.disconnect();
		// };
	}, [setMessages, selectedChat]); // messages, room, setMessages

	const handleThumbsUp = () => {
		const temp = messages.filter(
			(message) => message.classSession.id === selectedChat
		);

		const newMessage = {
			enrollmentId: temp[0].classSession.enrollmentId,
			message: "👍",
			file: false,
		};
		sendMessage(newMessage);
		const date = new Date();
		const options = {
			hour: "numeric",
			minute: "numeric",
			hour12: true, // Sử dụng định dạng 12 giờ (AM/PM)
		};

		const timestamp = date.toLocaleTimeString("en-US", options);

		socket.emit("chatMessage", newMessage, selectedChat);
		setMessage("");

		if (inputRef.current) {
			inputRef.current.focus();
		}

		// const newMessage = {
		// 	name: loggedInUserData.name,
		// 	avatar: loggedInUserData.avatar,
		// 	message: "👍",
		// };
		// sendMessage(newMessage);
		// socket.emit("chatMessage", newMessage, room);
		// setMessage("");
	};

	const handleSend = () => {
		const temp = messages.filter(
			(message) => message.classSession.id === selectedChat
		);
		if (message.trim()) {
			const newMessage = {
				enrollmentId: temp[0].classSession.enrollmentId,
				message: message.trim(),
				file: false,
			};
			sendMessage(newMessage);
			const date = new Date();
			const options = {
				hour: "numeric",
				minute: "numeric",
				hour12: true, // Sử dụng định dạng 12 giờ (AM/PM)
			};

			const timestamp = date.toLocaleTimeString("en-US", options);

			socket.emit("chatMessage", newMessage, selectedChat);
			setMessage("");

			if (inputRef.current) {
				inputRef.current.focus();
			}
		}
	};

	const formattedTime = new Date().toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleKeyPress = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}

		if (event.key === "Enter" && event.shiftKey) {
			event.preventDefault();
			setMessage((prev) => prev + "\n");
		}
	};

	const handleFileUpload = (event) => {
		console.log("Up File");
		const file = event.target.files[0];

		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			console.log("1");

			const base64String = reader.result.split(",")[1]; // Lấy phần Base64 của tệp
			const date = new Date();
			const options = {
				hour: "numeric",
				minute: "numeric",
				hour12: true, // Sử dụng định dạng 12 giờ (AM/PM)
			};
			const timestamp = date.toLocaleTimeString("en-US", options);

			console.log("2");
			const temp = messages.filter(
				(message) => message.classSession.id === selectedChat
			);
			const newMessage = {
				enrollmentId: temp[0].classSession.enrollmentId,
				message: base64String,
				fileName: file.name,
				fileType: file.type,
			};
			console.log(base64String);
			socket.emit("fileMessage", newMessage, selectedChat); // Gửi tệp qua socket
			console.log("3");
			event.target.value = null;
		};
		reader.readAsDataURL(file); // Đọc tệp dưới dạng Base64
	};

	return (
		<div className='flex w-full items-center justify-between gap-2 px-2 py-4'>
			<div className='flex'>
				{!message.trim() && !isMobile && (
					<div className='flex'>
						{BottombarIcons.map((icon, index) => (
							<div key={index} className='relative'>
								{/* Thẻ input ẩn */}
								<input
									type='file'
									id={`file-input-${index}`} // Đặt ID duy nhất cho mỗi input
									style={{ display: "none" }} // Ẩn thẻ input
									accept='.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx'
									onChange={handleFileUpload} // Kích hoạt hàm xử lý tải lên tệp
								/>

								{/* Thẻ label cho phép người dùng nhấp vào biểu tượng */}
								<label
									htmlFor={`file-input-${index}`}
									className={cn(
										buttonVariants({
											variant: "ghost",
											size: "icon",
										}),
										"h-9 w-9 shrink-0 cursor-pointer" // Thêm cursor-pointer để người dùng biết có thể nhấp
									)}
								>
									<icon.icon
										size={22}
										className='text-muted-foreground'
									/>
								</label>
							</div>
						))}
					</div>
				)}
			</div>

			<AnimatePresence initial={false}>
				<motion.div
					key='input'
					className='relative w-full'
					layout
					initial={{ opacity: 0, scale: 1 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 1 }}
					transition={{
						opacity: { duration: 0.05 },
						layout: {
							type: "spring",
							bounce: 0.15,
						},
					}}
				>
					<ChatInput
						value={message}
						ref={inputRef}
						onKeyDown={handleKeyPress}
						onChange={handleInputChange}
						placeholder='Type a message...'
						className='rounded-full'
					/>
					<div className='absolute bottom-2 right-4'>
						<EmojiPicker
							onChange={(value) => {
								setMessage(message + value);
								if (inputRef.current) {
									inputRef.current.focus();
								}
							}}
						/>
					</div>
				</motion.div>

				{message.trim() ? (
					<Button
						className='h-9 w-9 shrink-0'
						onClick={handleSend}
						disabled={isLoading}
						variant='ghost'
						size='icon'
					>
						<SendHorizontal
							size={22}
							className='text-muted-foreground'
						/>
					</Button>
				) : (
					<Button
						className='h-9 w-9 shrink-0'
						onClick={handleThumbsUp}
						disabled={isLoading}
						variant='ghost'
						size='icon'
					>
						<ThumbsUp size={22} className='text-muted-foreground' />
					</Button>
				)}
			</AnimatePresence>
		</div>
	);
}
