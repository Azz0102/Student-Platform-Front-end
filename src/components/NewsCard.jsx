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
import {
	useGetListNewsByUserQuery,
	useGetUserRelatedNewsQuery,
} from "@/lib/services/news";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDeepCompareEffect } from "use-deep-compare";
import { useDispatch } from "react-redux";
import { setListNews, setSelectedNews } from "@/lib/features/newsSlice";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "./ui/loading-spinner";
import { Preview } from "./Preview";

export function NewsCard() {
	// const { data, error, isLoading } = useGetListNewsByUserQuery("2");

	const dispatch = useDispatch();
	const refreshToken = Cookies.get("refreshToken");
	let userId = "";

	if (refreshToken) {
		userId = jwtDecode(refreshToken).userId;
	}
	const {
		data: news,
		isLoading,
		isError,
		isSuccess,
	} = useGetUserRelatedNewsQuery(
		{ userId: userId },
		{
			refetchOnFocus: true,
			refetchOnMountOrArgChange: true,
		}
	);

	const [newsItems, setNewsItems] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		if (news) {
			setNewsItems(_.cloneDeep(news));
		}
	}, [news]);

	const { width, height } = useWindowDimensions();
	const router = useRouter();

	if (isLoading) {
		return (
			<div className='flex w-full items-center justify-center'>
				<LoadingSpinner />
			</div>
		);
	}

	if (isError) {
		return (
			<div className='mx-auto w-full max-w-2xl'>
				<Alert variant='destructive' className='w-5/6'>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>{t("error")}</AlertTitle>
					<AlertDescription>
						{t("errorFetchingNews")}
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (isSuccess && newsItems) {
		return (
			<Card className='mx-auto w-full max-w-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
				<CardHeader className='ml-6 space-y-1'>
					<CardTitle className='text-2xl font-bold text-primary'>
						<Newspaper className='mr-2 inline-block h-6 w-6' />
						{t("news")}
					</CardTitle>
					<CardDescription>
						{t("stayInformedWithTheLatestBreakingNews")}
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
								newsItems &&
									newsItems.metadata.reverse().map((item) => (
										<Button
											key={item.id}
											variant='outline'
											className='group flex h-auto w-11/12 justify-between p-4 text-left transition-all duration-200 hover:bg-primary hover:text-primary-foreground'
											onClick={() => {
												dispatch(setSelectedNews(item));
												router.push(
													`/user/dashboard/news/${item.id}`
												);
											}}
										>
											<div className='flex w-10/12 flex-col truncate'>
												<span className='mb-1 text-ellipsis text-lg font-semibold'>
													{item.title}
												</span>
												<span className='line-clamp-2 h-6 text-sm text-muted-foreground group-hover:text-primary-foreground/90'>
													<Preview
														textValue={item.content}
													/>
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
}
