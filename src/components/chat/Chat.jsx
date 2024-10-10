import { Message, UserData } from "@/app/data";
import ChatTopBar from "./ChatTopBar";
import { ChatList } from "./ChatList";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMessages } from "@/lib/features/chatSlice";

export function Chat({  selectedChat, isMobile }) {
    const dispatch = useAppDispatch();
    const messagesState = useAppSelector((state) => state.chat.messages);

    const a= messagesState.filter(message => message.classSession === selectedChat) ;

    console.log("a",a);
    
    return (

        <div className="flex flex-col justify-between w-full h-full">
            <ChatTopBar selectedUser={selectedChat} />
{a&& <ChatList
                messages={a.messages}
                selectedUser={a.enrollment.id}
                isMobile={isMobile}
            />}
            
        </div>
    );
}
