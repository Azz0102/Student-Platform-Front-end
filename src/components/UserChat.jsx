"use client";

import { ChatLayout } from "./chat/ChatLayout";

export default function UserChat() {
    return (
        <div className="z-10 border rounded-lg w-full h-full text-sm flex">
            <ChatLayout />
        </div>
    );
}
