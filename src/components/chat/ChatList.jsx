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
import Image from "next/image";
import isEqual from 'lodash/isEqual';
import { File } from "lucide-react";

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
	// selectedUser,
	isMobile,
	messagesState,
	selectedChat,
	setMessages,
}) {
	const messagesContainerRef = useRef(null);

	const prevMessagesRef = useRef(null);

	const [imageArray, setImageArray] = useState([]);

	let imageSrc;

	const refreshToken = Cookies.get("refreshToken");
	const { userId } = jwtDecode(refreshToken);

	const doSth = async () => {
		console.log("ue4");

		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}

		if(messages.length<0) {
			return ;
		}

		for (let i = 0; i < messages.length; i++) {
			const element = messages[i];

			if (element.file && checkTypeFile(element.message)) {
				console.log("element");
				const imgdata = await axios.get(
					`https://localhost:3001/api/message/file/${element.id}`,
					{
						headers: {
							refreshToken: Cookies.get("refreshToken"),
						},
						responseType: 'arraybuffer',
					}
				);

				const contentDisposition = imgdata.headers['content-disposition'];

				let fileName = '';
				if (contentDisposition && contentDisposition.includes('filename=')) {
					// Tách tên file từ header
					fileName = contentDisposition.split('filename=')[1].trim();
					// Xóa dấu ngoặc kép nếu có
					fileName = fileName.replace(/['"]/g, '');
				}

				console.log('fileName',fileName);

				const file = Buffer.from(imgdata.data, 'binary').toString('base64');


				imageSrc=`data:image/${checkTypeFile(element.message)};base64,${file}`

				
				setImageArray((array) => {
					return [
						...array,
						{
							id: element.id,
							data: imageSrc,
							type: `image/${checkTypeFile(element.message)}`,
							fileName
						},
					];
				});
			}
		}
	};

	useDeepCompareEffect(() => {
		console.log("fetch img", messages);
		const fetch = async ()=>{
			await doSth();
		}

		if (!isEqual(messages, prevMessagesRef.current)) {
            console.log("Messages have changed");
            prevMessagesRef.current = messages; // Cập nhật lại tham chiếu
            // Thực hiện logic của bạn ở đây
			fetch();
        }
		// fetch();

		return () => {
            setImageArray([]);
            console.log('Cleaning up...');
        };
	}, [messages]); 

	// useDeepCompareEffect(() => {}, []);

	
	const handleDownload = async (e,message) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <Link>

        try {
            const response = await axios.get(
                `https://localhost:3001/api/message/file/${message.id}`,
                {
                    headers: {
                        refreshToken: Cookies.get("refreshToken"),
                    },
                    responseType: 'blob', // Đặt responseType là 'blob' để nhận tệp
                }
            );

			const contentDisposition = response.headers['content-disposition'];

			console.log('contentDisposition',response);

			let fileName = '';
			if (contentDisposition && contentDisposition.includes('filename=')) {
				// Tách tên file từ header
				fileName = contentDisposition.split('filename=')[1].trim();
				// Xóa dấu ngoặc kép nếu có
				fileName = fileName.replace(/['"]/g, '');
			}

            // Tạo URL từ blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Tạo một thẻ <a> để kích hoạt tải xuống
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            // Dọn dẹp
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
	

	return (
		<div className='flex h-full w-full flex-col overflow-y-auto'>
			<ChatMessageList ref={messagesContainerRef}>
				<AnimatePresence>
					{messages.map((message, index) => {
						// const refreshToken = Cookies.get("refreshToken");
						// const { userId } = jwtDecode(refreshToken);
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
												<div className="flex flex-row items-center" >
													<div className="bg-background text-foreground rounded-full p-2">
														<File />
													</div>
													<Link
														href={"#"}
														onClick={(e) => handleDownload(e, message)}
														className="m-2"
													>
														{
															message.message.split(
																"\\"
															)[
																message.message.split(
																	"\\"
																).length - 1
															]
														}
													</Link>
												</div>
											)}
										{message.file &&
											checkTypeFile(message.message) &&
											imageArray.map((img, index) => {
												if (img.id === message.id)
													return (
														<a href={img.data} download={img.fileName} key={index}>
															<Image
																key={index}
																alt={img.data}
																src={img.data}
																width={300} // Thay đổi kích thước nếu cần
																height={200}
															></Image>
														</a>
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
