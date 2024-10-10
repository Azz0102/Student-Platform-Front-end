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

import io from "socket.io-client";

export const BottombarIcons = [{ icon: Paperclip }];

// Kết nối tới server socket với HTTPS và port 5000
const socket = io("wss://localhost:5000", {
	transports: ["websocket"],
	maxHttpBufferSize: 1e7 // 10MB, bạn có thể thay đổi giá trị này
});

export default function ChatBottombar({ isMobile }) {
	const dispatch = useAppDispatch();

	const [message, setMessage] = useState("");
	const inputRef = useRef(null);
	const [room, setRoom] = useState("general"); // Tạo room mặc định

	const messages = useAppSelector(
		(state) => state.messages
	);
	const selectedChat = useAppSelector(
		(state) => state.selectedChat
	);

	const [isLoading, setisLoading] = useState(false);

	const handleInputChange = (event) => {
		setMessage(event.target.value);
	};

	const sendMessage = (newMessage) => {
		// dispatch(setMessages([...messages, newMessage]));
		// console.log(messages);
	};

	useEffect(() => {
		// // Kết nối tới server socket với HTTPS và port 5000
		// socket = io('https://localhost:5000', {
		//     transports: ['websocket'],
		// });

		// Tham gia vào một room
		socket.emit("joinRoom", room);

		// Nhận tin nhắn từ server
		socket.on("chatMessage", (msg) => {

			let newMessages = messages;
			let updatedMessage = newMessages.filter((message)=> message.enrollmentId === msg.enrollmentId)

			updatedMessage = [msg,...updatedMessage];

			dispatch(setMessages(newMessages));
			// console.log(messages);
		});

		// Nhận tin nhắn file
		socket.on("fileReceived", (fileMessage) => {
			console.log("Received file message:", fileMessage);

			let newMessages = messages;
			let updatedMessage = newMessages.filter((message)=> message.enrollmentId === msg.enrollmentId)

			updatedMessage = [fileMessage,...updatedMessage];

			dispatch(setMessages(newMessages));
		});

		// return () => {
		//     socket.disconnect();
		// };
	}, [dispatch, message, messages, room]); // Khi room thay đổi, client sẽ tham gia room mới

	const handleThumbsUp = () => {
		const newMessage = {
			name: loggedInUserData.name,
			avatar: loggedInUserData.avatar,
			message: "👍",
		};
		sendMessage(newMessage);
		socket.emit("chatMessage", newMessage, room);
		setMessage("");
	};

	const handleSend = () => {

		const temp = messages.filter(message => message.classSession.id ===selectedChat)		
		if (message.trim()) {
			const newMessage = {
				enrollmentId: temp.enrollment.id,
				message: message.trim(),
				file:false
			};
			sendMessage(newMessage);
			const date = new Date();
			const options = {
				hour: "numeric",
				minute: "numeric",
				hour12: true, // Sử dụng định dạng 12 giờ (AM/PM)
			};

			const timestamp = date.toLocaleTimeString("en-US", options);

			socket.emit("chatMessage", newMessage);
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
			const temp = messages.filter(message => message.classSession.id ===selectedChat)
			const newMessage = {
				enrollmentId: temp.enrollment.id,
				message: base64String,
				fileName: file.name,
				fileType: file.type,
				timestamp
			};
			console.log(base64String);
			socket.emit("fileMessage", newMessage, room); // Gửi tệp qua socket
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
									type="file"
									id={`file-input-${index}`} // Đặt ID duy nhất cho mỗi input
									style={{ display: "none" }} // Ẩn thẻ input
									accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
									onChange={handleFileUpload} // Kích hoạt hàm xử lý tải lên tệp
								/>

								{/* Thẻ label cho phép người dùng nhấp vào biểu tượng */}
								<label htmlFor={`file-input-${index}`} className={cn(
									buttonVariants({
										variant: "ghost",
										size: "icon",
									}),
									"h-9 w-9 shrink-0 cursor-pointer" // Thêm cursor-pointer để người dùng biết có thể nhấp
								)}>
									<icon.icon size={22} className='text-muted-foreground' />
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
