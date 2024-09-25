"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ChevronRight, Newspaper, AlertCircle } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetListNewsByUserQuery } from "@/lib/services/news";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { useRouter } from "next/navigation";

const newsItems = [
	{
		id: 1,
		title: "AI Breakthrough",
		content:
			"Major tech company announces new AI breakthrough in natural language processing",
	},
	{
		id: 2,
		title: "Climate Agreement",
		content:
			"Global climate summit reaches historic agreement on carbon emissions reduction",
	},
	{
		id: 3,
		title: "Market Record",
		content:
			"Stock market hits record high amid signs of strong economic recovery",
	},
	{
		id: 4,
		title: "Coffee Benefits",
		content:
			"New study reveals surprising long-term health benefits of moderate coffee consumption",
	},
	{
		id: 5,
		title: "Mars Mission",
		content:
			"Space agency unveils detailed plans for first manned mission to Mars in 2030",
	},
	{
		id: 6,
		title: "Clean Energy",
		content:
			"Revolutionary clean energy technology promises to make fossil fuels obsolete within a decade",
	},
	{
		id: 7,
		title: "Education Initiative",
		content:
			"Global education initiative aims to bridge digital divide in developing countries",
	},
];

export function NewsCard() {
	// const { data, error, isLoading } = useGetListNewsByUserQuery("2");
	const { width, height } = useWindowDimensions();
	const router = useRouter();

	return (
		<Card className='mx-auto w-full max-w-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<CardHeader className='ml-6 space-y-1'>
				<CardTitle className='text-2xl font-bold text-primary'>
					<Newspaper className='mr-2 inline-block h-6 w-6' />
					News
				</CardTitle>
				<CardDescription>
					Stay informed with the latest breaking news
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea
					className={`w-full [&>div>div[style]]:!block`}
					style={{ height: `${height - 250}px` }}
				>
					<div className='flex w-full flex-col items-center space-y-4'>
						{/* {isLoading &&
                            Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
                                    ></div>
                                ))}
                        {error && (
                            <Alert variant="destructive" className="mr-3">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {error.message}
                                </AlertDescription>
                            </Alert>
                        )} */}
						{
							// data &&
							newsItems.map((item) => (
								<Button
									key={item.id}
									variant='outline'
									className='group flex h-auto w-11/12 justify-between p-4 text-left transition-all duration-200 hover:bg-primary hover:text-primary-foreground'
									onClick={() => {
										router.push(
											`/user/dashboard/news/${item.id}`
										);
									}}
								>
									<div className='flex w-10/12 flex-col'>
										<span className='mb-1 text-lg font-semibold'>
											{item.title}
										</span>
										<span className='line-clamp-2 text-sm text-muted-foreground group-hover:text-primary-foreground/90'>
											{item.content}
										</span>
									</div>
									<ChevronRight className='ml-auto h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1' />
								</Button>
							))
						}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
