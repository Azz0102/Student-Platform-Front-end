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
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";

import { setCurrentNoteId, setListNote } from "@/lib/features/noteSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useDeepCompareEffect } from "use-deep-compare";

const MDEditor = dynamic(
	() => import("@uiw/react-md-editor").then((mod) => mod.default),
	{ ssr: false }
);

export function Note() {
	const dispatch = useDispatch();

	const pathname = usePathname();
	const searchParams = useSearchParams();
	// const router = useRouter();

	const refreshToken = Cookies.get("refreshToken");
	const {userId} = jwtDecode(refreshToken);

	console.log('userId',userId);

	const {
		data: noteList = [],
		error: noteError,
		isLoading: isNoteLoading,
	} = useGetListNoteQuery(userId);

	console.log("noteList",noteList);


	const {
		data: tagList = [],
		error: tagError,
		isLoading: isTagLoading,
	} = useGetListTagQuery(userId);

	console.log("tagList",tagList);

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

	const [nameValue, setnameValue] = useState("");
	const [contentValue, setContentValue] = useState("");

	const [tags, setTags] = useState([]); // [{id: 1, name: "Nextjs"}, {id: 2 ,name: "React"}, {id: 3, name: "Remix"}]
	const [notes, setNotes] = useState([]);
	/* [{
		id: 1,
		name: "Note 1",
		content: "This is the content of note 1",
		tags: [{id: 1, name: "Nextjs"}, {id: 2 ,name: "React"}],
	},
	{
		id: 2,
		name: "Note 2",
		content: "This is the content of note 2",
		tags: [{id: 2 ,name: "React"}, {id: 3, name: "Remix"}],
	},] */

	const [currentNote, setCurrentNote] = useState(currentNoteIdState ? notes.filter((item)=>item.id===currentNoteIdState)[0]: {});
	/**{
		id: "",
		name: "",
		content: "",
		tags: [],
	}
	 */
	const [currentTag, setCurrentTag] = useState({});
	const [newNoteIndex, setNewNoteIndex] = useState(0);

	const nameInputRef = useRef(null);
	const contentInputRef = useRef(null);

	// State to hold selected values
	const [selectedValues, setSelectedValues] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		// toast("Use Ctrl+S to save note changes");
		// Handle Ctrl+S key press
		const handleKeyDown = async (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key === "s") {
				event.preventDefault();
				// Call save logic when Ctrl+S is pressed
				if (notes.length > 0) {
					try {
						for (let i = 0; i < notes.length; i++) {
							if (
								notes[i].name !== listNote[i].name ||
								notes[i].content !== listNote[i].content
							) {
								const updatedNote = await updateNote({
									noteId: notes[i].id,
									name: notes[i].name,
									content: notes[i].content,
									tagIds: notes[i].tags.map((e)=>e.id),
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
						notes[i].name !== listNote[i].name ||
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

	useEffect(()=>{
		toast("Use Ctrl+S to save note changes");
	},[]);

	useDeepCompareEffect(() => {
		if (noteList.metadata && noteList.metadata.length !== 0) {
			setNotes(noteList.metadata);
			dispatch(setListNote([...noteList.metadata]));
			if (currentNoteIdState) {
				const note = noteList.metadata.find(
					(note) => note.id === currentNoteIdState
				);
				if (note) {
					setCurrentNote(note);
					setContentValue(note.content);
					setnameValue(note.name);
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

				dispatch(setCurrentNoteId(null));
			} else {
				setCurrentNote(noteList.metadata[0]);
				setContentValue(noteList.metadata[0].content);
				setnameValue(noteList.metadata[0].name);
				setSelectedValues(
					noteList.metadata[0].tags.map((e) => ({
						id: e.id,
						label: e.name,
						value: e.name,
					}))
				);
			}
		}

		if (tagList.metadata && tagList.metadata.length !== 0) {
			setTags(tagList.metadata);
		}

		// setCurrentNote({
		// 	id: 1,
		// 	name: "Note 1",
		// 	content: "This is the content of note 1",
		// 	tags: ["Nextjs", "React"],
		// });
		// setContentValue("This is the content of note 1");
		// setnameValue("Note 1");
		// setSelectedValues(
		// 	["Nextjs", "React"].map((e) => ({ label: e, value: e }))
		// );
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, noteList, tagList]);

	const focusOnnameInput = () => {
		if (nameInputRef.current) {
			nameInputRef.current.focus(); // Focus the input
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

	const handlenameChange = (e) => {
		const updatedNotes = [...notes];
		updatedNotes[
			updatedNotes.findIndex((note) => note.id === currentNote.id)
		] = {
			...currentNote,
			name: e.target.value,
		};
		setNotes(updatedNotes);
		setCurrentNote({
			...currentNote,
			name: e.target.value,
		});
		setnameValue(e.target.value);
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
			setnameValue(!notes[1] ? "" : notes[1].name);
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

		console.log("newSelectedValue",newSelectedValue);

		if (selectedValues.length !== 0) {
			for (let i = 0; i < selectedValues.length; i++) {
				const element = selectedValues[i];
				if (!element.id) {
					try {
						console.log("newTag");
						const newTag = await createTag({
							userId: userId,
							name: element.value,
						}).unwrap();

						console.log("newTag",newTag);

						newSelectedValue[i] = {
							id: newTag.metadata.id,
							label: newTag.metadata.name,
							value: newTag.metadata.name,
						};


						setTags([...tags, {id: newTag.metadata.id,name: newTag.metadata.name,}]);
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

		console.log('noesss', {
			noteId: currentNote.id, content:currentNote.content, name: currentNote.name,
			tagIds:
				newSelectedValue.length === 0
					? []
					: newSelectedValue.map((e) => e.id),
		})

		const updatedNote = await updateNote( {
			noteId: currentNote.id, content:currentNote.content, name: currentNote.name,
			tagIds:
				newSelectedValue.length === 0
					? []
					: newSelectedValue.map((e) => e.id),
		});

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
						setTitleValue={setnameValue}
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
						setTitleValue={setnameValue}
						setContentValue={setContentValue}
						setNotes={setNotes}
						newNoteIndex={newNoteIndex}
						setNewNoteIndex={setNewNoteIndex}
						focusOnContentInput={focusOnContentInput}
						focusOnTitleInput={focusOnnameInput}
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
								placeholder="Note's name"
								value={nameValue}
								onChange={handlenameChange}
								onBlur={handleContentBlur}
								ref={nameInputRef}
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