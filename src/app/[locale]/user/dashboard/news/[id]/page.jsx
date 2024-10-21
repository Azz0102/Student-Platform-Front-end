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
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { useSelector } from "react-redux";

export default function Page() {

	const mainNews = useSelector((state) => state.news.selectedNews);

	const listRelate =useSelector((state) => state.news.listNews);

	const array =listRelate.map(item => ({
		id: item.id,
		title: item.title,
		relatedTo: item.relatedTo.map(related => related.name) // Chỉ lấy tên từ mảng relatedTo
	}));

	const filteredNews = array.filter(item => item.id !== mainNews.id);
	
	const relatedNews = filteredNews.slice(-3).reverse();

	return (
		<div className='mx-auto w-full px-4 py-8'>
			<Card className='mb-8'>
				<CardHeader>
					<CardTitle>{mainNews && mainNews.title}</CardTitle>
					<CardDescription>
						<div className='flex flex-wrap gap-2'>
							{/* {mainNews.time && (
								<span className='flex items-center text-sm text-muted-foreground'>
									<CalendarIcon className='mr-1 h-4 w-4' />
									{new Date(mainNews.time).toLocaleString()}
								</span>
							)}
							{mainNews.location && (
								<span className='flex items-center text-sm text-muted-foreground'>
									<MapPinIcon className='mr-1 h-4 w-4' />
									{mainNews.location}
								</span>
							)} */}
						</div>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className='mb-4'>{mainNews && mainNews.content}</p>
					<div className='-mx-2 flex overflow-x-auto px-2 pb-2'>
						<div className='flex flex-nowrap gap-2'>
							{mainNews && mainNews.relatedTo.map((item, index) => (
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
				</CardContent>
			</Card>

			<h2 className='mb-4 ml-4 text-2xl font-semibold'>Related News</h2>
			<ul className='ml-4 space-y-4'>
				{relatedNews.map((news) => (
					<li key={news.id} className='border-b pb-4'>
						<Link
							href={`/news/${news.id}`}
							className='group -m-2 block rounded-lg p-2 transition duration-150 ease-in-out hover:bg-accent'
						>
							<h3 className='mb-2 text-lg font-medium transition-colors group-hover:text-primary'>
								{news.title}
							</h3>
							<div className='-mx-2 flex overflow-x-auto px-2 pb-2'>
								<div className='flex flex-nowrap gap-2'>
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
