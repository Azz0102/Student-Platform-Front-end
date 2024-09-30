import { useState } from "react";
import {
	Search,
	Notebook,
	Plus,
	AlertCircle,
	Tags,
	CopyPlus,
	Trash2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "./ui/loading-spinner";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	useCreateNoteMutation,
	useDeleteNoteMutation,
} from "@/lib/services/note";
import { toast } from "sonner";

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
	setOpen,
	isLoading,
	error,
}) {
	const [
		createNote,
		{
			isLoading: isCreateNoteLoading,
			error: createNoteError,
			data: createNoteData,
		},
	] = useCreateNoteMutation();

	const [
		deleteNote,
		{
			isLoading: isDeleteNoteLoading,
			error: deleteNoteError,
			data: deleteNoteData,
		},
	] = useDeleteNoteMutation();

	const [searchQuery, setSearchQuery] = useState("");

	const handleDeleteNote = async (note) => {
		try {
			await deleteNote({ noteId: note.id });
			const updatedNotes = [...fullnotes];
			updatedNotes.splice(
				updatedNotes.findIndex((e) => e.id === note.id),
				1
			);
			setNotes(updatedNotes);

			if (currentNote.id === note.id) {
				setContentValue("");
				setTitleValue("");
				setCurrentNote({});
				setSelectedValues([]);
			}
		} catch (error) {
			toast.error("Error deleting notes");
		}
	};

	const handleAddNote = async () => {
		try {
			const newNote = await createNote({
				userId: 1,
				title: "",
				content: "",
				tags: [],
			});

			setNotes([newNote, ...fullnotes]);

			setNewNoteIndex(newNoteIndex + 1);
			// focusOnContentInput();
			focusOnTitleInput();
			setCurrentNote(newNote);
			setTitleValue("");
			setContentValue("");
			setSelectedValues([]);
			setCurrentTag({});
		} catch (error) {
			toast.error("Error creating note");
		}
	};

	const handleDuplicate = async (note) => {
		try {
			const newNote = await createNote({
				userId: 1,
				title: note.title,
				content: note.content,
				tags: note.tags,
			});
			const updatedNotes = [...fullnotes];

			// duplicateNote.id = "new" + newNoteIndex;
			updatedNotes.push(newNote);
			setNotes(updatedNotes);
		} catch (error) {
			toast.error("Error duplicate note");
		}
	};

	return (
		<div className='flex w-1/2 flex-col items-center'>
			<div className='flex w-full justify-between p-4 pb-2'>
				<div className='flex items-center'>
					<Notebook />
					<h3 className='pl-2'>Note</h3>
				</div>
				<div className='flex'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant='ghost'
									className='p-2'
									onClick={handleAddNote}
									disabled={isLoading || error ? true : false}
								>
									<Plus />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Add note</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
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
			{isLoading && (
				<div className='flex w-full items-center justify-center'>
					<LoadingSpinner />
				</div>
			)}
			{error && (
				<Alert variant='destructive' className='w-5/6'>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>Error fetching tags</AlertDescription>
				</Alert>
			)}
			{notes.length === 0 && !isLoading && !error && (
				<div>No note available please create new note</div>
			)}
			{notes.length !== 0 && !isLoading && !error && (
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
															!note.tags ||
																note.tags
																	.length ===
																	0
																? []
																: note.tags.map(
																		(
																			e
																		) => ({
																			id: e.id,
																			label: e.name,
																			value: e.name,
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
												<ContextMenuItem
													className='flex justify-between'
													onClick={() => {
														setCurrentNote(note);
														setContentValue(
															note.content
														);
														setTitleValue(
															note.title
														);
														setSelectedValues(
															!note.tags ||
																note.tags
																	.length ===
																	0
																? []
																: note.tags.map(
																		(
																			e
																		) => ({
																			id: e.id,
																			label: e.name,
																			value: e.name,
																		})
																	)
														);
														setOpen(true);
													}}
												>
													Tags
													<Tags />
												</ContextMenuItem>
												<ContextMenuItem
													className='flex justify-between'
													onClick={() => {
														handleDeleteNote(note);
													}}
												>
													Delete
													<Trash2 />
												</ContextMenuItem>
												<ContextMenuItem
													className='flex justify-between'
													onClick={() => {
														handleDuplicate(note);
													}}
												>
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
																!note.tags ||
																	note.tags
																		.length ===
																		0
																	? []
																	: note.tags.map(
																			(
																				e
																			) => ({
																				id: e.id,
																				label: e.name,
																				value: e.name,
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
													<ContextMenuItem
														className='flex justify-between'
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
																!note.tags ||
																	note.tags
																		.length ===
																		0
																	? []
																	: note.tags.map(
																			(
																				e
																			) => ({
																				id: e.id,
																				label: e.name,
																				value: e.name,
																			})
																		)
															);
															setOpen(true);
														}}
													>
														Tags
														<Tags />
													</ContextMenuItem>
													<ContextMenuItem
														className='flex justify-between'
														onClick={() => {
															handleDeleteNote(
																note
															);
														}}
													>
														Delete
														<Trash2 />
													</ContextMenuItem>
													<ContextMenuItem
														className='flex justify-between'
														onClick={() => {
															handleDuplicate(
																note
															);
														}}
													>
														Duplicate
														<CopyPlus />
													</ContextMenuItem>
												</ContextMenuContent>
											</ContextMenu>
										</>
									))}
					</div>
				</ScrollArea>
			)}
		</div>
	);
}
