import * as React from "react";
import { Tags, AlertCircle, X, Delete, RotateCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useGetListTagQuery } from "@/lib/services/tag";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "./ui/loading-spinner";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function TagList({
	tags,
	setCurrentTag,
	currentTag,
	setCurrentNote,
	notes,
	setTitleValue,
	setContentValue,
	setSelectedValues,
}) {
	const { data, error, isLoading } = useGetListTagQuery("2");

	return (
		<div className='flex w-1/2 flex-col items-center border-r-2 border-r-foreground'>
			<div className='flex w-full justify-between p-4'>
				<div className='flex items-center p-2 pb-12'>
					<Tags />
					<h3 className='pl-2'>Tag</h3>
				</div>
				<Button
					variant='ghost'
					className='p-2'
					onClick={() => {
						setCurrentTag("");
						setCurrentNote(notes[0]);
						setTitleValue(notes[0].title);
						setContentValue(notes[0].content);
						setSelectedValues(
							!notes[0].tags
								? []
								: notes[0].tags.map((e) => ({
										label: e,
										value: e,
									}))
						);
					}}
					// disabled={isLoading || error ? true : false}
				>
					<Delete />
				</Button>
			</div>
			{/* {isLoading && (
                <div className="w-full items-center flex justify-center">
                    <LoadingSpinner />
                </div>
            )}
            {error && (
                <Alert variant="destructive" className='w-5/6'>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )} */}
			{
				// data &&
				<ScrollArea className='h-[600px] w-full rounded-md [&>div>div[style]]:!block'>
					<div className='p-4'>
						{tags.map((tag) => (
							<>
								<ContextMenu>
									<ContextMenuTrigger>
										<Button
											key={tag}
											className={`m-0 w-full justify-start ${currentTag === tag && "bg-primary"} overflow-hidden text-sm text-foreground`}
											variant='ghost'
											onClick={() => {
												setCurrentTag(tag);
												const newNote = notes.filter(
													(note) =>
														note.tags.includes(tag)
												);
												setCurrentNote(newNote[0]);
												setTitleValue(newNote[0].title);
												setContentValue(
													newNote[0].content
												);
												setSelectedValues(
													newNote[0].tags.map(
														(e) => ({
															label: e,
															value: e,
														})
													)
												);
											}}
										>
											{tag}
										</Button>
										<Separator className='' />
									</ContextMenuTrigger>
									<ContextMenuContent className='w-52'>
										<ContextMenuItem className='flex justify-between'>
											Rename
											<RotateCcw />
										</ContextMenuItem>
										<ContextMenuItem className='flex justify-between'>
											Remove
											<X />
										</ContextMenuItem>
									</ContextMenuContent>
								</ContextMenu>
							</>
						))}
					</div>
				</ScrollArea>
			}
		</div>
	);
}
