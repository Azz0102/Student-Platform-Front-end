"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
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
import { TagDialog } from "./TagDialog";
import {
	useGetListNoteQuery,
	useUpdateNoteMutation,
} from "@/lib/services/note";
import { useCreateTagMutation, useGetListTagQuery } from "@/lib/services/tag";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setListNote } from "@/lib/features/noteSlice";

const MDEditor = dynamic(
	() => import("@uiw/react-md-editor").then((mod) => mod.default),
	{ ssr: false }
);

export function Note() {
	const dispatch = useDispatch();
	const router = useRouter();

	const {
		data: noteList = [],
		error: noteError,
		isLoading: isNoteLoading,
	} = useGetListNoteQuery("1");

	const {
		data: tagList = [],
		error: tagError,
		isLoading: isTagLoading,
	} = useGetListTagQuery("1");

	const [updateNote, { isError: updateNoteError }] = useUpdateNoteMutation();

	const currentNoteIdState = useAppSelector(
		(state) => state.note.currentNoteId
	);

	const listNote = useAppSelector((state) => state.note.listNote);

	const [
		createTag,
		{
			isLoading: isCreateTagLoading,
			isError: createTagError,
			data: createTagData,
		},
	] = useCreateTagMutation();

	const { width, height } = useWindowDimensions();
	const { theme } = useTheme();

	const [titleValue, setTitleValue] = useState("");
	const [contentValue, setContentValue] = useState("");

	const [tags, setTags] = useState([]); // [{id: 1, name: "Nextjs"}, {id: 2 ,name: "React"}, {id: 3, name: "Remix"}]
	const [notes, setNotes] = useState([]);
	/* [{
		id: 1,
		title: "Note 1",
		content: "This is the content of note 1",
		tags: [{id: 1, name: "Nextjs"}, {id: 2 ,name: "React"}],
	},
	{
		id: 2,
		title: "Note 2",
		content: "This is the content of note 2",
		tags: [{id: 2 ,name: "React"}, {id: 3, name: "Remix"}],
	},] */

	const [currentNote, setCurrentNote] = useState({});
	/**{
		id: "",
		title: "",
		content: "",
		tags: [],
	}
	 */
	const [currentTag, setCurrentTag] = useState({});
	const [newNoteIndex, setNewNoteIndex] = useState(0);

	const titleInputRef = useRef(null);
	const contentInputRef = useRef(null);

	// State to hold selected values
	const [selectedValues, setSelectedValues] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		toast("Use Ctrl+S to save note changes");
		// Handle Ctrl+S key press
		const handleKeyDown = async (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key === "s") {
				event.preventDefault();
				// Call save logic when Ctrl+S is pressed
				if (notes.length > 0) {
					try {
						for (let i = 0; i < notes.length; i++) {
							if (
								notes[i].title !== listNote[i].title ||
								notes[i].content !== listNote[i].content
							) {
								const updatedNote = await updateNote({
									noteId: notes[i].id,
									title: notes[i].title,
									content: notes[i].content,
									tags: notes[i].tags,
								});
							}
						}
						toast.success("Save notes successfully");
						dispatch(setListNote(notes));
					} catch (error) {
						toast.error("Save note failed");
					}
				}
			}
		};

		// Handle beforeunload event (browser close/redirect)
		const handleBeforeUnload = (event) => {
			let isSaved = true; // Assume all notes are saved initially
			if (notes.length > 0) {
				for (let i = 0; i < notes.length; i++) {
					if (
						notes[i].title !== listNote[i].title ||
						notes[i].content !== listNote[i].content
					) {
						isSaved = false; // Set isSaved to false if any notes are not saved
						break; // Break the loop if any notes are not saved
					}
				}
			}
			if (!isSaved) {
				event.preventDefault();
				event.returnValue =
					"You have unsaved changes. Are you sure you want to leave?"; // Display warning dialog
			}
		};

		// Add keydown event listener for Ctrl+S
		window.addEventListener("keydown", handleKeyDown);

		// Add beforeunload event listener for unsaved data warning
		window.addEventListener("beforeunload", handleBeforeUnload);

		// Clean up listeners when component unmounts
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [dispatch, listNote, notes, updateNote]);

	useEffect(() => {
		if (noteList && noteList.length !== 0) {
			setNotes(noteList);
			dispatch(setListNote([...noteList]));
			if (currentNoteIdState) {
				const note = noteList.find(
					(note) => note.id === currentNoteIdState
				);
				if (note) {
					setCurrentNote(note);
					setContentValue(note.content);
					setTitleValue(note.title);
					setSelectedValues(
						note.tags.map((e) => ({
							id: e.id,
							label: e.name,
							value: e.name,
						}))
					);
				} else {
					toast.error("No selected note found!");
				}

				dispatch(setContentValue(null));
			} else {
				setCurrentNote(noteList[0]);
				setContentValue(noteList[0].content);
				setTitleValue(noteList[0].title);
				setSelectedValues(
					noteList[0].tags.map((e) => ({
						id: e.id,
						label: e.name,
						value: e.name,
					}))
				);
			}
		}

		if (tagList && tagList.length !== 0) {
			setTags(tagList);
		}

		// setCurrentNote({
		// 	id: 1,
		// 	title: "Note 1",
		// 	content: "This is the content of note 1",
		// 	tags: ["Nextjs", "React"],
		// });
		// setContentValue("This is the content of note 1");
		// setTitleValue("Note 1");
		// setSelectedValues(
		// 	["Nextjs", "React"].map((e) => ({ label: e, value: e }))
		// );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [noteList, tagList]);

	useEffect(() => {
		const handleRouteChange = (url) => {
			let isSaved = true; // Assume all notes are saved initially
			if (notes.length > 0) {
				for (let i = 0; i < notes.length; i++) {
					if (
						notes[i].title !== listNote[i].title ||
						notes[i].content !== listNote[i].content
					) {
						isSaved = false; // Set isSaved to false if any notes are not saved
						break; // Break the loop if any notes are not saved
					}
				}
			}
			if (
				!isSaved &&
				!window.confirm(
					"You have unsaved changes. Are you sure you want to leave?"
				)
			) {
				router.events.emit("routeChangeError");
				throw new Error("Route change aborted due to unsaved changes"); // Prevent route change
			}
		};

		router.events.on("routeChangeStart", handleRouteChange);

		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [listNote, notes, router.events]);

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
		setCurrentNote({
			...currentNote,
			title: e.target.value,
		});
		setTitleValue(e.target.value);
	};

	const handleContentChange = (newContent) => {
		const updatedNotes = [...notes];
		updatedNotes[
			updatedNotes.findIndex((note) => note.id === currentNote.id)
		] = {
			...currentNote,
			content: newContent,
		};
		setCurrentNote({
			...currentNote,
			content: newContent,
		});
		setContentValue(newContent);
		setNotes(updatedNotes);
	};

	const handleContentBlur = (e) => {
		if (!e.target.value && !contentValue) {
			// remove first note
			setNotes(notes.slice(1));
			dispatch(setListNote(notes.slice(1)));

			setContentValue(!notes[1] ? "" : notes[1].content);
			setTitleValue(!notes[1] ? "" : notes[1].title);
			setCurrentNote(!notes[1] ? {} : notes[1]);
			setSelectedValues(
				notes[1].tags.length === 0 || !notes[1]
					? []
					: notes[1].tags.map((e) => ({
							id: e.id,
							label: e.name,
							value: e.name,
						}))
			);
		}
	};

	// Handler function that updates the state when the selection changes
	const handleSelectChange = (newSelectedOptions) => {
		setSelectedValues(newSelectedOptions);
	};

	const handleTagChange = async () => {
		let newSelectedValue = [...selectedValues];

		if (selectedValues.length !== 0) {
			for (let i = 0; i < selectedValues.length; i++) {
				const element = selectedValues[i];
				if (!element.id) {
					try {
						const newTag = await createTag({
							userId: 1,
							name: element.name,
						}).unwrap();

						newSelectedValue[i] = {
							id: newTag.id,
							label: newTag.name,
							value: newTag.name,
						};

						setTags([...tags, newTag]);
					} catch (error) {
						toast.error("Error creating tag");
					}
				}
			}
		}

		const updatedNotes = [...notes];
		updatedNotes[
			updatedNotes.findIndex((note) => note.id === currentNote.id)
		] = {
			...currentNote,
			tags:
				newSelectedValue.length === 0
					? []
					: newSelectedValue.map((e) => ({
							id: e.id,
							name: e.label,
						})),
		};

		setCurrentNote({
			...currentNote,
			tags:
				newSelectedValue.length === 0
					? []
					: newSelectedValue.map((e) => ({
							id: e.id,
							name: e.label,
						})),
		});

		setNotes(updatedNotes);
		dispatch(setListNote(updatedNotes));
		setSelectedValues(newSelectedValue);
	};

	const handleDialogChange = (isOpen) => {
		if (!isOpen) {
			// Perform cleanup or any actions needed on unmount
			console.log(currentNote);
			// Add your cleanup logic here, e.g., resetting state, clearing timers, etc.
			setSelectedValues(
				currentNote.tags.length === 0 || !currentNote.tags
					? []
					: currentNote.tags.map((e) => ({
							label: e.name,
							value: e.name,
						}))
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
						setTags={setTags}
						currentNote={currentNote}
						setNotes={setNotes}
						isLoading={isTagLoading}
						error={tagError}
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
							!currentTag.id
								? notes
								: notes.filter((note) => {
										if (note.tags.length > 0) {
											for (const tag of note.tags) {
												if (tag.id === currentTag.id) {
													return note;
												}
											}
										}
									})
						}
						setOpen={setOpen}
						fullnotes={notes}
						isLoading={isNoteLoading}
						error={noteError}
					/>
				</div>
			</div>

			<div className='my-4 flex w-full flex-col items-center justify-center p-0 2xl:mr-2 2xl:w-3/5'>
				{!isTagLoading && !isNoteLoading && notes.length !== 0 && (
					<>
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

						<TagDialog
							open={open}
							handleDialogChange={handleDialogChange}
							setSelectedValues={setSelectedValues}
							currentNote={currentNote}
							selectedValues={selectedValues}
							handleSelectChange={handleSelectChange}
							handleTagChange={handleTagChange}
							tags={tags}
						/>
					</>
				)}
			</div>
		</main>
	);
}
