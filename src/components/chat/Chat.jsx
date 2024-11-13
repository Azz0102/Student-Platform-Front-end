import { useMemo } from "react";
import { ChatList } from "./ChatList";
import ChatTopBar from "./ChatTopBar";

export function Chat({ selectedChat, isMobile, messagesState, setMessages }) {

	console.log("bick", messagesState);
	console.log("count", selectedChat);

	const message = useMemo(()=>{
		console.log("hamnay");
		return messagesState.filter(
			(message) => message.classSession.id === selectedChat
		)[0];
	},[messagesState, selectedChat])

	

	console.log("mesSelecter",message)

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
