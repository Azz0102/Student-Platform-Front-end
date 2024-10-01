import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, RotateCcw } from "lucide-react";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { Input } from "@/components/ui/input";
import { useRenameTagMutation } from "@/lib/services/tag";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setListNote } from "@/lib/features/noteSlice";

export function TagElement({
	tag,
	tags,
	currentTag,
	notes,
	removeTag,
	setCurrentTag,
	setCurrentNote,
	setTitleValue,
	setContentValue,
	setSelectedValues,
	index,
	setNotes,
	currentNote,
	setTags,
}) {
	const dispatch = useDispatch();
	const { width } = useWindowDimensions();
	const [open, setOpen] = useState(false);
	const [renameInput, setRenameInput] = useState(tag.name);
	const [
		renameTag,
		{
			isLoading: isRenameTagLoading,
			isError: renameTagError,
			data: renameTagData,
		},
	] = useRenameTagMutation();

	const handleRenameInputChange = (e) => {
		setRenameInput(e.target.value);
	};

	const handleTagRenameDialogChange = (isOpen) => {
		if (!isOpen) {
			setRenameInput(tag);
		}
		setOpen(isOpen);
	};

	const handleSaveChange = async () => {
		if (!renameInput.trim()) {
			setRenameInput(tag.name);
		} else {
			try {
				const renameTagData = await renameTag({
					tagId: tag.id,
					name: renameInput,
				}).unwrap();
				let updatedTags = [...tags];
				updatedTags[index] = renameTagData;
				setTags(updatedTags);
				setCurrentTag({});

				let updatedNotes = [...notes];
				updatedNotes = updatedNotes.map((note) => {
					if (note.tags.includes(tag)) {
						note.tags = note.tags.map((t) =>
							t.id === tag.id ? renameTagData : t
						);
					}
					return note;
				});
				setNotes(updatedNotes);
				dispatch(setListNote(updatedNotes));

				setCurrentNote({
					...currentNote,
					tags: currentNote.tags.map((t) =>
						t.id === tag.id ? renameTagData : t
					),
				});
			} catch (error) {
				toast.error("Error rename tag");
			}
		}
	};

	if (width > 768) {
		return (
			<>
				<Dialog open={open} onOpenChange={handleTagRenameDialogChange}>
					<ContextMenu>
						<ContextMenuTrigger>
							<Button
								key={tag.id}
								className={`m-0 w-full justify-start ${currentTag.id === tag.id && "bg-primary"} overflow-hidden text-sm text-foreground`}
								variant='ghost'
								onClick={() => {
									setCurrentTag(tag);
									const newNote = notes.filter((note) => {
										if (note.tags.length > 0) {
											for (
												let i = 0;
												i < note.tags.length;
												i++
											) {
												if (
													note.tags[i].id === tag.id
												) {
													return note;
												}
											}
										}
									});
									setCurrentNote(newNote[0]);
									setTitleValue(newNote[0].title);
									setContentValue(newNote[0].content);
									setSelectedValues(
										newNote[0].tags.map((e) => ({
											id: e.id,
											label: e.name,
											value: e.name,
										}))
									);
								}}
							>
								{tag.name}
							</Button>
							<Separator className='' />
						</ContextMenuTrigger>
						<ContextMenuContent className='w-52'>
							<DialogTrigger asChild>
								<ContextMenuItem
									className='flex justify-between'
									onSelect={(e) => {
										setRenameInput(tag.name);
										e.preventDefault();
									}}
								>
									Rename
									<RotateCcw />
								</ContextMenuItem>
							</DialogTrigger>
							<DialogContent className='sm:max-w-md'>
								<DialogHeader>
									<DialogTitle>Rename tags</DialogTitle>
									<DialogDescription></DialogDescription>
								</DialogHeader>
								<div className='flex items-center space-x-2'>
									<Input
										value={renameInput}
										onChange={handleRenameInputChange}
									/>
								</div>
								<DialogFooter className='sm:justify-end'>
									<DialogClose asChild>
										<Button
											type='submit'
											onClick={handleSaveChange}
										>
											Save changes
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>

							<ContextMenuItem
								className='flex justify-between'
								onClick={() => {
									removeTag(tag);
								}}
							>
								Remove
								<X />
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				</Dialog>
			</>
		);
	}

	return (
		<>
			<Drawer open={open} onOpenChange={handleTagRenameDialogChange}>
				<ContextMenu>
					<ContextMenuTrigger>
						<Button
							key={tag.id}
							className={`m-0 w-full justify-start ${currentTag === tag && "bg-primary"} overflow-hidden text-sm text-foreground`}
							variant='ghost'
							onClick={() => {
								setCurrentTag(tag);
								const newNote = notes.filter((note) => {
									if (note.tags.length > 0) {
										for (
											let i = 0;
											i < note.tags.length;
											i++
										) {
											if (note.tags[i].id === tag.id) {
												return note;
											}
										}
									}
								});
								setCurrentNote(newNote[0]);
								setTitleValue(newNote[0].title);
								setContentValue(newNote[0].content);
								setSelectedValues(
									newNote[0].tags.map((e) => ({
										id: e.id,
										label: e.name,
										value: e.name,
									}))
								);
							}}
						>
							{tag.name}
						</Button>
						<Separator className='' />
					</ContextMenuTrigger>
					<ContextMenuContent className='w-52'>
						<DrawerTrigger asChild>
							<ContextMenuItem
								className='flex justify-between'
								onSelect={(e) => {
									setRenameInput(tag.name);
									e.preventDefault();
								}}
							>
								Rename
								<RotateCcw />
							</ContextMenuItem>
						</DrawerTrigger>
						<DrawerContent className='h-96'>
							<DrawerHeader className='text-left'>
								<DrawerTitle>Add or remove tags</DrawerTitle>
								<DrawerDescription></DrawerDescription>
							</DrawerHeader>
							<div className='m-4 flex items-center space-x-2'>
								<Input
									value={renameInput}
									onChange={handleRenameInputChange}
								/>
							</div>
							<DrawerFooter className='pt-2'>
								<DrawerClose asChild>
									<Button
										type='submit'
										onClick={handleSaveChange}
									>
										Save changes
									</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>

						<ContextMenuItem
							className='flex justify-between'
							onClick={() => {
								removeTag(tag);
							}}
						>
							Remove
							<X />
						</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			</Drawer>
		</>
	);
}
