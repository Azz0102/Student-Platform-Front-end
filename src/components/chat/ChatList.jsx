import { Message, UserData } from "@/app/data";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";
import ChatBottombar from "./ChatBottomBar";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChatBubbleAvatar,
    ChatBubbleMessage,
    ChatBubbleTimestamp,
    ChatBubble,
} from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";

const getMessageVariant = (messageName, selectedUserName) =>
    messageName !== selectedUserName ? "sent" : "received";

export function ChatList({ messages, selectedUser, sendMessage, isMobile }) {
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="w-full overflow-y-auto h-full flex flex-col">
            <ChatMessageList ref={messagesContainerRef}>
                <AnimatePresence>
                    {messages.map((message, index) => {
                        const variant = getMessageVariant(
                            message.name,
                            selectedUser.name
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
                                className="flex flex-col gap-2 p-4"
                            >
                                {/* Usage of ChatBubble component */}
                                <div className={`text-foreground ${variant === 'sent' ? 'self-end mr-14': 'ml-14'}`}>
                                    20020646
                                </div>
                                
                                <ChatBubble variant={variant}>
                                    <ChatBubbleAvatar src={message.avatar} />
                                    <ChatBubbleMessage
                                        variant={variant}
                                        isLoading={message.isLoading}
                                    >
                                        {message.message}
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
            <ChatBottombar isMobile={isMobile} />
        </div>
    );
}
