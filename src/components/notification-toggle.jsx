"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "./ui/button";

const notifications = [
    {
        id: 1,
        title: "New message",
        description: "You have a new message from John",
        isRead: false,
        time: "5 min ago",
    },
    {
        id: 2,
        title: "Meeting reminder",
        description: "Team meeting in 30 minutes",
        isRead: false,
        time: "30 min ago",
    },
    {
        id: 3,
        title: "Task completed",
        description: "Project X has been marked as complete",
        isRead: true,
        time: "2 hours ago",
    },
    {
        id: 4,
        title: "New follower",
        description: "Jane Doe started following you",
        isRead: true,
        time: "1 day ago",
    },
    {
        id: 5,
        title: "New follower",
        description: "Jane Doe started following you",
        isRead: true,
        time: "1 day ago",
    },
    {
        id: 6,
        title: "New follower",
        description: "Jane Doe started following you",
        isRead: true,
        time: "1 day ago",
    },
    {
        id: 7,
        title: "New follower",
        description: "Jane Doe started following you",
        isRead: true,
        time: "1 day ago",
    },
];
export function NotiToggle() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative flex">
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-primary px-1 py-0.5 text-center align-baseline text-xs font-bold leading-none text-primary-foreground">
                        9+
                    </div>
                    <Bell className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
                <h3 className="font-semibold text-lg mb-2">Notifications</h3>
                <ScrollArea className="h-60">
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <Button
                                key={notification.id}
                                onClick={() =>
                                    handleNotificationClick(notification.id)
                                }
                                className={`w-72 p-3 h-auto rounded-lg text-left flex flex-col items-start ${
                                    notification.isRead
                                        ? "bg-background hover:bg-muted"
                                        : "bg-muted hover:bg-muted/80"
                                }`}
                                variant="ghost"
                            >
                                <div className="flex justify-between items-start w-full">
                                    <h4 className="font-semibold text-sm">
                                        {notification.title}
                                    </h4>
                                    <span className="text-xs text-muted-foreground">
                                        {notification.time}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {notification.description}
                                </p>
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
                <div className="w-full mt-2">
                    <Button className="w-full p-0 m-0">Mark all as read</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
