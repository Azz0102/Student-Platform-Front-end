"use client";

import * as React from "react";
import { Tag } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
	DialogOverlay,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import MultipleSelector from "@/components/ui/multiple-selector";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import rehypeSanitize from "rehype-sanitize";
import * as commands from "@uiw/react-md-editor/commands";
import { useTheme } from "next-themes";
import { TagList } from "./TagList";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { NoteList } from "./NoteList";
import { current } from "@reduxjs/toolkit";
import { set } from "date-fns";

const MDEditor = dynamic(
	() => import("@uiw/react-md-editor").then((mod) => mod.default),
	{ ssr: false }
);

export function Note() {
	const [titleValue, setTitleValue] = useState("");
	const [contentValue, setContentValue] = useState("");
	const { width, height } = useWindowDimensions();
	const { theme } = useTheme();
	const [tags, setTags] = useState(["Nextjs", "React", "Remix"]);
	const [notes, setNotes] = useState([
		{
			id: 1,
			title: "Note 1",
			content: "This is the content of note 1",
			tags: ["Nextjs", "React"],
		},
		{
			id: 2,
			title: "Note 2",
			content: "This is the content of note 2",
			tags: ["React", "Remix"],
		},
	]);
	const [currentNote, setCurrentNote] = useState({
		id: 1,
		title: "Note 1",
		content: "This is the content of note 1",
		tags: ["Nextjs", "React"],
	});
	const [currentTag, setCurrentTag] = useState(null);
	const [newNoteIndex, setNewNoteIndex] = useState(0);

	const titleInputRef = useRef(null);
	const contentInputRef = useRef(null);

	// State to hold selected values
	const [selectedValues, setSelectedValues] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setCurrentNote({
			id: 1,
			title: "Note 1",
			content: "This is the content of note 1",
			tags: ["Nextjs", "React"],
		});
		setContentValue("This is the content of note 1");
		setTitleValue("Note 1");
		setSelectedValues(
			["Nextjs", "React"].map((e) => ({ label: e, value: e }))
		);
	}, []);

	const focusOnTitleInput = () => {
		if (titleInputRef.current) {
			titleInputRef.current.focus(); // Focus the input
		}
	};

	const focusOnContentInput = () => {
		if (contentInputRef.current) {
			// Focus the input
			const textarea = contentInputRef.current.querySelector("textarea");
			if (textarea) {
				textarea.focus();
			}
		}
	};

	const handleTitleChange = (e) => {
		const updatedNotes = [...notes];
		updatedNotes[
			updatedNotes.findIndex((note) => note.id === currentNote.id)
		] = {
			...currentNote,
			title: e.target.value,
		};
		setNotes(updatedNotes);
		setTitleValue(e.target.value);
	};

	const handleContentChange = (newContent) => {
		const updatedNotes = [...notes];
		updatedNotes[
			updatedNotes.findIndex((note) => note.id === currentNote.id)
		] = {
			...currentNote,
			title: !titleValue ? newContent.slice(0, 7) : currentNote.title,
			content: newContent,
		};

		if (!titleValue) {
			setTitleValue(newContent.slice(0, 7));
		}
		setContentValue(newContent);
		setNotes(updatedNotes);
	};

	const handleContentBlur = (e) => {
		if (!e.target.value && !contentValue) {
			// remove first note
			setNotes(notes.slice(1));
			setContentValue(notes[1].content);
			setTitleValue(notes[1].title);
			setCurrentNote(notes[1]);
			setSelectedValues(
				notes[1].tags.map((e) => ({ label: e, value: e }))
			);
		}
	};

	// Handler function that updates the state when the selection changes
	const handleSelectChange = (newSelectedOptions) => {
		setSelectedValues(newSelectedOptions);
	};

	const handleTagChange = () => {
		const updatedNotes = [...notes];
		updatedNotes[
			updatedNotes.findIndex((note) => note.id === currentNote.id)
		] = {
			...currentNote,
			tags:
				selectedValues.length === 0
					? []
					: selectedValues.map((e) => e.label),
		};

		setCurrentNote({
			...currentNote,
			tags:
				selectedValues.length === 0
					? []
					: selectedValues.map((e) => e.label),
		});

		if (selectedValues.length !== 0) {
			for (let i = 0; i < selectedValues.length; i++) {
				const element = selectedValues[i];
				if (!tags.includes(element.label)) {
					setTags([...tags, element.label]);
				}
			}
		}

		setNotes(updatedNotes);
	};

	const handleDialogChange = (isOpen) => {
		if (!isOpen) {
			// Perform cleanup or any actions needed on unmount
			console.log(currentNote);
			// Add your cleanup logic here, e.g., resetting state, clearing timers, etc.
			setSelectedValues(
				currentNote.tags.length === 0
					? []
					: currentNote.tags.map((e) => ({ label: e, value: e }))
			);
		}
		setOpen(isOpen);
	};

	return (
		<main className='flex flex-col xl:flex-row'>
			<div className='block w-full 2xl:w-2/5'>
				<div
					className='flex w-full flex-row'
					style={{ height: `${height - 90}px` }}
				>
					<TagList
						tags={tags}
						setCurrentTag={setCurrentTag}
						currentTag={currentTag}
						setCurrentNote={setCurrentNote}
						notes={notes}
						setTitleValue={setTitleValue}
						setContentValue={setContentValue}
						setSelectedValues={setSelectedValues}
					/>
					<NoteList
						setCurrentNote={setCurrentNote}
						currentNote={currentNote}
						setTitleValue={setTitleValue}
						setContentValue={setContentValue}
						setNotes={setNotes}
						newNoteIndex={newNoteIndex}
						setNewNoteIndex={setNewNoteIndex}
						focusOnContentInput={focusOnContentInput}
						focusOnTitleInput={focusOnTitleInput}
						setSelectedValues={setSelectedValues}
						setCurrentTag={setCurrentTag}
						currentTag={currentTag}
						notes={
							!currentTag
								? notes
								: notes.filter((note) =>
										note.tags.includes(currentTag)
									)
						}
						fullnotes={notes}
					/>
				</div>
			</div>
			<div className='my-4 flex w-full flex-col items-center justify-center p-0 2xl:mr-2 2xl:w-3/5'>
				<div className='mb-2 w-full'>
					<Input
						placeholder="Note's title"
						value={titleValue}
						onChange={handleTitleChange}
						onBlur={handleContentBlur}
						ref={titleInputRef}
					/>
				</div>
				<div className='w-full' data-color-mode={`${theme}`}>
					<MDEditor
						value={contentValue}
						onChange={handleContentChange}
						previewOptions={{
							rehypePlugins: [[rehypeSanitize]],
						}}
						textareaProps={{
							placeholder: "Please enter Markdown text",
						}}
						visibleDragbar={false}
						ref={contentInputRef}
						// height="100%"
						// minHeight={1000}
						height={height - 210}
					/>
				</div>

				<Dialog open={open} onOpenChange={handleDialogChange}>
					<DialogTrigger asChild>
						<div
							className='mt-1 flex w-full flex-wrap items-center'
							onClick={() => {
								setSelectedValues(
									currentNote.tags.length === 0
										? []
										: currentNote.tags.map((e) => ({
												label: e,
												value: e,
											}))
								);
							}}
						>
							<Button variant='ghost' className='h-6 p-1'>
								<Tag size={20} />
							</Button>
							{currentNote &&
								currentNote.tags &&
								currentNote.tags
									.map((tag) => ({ label: tag, value: tag }))
									.map((option, index) => {
										return (
											<div className='m-1' key={index}>
												<Badge>{option.value}</Badge>
											</div>
										);
									})}
							<div className='ml-2 text-foreground'>
								Click to add tags...
							</div>
						</div>
					</DialogTrigger>
					<DialogContent className='sm:max-w-md'>
						<DialogHeader>
							<DialogTitle>Add or remove tags</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<div className='flex items-center space-x-2'>
							<MultipleSelector
								defaultOptions={tags.map((tag) => ({
									label: tag,
									value: tag,
								}))}
								placeholder='Type something that does not exist in dropdowns...'
								creatable
								emptyIndicator={
									<p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
										no results found.
									</p>
								}
								value={selectedValues}
								onChange={handleSelectChange}
							/>
						</div>
						<DialogFooter className='sm:justify-end'>
							<DialogClose asChild>
								<Button type='submit' onClick={handleTagChange}>
									Save changes
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</main>
	);
}
