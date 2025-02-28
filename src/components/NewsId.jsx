"use client";

import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	AlertCircle,
	ArrowRightIcon,
	CalendarIcon,
	CloudDownload,
	File,
	FileImage,
	MapPinIcon,
	Paperclip,
} from "lucide-react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useGetUserRelatedNewsQuery } from "@/lib/services/news";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { LoadingSpinner } from "./ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import axios from "axios";
import { Preview } from "./Preview";

function isImageFile(filename) {
	const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
	const extension = filename.split(".").pop().toLowerCase();
	return imageExtensions.includes(extension);
}
export default function NewsId({}) {
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

	const pathname = usePathname().split("/");
	const NewsId = pathname[pathname.length - 1];

	const { t } = useTranslation();

	const [newsItems, setNewsItems] = useState(null);
	const [mainNews, setMainNews] = useState(null);
	const [relatedNews, setRelatedNews] = useState(null);

	const handleDownload = async (fileId) => {
		try {
			const response = await axios.get(
				`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/news/file/${fileId}`,
				{
					headers: {
						refreshToken: refreshToken,
					},
					responseType: "blob", // Đặt responseType là 'blob' để nhận tệp
				}
			);

			const contentDisposition = response.headers["content-disposition"];

			let fileName = "";
			if (
				contentDisposition &&
				contentDisposition.includes("filename=")
			) {
				// Tách tên file từ header
				fileName = contentDisposition.split("filename=")[1].trim();
				// Xóa dấu ngoặc kép nếu có
				fileName = fileName.replace(/['"]/g, "");
				fileName = fileName.replace(/^\d+-/, "");
			}

			// Tạo URL từ blob
			const url = window.URL.createObjectURL(new Blob([response.data]));

			// Tạo một thẻ <a> để kích hoạt tải xuống
			const a = document.createElement("a");
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();

			// Dọn dẹp
			a.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error downloading file:", error);
		}
	};

	useEffect(() => {
		if (news) {
			setNewsItems(_.cloneDeep(news.metadata));
		}
	}, [news]);

	useEffect(() => {
		if (newsItems) {
			const mainNew = newsItems.find((item) => {
				return item.id == NewsId;
			});

			console.log("main", newsItems);
			setMainNews(mainNew);
			const listRelate = newsItems;

			const array = listRelate.map((item) => ({
				id: item.id,
				title: item.title,
				relatedTo: item.relatedTo.map((related) => related.name), // Chỉ lấy tên từ mảng relatedTo
				isGeneralSchoolNews: item.isGeneralSchoolNews,
			}));

			const filteredNews = array.filter((item) => item.id !== mainNew.id);

			const relatedNew = filteredNews.slice(-3).reverse();
			setRelatedNews(relatedNew);
		}
	}, [newsItems, NewsId]);

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
					<AlertTitle>{t("classId.error")}</AlertTitle>
					<AlertDescription>
						{t("classId.errorFetchingInfo")}
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (isSuccess && newsItems && mainNews && relatedNews) {
		return (
			<div className='mx-auto w-full px-4 py-8'>
				<Card className='mb-8'>
					<CardHeader>
						<CardTitle>{mainNews && mainNews.title}</CardTitle>
						<CardDescription>
							<div className='flex flex-wrap gap-2'>
								{mainNews && mainNews.time && (
									<span className='flex items-center text-sm text-muted-foreground'>
										<CalendarIcon className='mr-1 h-4 w-4' />
										{new Date(
											mainNews.time
										).toLocaleString()}
									</span>
								)}
								{mainNews && mainNews.location && (
									<span className='flex items-center text-sm text-muted-foreground'>
										<MapPinIcon className='mr-1 h-4 w-4' />
										{mainNews.location}
									</span>
								)}
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						{/* <p className='mb-4'>{mainNews && mainNews.content}</p> */}
						<Preview textValue={mainNews && mainNews.content} />
						<div className='-mx-2 mt-2 flex overflow-x-auto px-2 pb-2'>
							<div className='flex flex-nowrap gap-2'>
								{mainNews.isGeneralSchoolNews && (
									<Badge
										variant='secondary'
										className='whitespace-nowrap'
									>
										{t("newsId.wholeSchool")}
									</Badge>
								)}
								{mainNews &&
									mainNews.relatedTo.map((item, index) => (
										<Badge
											key={index}
											variant='secondary'
											className='whitespace-nowrap'
										>
											{item.name}
										</Badge>
									))}
							</div>
						</div>
						{mainNews.files.length > 0 && (
							<>
								<div className='my-1 flex flex-row items-center'>
									<Paperclip size={20} />
									<p className='ml-2 text-xl'>
										{t("newsId.attachment")}
									</p>
								</div>
								<div className='flex-wrap'>
									{mainNews.files.map((file, index) => {
										return (
											<Button
												key={index}
												className='mb-1 mr-1'
												variant='expandIcon'
												Icon={CloudDownload}
												iconPlacement='right'
												onClick={() => {
													handleDownload(file.id);
												}}
											>
												{isImageFile(file.name) ? (
													<FileImage />
												) : (
													<File />
												)}
												<div className='ml-2'>
													{file.name.replace(
														/^\d+-/,
														""
													)}
												</div>
											</Button>
										);
									})}
								</div>
							</>
						)}
					</CardContent>
				</Card>

				<h2 className='mb-4 ml-4 text-2xl font-semibold'>
					{t("newsId.relatedNews")}
				</h2>
				<ul className='ml-4 space-y-4'>
					{relatedNews.map((news) => (
						<li key={news.id} className='border-b pb-4'>
							<Link
								href={`./${news.id}`}
								className='group -m-2 block rounded-lg p-2 transition duration-150 ease-in-out hover:bg-accent'
							>
								<h3 className='mb-2 text-lg font-medium transition-colors group-hover:text-primary'>
									{news.title}
								</h3>
								<div className='-mx-2 flex overflow-x-auto px-2 pb-2'>
									<div className='flex flex-nowrap gap-2'>
										{news.isGeneralSchoolNews && (
											<Badge
												variant='secondary'
												className='whitespace-nowrap'
											>
												{t("newsId.wholeSchool")}
											</Badge>
										)}
										{news.relatedTo.map((item, idx) => (
											<Badge
												key={idx}
												className='whitespace-nowrap'
											>
												{item}
											</Badge>
										))}
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
