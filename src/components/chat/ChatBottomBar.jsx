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

import io from 'socket.io-client';

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

// Kết nối tới server socket với HTTPS và port 5000
const socket = io('wss://localhost:5000', {
    transports: ['websocket'],
});

export default function ChatBottombar({ isMobile }) {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState("");
    const inputRef = useRef(null);
    const messages = useAppSelector((state) => state.chat.messages);
    const [room, setRoom] = useState('general'); // Tạo room mặc định

    const hasInitialResponse = useAppSelector(
        (state) => state.hasInitialResponse
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
        socket.emit('joinRoom', room);

        // Nhận tin nhắn từ server
        socket.on('chatMessage', (msg) => {
            console.log(msg);
            dispatch(setMessages([...messages, msg]));
            // console.log(messages);
        });

        // return () => {
        //     socket.disconnect();
        // };
    }, [room]); // Khi room thay đổi, client sẽ tham gia room mới




    const handleThumbsUp = () => {
        const newMessage = {
            id: message.length + 1,
            name: loggedInUserData.name,
            avatar: loggedInUserData.avatar,
            message: "👍",
        };
        sendMessage(newMessage);
        socket.emit('chatMessage', newMessage, room);
        setMessage("");
    };

    const handleSend = () => {
        if (message.trim()) {
            console.log("message:", message.trim());
            const newMessage = {
                id: message.length + 1,
                name: loggedInUserData.name,
                avatar: loggedInUserData.avatar,
                message: message.trim(),
            };
            sendMessage(newMessage);
            const date = new Date();
            const options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true // Sử dụng định dạng 12 giờ (AM/PM)
            };

            const timestamp = date.toLocaleTimeString('en-US', options);
            console.log(timestamp); // Kết quả sẽ là dạng "10:06 AM"

            socket.emit('chatMessage', { ...newMessage, timestamp }, room);
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

        if (!hasInitialResponse) {
            setisLoading(true);
            setTimeout(() => {
                setMessages([
                    ...messages,
                    {
                        id: messages.length + 1,
                        avatar: "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
                        name: "Jane Doe",
                        message: "Awesome! I am just chilling outside.",
                        timestamp: formattedTime,
                    },
                ]);
                setisLoading(false);
                dispatch(setHasInitialResponse(true));
            }, 2500);
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

    return (
        <div className="px-2 py-4 flex justify-between w-full items-center gap-2">
            <div className="flex">
                <Popover>
                    <PopoverTrigger asChild>
                        <Link
                            href="#"
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                }),
                                "h-9 w-9",
                                "shrink-0"
                            )}
                        >
                            <PlusCircle
                                size={22}
                                className="text-muted-foreground"
                            />
                        </Link>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="w-full p-2">
                        {message.trim() || isMobile ? (
                            <div className="flex gap-2">
                                <Link
                                    href="#"
                                    className={cn(
                                        buttonVariants({
                                            variant: "ghost",
                                            size: "icon",
                                        }),
                                        "h-9 w-9",
                                        "shrink-0"
                                    )}
                                >
                                    <Mic
                                        size={22}
                                        className="text-muted-foreground"
                                    />
                                </Link>
                                {BottombarIcons.map((icon, index) => (
                                    <Link
                                        key={index}
                                        href="#"
                                        className={cn(
                                            buttonVariants({
                                                variant: "ghost",
                                                size: "icon",
                                            }),
                                            "h-9 w-9",
                                            "shrink-0"
                                        )}
                                    >
                                        <icon.icon
                                            size={22}
                                            className="text-muted-foreground"
                                        />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Link
                                href="#"
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                        size: "icon",
                                    }),
                                    "h-9 w-9",
                                    "shrink-0"
                                )}
                            >
                                <Mic
                                    size={22}
                                    className="text-muted-foreground"
                                />
                            </Link>
                        )}
                    </PopoverContent>
                </Popover>
                {!message.trim() && !isMobile && (
                    <div className="flex">
                        {BottombarIcons.map((icon, index) => (
                            <Link
                                key={index}
                                href="#"
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                        size: "icon",
                                    }),
                                    "h-9 w-9",
                                    "shrink-0"
                                )}
                            >
                                <icon.icon
                                    size={22}
                                    className="text-muted-foreground"
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence initial={false}>
                <motion.div
                    key="input"
                    className="w-full relative"
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
                        placeholder="Type a message..."
                        className="rounded-full"
                    />
                    <div className="absolute right-4 bottom-2  ">
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
                        className="h-9 w-9 shrink-0"
                        onClick={handleSend}
                        disabled={isLoading}
                        variant="ghost"
                        size="icon"
                    >
                        <SendHorizontal
                            size={22}
                            className="text-muted-foreground"
                        />
                    </Button>
                ) : (
                    <Button
                        className="h-9 w-9 shrink-0"
                        onClick={handleThumbsUp}
                        disabled={isLoading}
                        variant="ghost"
                        size="icon"
                    >
                        <ThumbsUp size={22} className="text-muted-foreground" />
                    </Button>
                )}
            </AnimatePresence>
        </div>
    );
}
