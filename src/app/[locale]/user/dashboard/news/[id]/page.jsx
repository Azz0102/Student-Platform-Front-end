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

export default function Page() {
	// This would typically come from a database or API
	const mainNews = {
		title: "Annual Science Fair Showcases Student Innovation",
		content:
			"This year's Science Fair was a resounding success, featuring over 100 projects from students across all grade levels. Projects ranged from renewable energy solutions to advanced robotics, demonstrating the incredible creativity and scientific acumen of our student body.",
		relatedTo: [
			"Science Department",
			"Technology Club",
			"Whole School",
			"STEM Initiative",
			"Innovation Lab",
		],
		time: "2023-05-15T14:00:00",
		location: "School Gymnasium",
	};

	const relatedNews = [
		{
			id: 1,
			title: "Robotics Team Wins Regional Competition",
			relatedTo: ["Technology Club", "Science Department"],
		},
		{
			id: 2,
			title: "New Art Exhibition Opens in School Gallery",
			relatedTo: ["Art Department", "Whole School"],
		},
		{
			id: 3,
			title: "Upcoming Parent-Teacher Conference",
			relatedTo: ["Whole School"],
		},
	];

	return (
		<div className='mx-auto w-full px-4 py-8'>
			<Card className='mb-8'>
				<CardHeader>
					<CardTitle>{mainNews.title}</CardTitle>
					<CardDescription>
						<div className='flex flex-wrap gap-2'>
							{mainNews.time && (
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
							)}
						</div>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className='mb-4'>{mainNews.content}</p>
					<div className='-mx-2 flex overflow-x-auto px-2 pb-2'>
						<div className='flex flex-nowrap gap-2'>
							{mainNews.relatedTo.map((item, index) => (
								<Badge
									key={index}
									variant='secondary'
									className='whitespace-nowrap'
								>
									{item}
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
											variant='outline'
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
