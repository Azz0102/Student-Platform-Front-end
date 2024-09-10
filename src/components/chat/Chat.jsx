import { Message, UserData } from "@/app/data";
import ChatTopBar from "./ChatTopBar";
import { ChatList } from "./ChatList";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMessages } from "@/lib/features/chatSlice";

export function Chat({ messages, selectedUser, isMobile }) {
    const dispatch = useAppDispatch();
    const messagesState = useAppSelector((state) => state.chat.messages);

    const sendMessage = (newMessage) => {
        dispatch(setMessages([...messagesState, newMessage]));
    };

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <ChatTopBar selectedUser={selectedUser} />

            <ChatList
                messages={messagesState}
                selectedUser={selectedUser}
                sendMessage={sendMessage}
                isMobile={isMobile}
            />
        </div>
    );
}
