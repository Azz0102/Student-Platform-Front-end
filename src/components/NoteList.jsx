import { useState } from "react";
import {
	Search,
	Notebook,
	Plus,
	AlertCircle,
	Tags,
	Delete,
	CopyPlus,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetListNoteQuery } from "@/lib/services/note";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "./ui/loading-spinner";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function NoteList({
	notes,
	setCurrentNote,
	currentNote,
	setTitleValue,
	setContentValue,
	setNotes,
	newNoteIndex,
	setNewNoteIndex,
	focusOnContentInput,
	focusOnTitleInput,
	setSelectedValues,
	setCurrentTag,
	currentTag,
	fullnotes,
}) {
	const { data, error, isLoading } = useGetListNoteQuery("2");
	const [searchQuery, setSearchQuery] = useState("");

	const handleAddNote = () => {
		setNotes([
			{
				id: "new" + newNoteIndex,
				title: "",
				content: "",
				tags: [],
			},
			...fullnotes,
		]);

		setNewNoteIndex(newNoteIndex + 1);
		// focusOnContentInput();
		focusOnTitleInput();
		setCurrentNote({
			id: "new" + newNoteIndex,
			title: "",
			content: "",
			tags: [],
		});
		setTitleValue("");
		setContentValue("");
		setSelectedValues([]);
		setCurrentTag("");
	};

	return (
		<div className='flex w-1/2 flex-col items-center'>
			<div className='flex w-full justify-between p-4'>
				<div className='flex items-center'>
					<Notebook />
					<h3 className='pl-2'>Note</h3>
				</div>
				<div className='flex'>
					<Button
						variant='ghost'
						className='p-2'
						onClick={handleAddNote}
						// disabled={isLoading || error ? true : false}
					>
						<Plus />
					</Button>
				</div>
			</div>
			<div className='w-full px-2'>
				<div className='relative w-full flex-1'>
					<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
					<Input
						onChange={(e) => setSearchQuery(e.target.value)}
						type='search'
						placeholder='Search...'
						className='w-full rounded-lg bg-background pl-8'
					/>
				</div>
			</div>
			{/* {isLoading && (
                <div className="w-full items-center flex justify-center">
                    <LoadingSpinner />
                </div>
            )}
            {error && (
                <Alert variant="destructive" className="w-5/6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )} */}
			{
				// data &&
				<ScrollArea className='h-[600px] w-full rounded-md [&>div>div[style]]:!block'>
					<div className='m-4 flex flex-col'>
						{!searchQuery
							? notes.map((note, index) => (
									<>
										<ContextMenu>
											<ContextMenuTrigger>
												<Button
													key={index}
													className={`m-0 w-full justify-start ${currentNote && currentNote.id === note.id && "bg-primary"} overflow-hidden text-sm text-foreground`}
													variant='ghost'
													onClick={() => {
														setCurrentNote(note);
														setContentValue(
															note.content
														);
														setTitleValue(
															note.title
														);
														setSelectedValues(
															!note.tags
																? []
																: note.tags.map(
																		(
																			e
																		) => ({
																			label: e,
																			value: e,
																		})
																	)
														);
													}}
												>
													{note.title}
												</Button>
												<Separator className='' />
											</ContextMenuTrigger>
											<ContextMenuContent className='w-52'>
												<ContextMenuItem className='flex justify-between'>
													Tags
													<Tags />
												</ContextMenuItem>
												<ContextMenuItem className='flex justify-between'>
													Delete
													<Delete />
												</ContextMenuItem>
												<ContextMenuItem className='flex justify-between'>
													Duplicate
													<CopyPlus />
												</ContextMenuItem>
											</ContextMenuContent>
										</ContextMenu>
									</>
								))
							: notes
									.filter((note) =>
										note.title.includes(searchQuery)
									)
									.map((note, index) => (
										<>
											<ContextMenu>
												<ContextMenuTrigger>
													<Button
														key={index}
														className={`m-0 w-full justify-start ${currentNote && currentNote.id === note.id && "bg-primary"} overflow-hidden text-sm text-foreground`}
														variant='ghost'
														onClick={() => {
															setCurrentNote(
																note
															);
															setContentValue(
																note.content
															);
															setTitleValue(
																note.title
															);
															setSelectedValues(
																!note.tags
																	? []
																	: note.tags.map(
																			(
																				e
																			) => ({
																				label: e,
																				value: e,
																			})
																		)
															);
														}}
													>
														{note.title}
													</Button>
													<Separator className='' />
												</ContextMenuTrigger>
												<ContextMenuContent className='w-52'>
													<ContextMenuItem className='flex justify-between'>
														Tags
														<Tags />
													</ContextMenuItem>
													<ContextMenuItem className='flex justify-between'>
														Delete
														<Delete />
													</ContextMenuItem>
													<ContextMenuItem className='flex justify-between'>
														Duplicate
														<CopyPlus />
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
