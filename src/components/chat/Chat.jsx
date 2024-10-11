import { Message, UserData } from "@/app/data";
import ChatTopBar from "./ChatTopBar";
import { ChatList } from "./ChatList";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMessages } from "@/lib/features/chatSlice";

export function Chat({ selectedChat, isMobile, messagesState, setMessages }) {
	const dispatch = useAppDispatch();

	console.log("b", messagesState);
	console.log("c", selectedChat);

	const message = messagesState.filter(
		(message) => message.classSession.id === selectedChat
	)[0];

	console.log(message)

	return (
		<div className='flex h-full w-full flex-col justify-between'>
			{message && (
				<>
					<ChatTopBar selectedUser={message.classSession} />
					<ChatList
						selectedChat={selectedChat}
						messagesState={messagesState}
						messages={message.newmessages}
						selectedUser={message.classSession.id}
						isMobile={isMobile}
						setMessages={setMessages}
					/>
				</>
			)}
		</div>
	);
}
