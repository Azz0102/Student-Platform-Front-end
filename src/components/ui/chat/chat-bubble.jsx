import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageLoading from "./message-loading";

// ChatBubble
const chatBubbleVariant = cva("flex gap-2 max-w-[60%] items-end relative", {
	variants: {
		variant: {
			received: "self-start",
			sent: "self-end flex-row-reverse",
		},
		layout: {
			default: "",
			ai: "max-w-full w-full items-center",
		},
	},
	defaultVariants: {
		variant: "received",
		layout: "default",
	},
});

const ChatBubble = React.forwardRef(
	({ className, variant, layout, children, ...props }, ref) => (
		<div
			className={cn(chatBubbleVariant({ variant, layout, className }))}
			ref={ref}
			{...props}
		>
			{children}
		</div>
	)
);
ChatBubble.displayName = "ChatBubble";

const ChatBubbleAvatar = ({ src, fallback, className }) => (
	<Avatar className={className}>
		<AvatarImage src={src} alt='Avatar' />
		<AvatarFallback>{fallback}</AvatarFallback>
	</Avatar>
);

// ChatBubbleMessage
const chatBubbleMessageVariants = cva("p-4", {
	variants: {
		variant: {
			received:
				"bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg",
			sent: "bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg",
		},
		layout: {
			default: "",
			ai: "border-t w-full rounded-none bg-transparent",
		},
	},
	defaultVariants: {
		variant: "received",
		layout: "default",
	},
});

const ChatBubbleMessage = React.forwardRef(
	(
		{ className, variant, layout, isLoading = false, children, ...props },
		ref
	) => (
		<div
			className={cn(
				chatBubbleMessageVariants({ variant, layout, className }),
				"max-w-full whitespace-pre-wrap break-words"
			)}
			ref={ref}
			{...props}
		>
			{isLoading ? (
				<div className='flex items-center space-x-2'>
					<MessageLoading />
				</div>
			) : (
				children
			)}
		</div>
	)
);
ChatBubbleMessage.displayName = "ChatBubbleMessage";

// ChatBubbleTimestamp

const ChatBubbleTimestamp = ({ timestamp, className, ...props }) => {
	const date = new Date(timestamp);

	// Format the date
	const options = {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: false, // Use false for 24-hour format
	};

	const formattedDate = date
		.toLocaleString("en-GB", options)
		.replace(",", "");
	return (
		<div className={cn("mt-2 text-right text-xs", className)} {...props}>
			{formattedDate}
		</div>
	);
};

export {
	ChatBubble,
	ChatBubbleAvatar,
	ChatBubbleMessage,
	ChatBubbleTimestamp,
	chatBubbleVariant,
	chatBubbleMessageVariants,
};
