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
import { TagDialog } from "./TagDialog";
import {
	useGetListNoteQuery,
	useUpdateNoteMutation,
	useUploadFileMutation,
} from "@/lib/services/note";
import { useCreateTagMutation, useGetListTagQuery } from "@/lib/services/tag";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { setCurrentNoteId, setListNote } from "@/lib/features/noteSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useDeepCompareEffect } from "use-deep-compare";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTranslation } from "react-i18next";
import { allowedTypes } from "@/constants/AllowedTypes";
import { Button } from "./ui/button";

const MDEditor = dynamic(
	() => import("@uiw/react-md-editor").then((mod) => mod.default),
	{ ssr: false }
);

const originalUrl = `https://${process.env.NEXT_PUBLIC_BASE_URL}/uploads/`;
// const originalUrl = `https://df6c-42-116-197-7.ngrok-free.app/uploads/`;

const processMarkdownContent = (content) => {
	return content.replace(
		/!\[([^\]]*)\]\(([^)]+)\)|\[(.*?)\]\((.*?)\)/g,
		(match, alt, imageUrl, linkText, linkUrl) => {
			const url = imageUrl || linkUrl;

			// Only process URLs that start with the host URL
			if (!url.startsWith(originalUrl)) {
				return match; // Leave non-host URLs unchanged
			}

			const filename = url.split("/").pop(); // Extract filename from URL

			if (imageUrl) {
				// If it's an image, keep markdown syntax for images
				return `![${alt || filename}](${filename})`;
			} else {
				// If it's a link, keep markdown syntax for links
				return `[${linkText || filename}](${filename})`;
			}
		}
	);
};

const revertProcessedContent = (content) => {
	return content.replace(
		/!\[([^\]]*)\]\(([^)]+)\)|\[(.*?)\]\((.*?)\)/g,
		(match, alt, filenameImage, linkText, filenameLink) => {
			const filename = filenameImage || filenameLink;

			// Only proceed if the filename has no slashes, meaning it's not a full URL
			if (filename.includes("/")) return match;

			if (filenameImage) {
				// Revert image to full URL format
				return `![${alt || filename}](${originalUrl}${filenameImage})`;
			} else {
				// Revert link to full URL format
				return `[${linkText || filename}](${originalUrl}${filenameLink})`;
			}
		}
	);
};

export function Note() {
	const dispatch = useDispatch();

	const refreshToken = Cookies.get("refreshToken");
	const { userId } = jwtDecode(refreshToken);

	const {
		data: noteList = [],
		error: noteError,
		isLoading: isNoteLoading,
	} = useGetListNoteQuery(userId);

	const {
		data: tagList = [],
		error: tagError,
		isLoading: isTagLoading,
	} = useGetListTagQuery(userId);

	const { t } = useTranslation();

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

	const [tags, setTags] = useState([]);
	const [notes, setNotes] = useState([]);

	const [currentNote, setCurrentNote] = useState(
		currentNoteIdState
			? notes.filter((item) => item.id === currentNoteIdState)[0]
			: {}
	);

	const [currentTag, setCurrentTag] = useState({});
	const [newNoteIndex, setNewNoteIndex] = useState(0);

	const nameInputRef = useRef(null);
	const contentInputRef = useRef(null);

	// State to hold selected values
	const [selectedValues, setSelectedValues] = useState([]);
	const [open, setOpen] = useState(false);
	const [uploadFile] = useUploadFileMutation();

	// Function to handle file upload
	const handleFileUpload = async (file) => {
		// Create form data and append the file
		const formData = new FormData();

		formData.append("file", file);

		try {
			const data = await uploadFile({ file: formData });
			toast.success(t("fileUploadedSuccessfully"));

			return data; // Return the URL of the uploaded file
		} catch (error) {
			toast.error(t("errorUploadingFile"));
			return null;
		}
	};

	const attachFileCommand = {
		name: "attach-file",
		keyCommand: "attach-file",
		buttonProps: { "aria-label": "Attach File", title: t("attachAFile") },
		icon: (
			<svg
				viewBox='0 0 24 24'
				fill='currentColor'
				height='1em'
				width='1em'
			>
				<path fill='none' d='M0 0h24v24H0z' />
				<path d='M14.828 7.757l-5.656 5.657a1 1 0 101.414 1.414l5.657-5.656A3 3 0 1012 4.929l-5.657 5.657a5 5 0 107.071 7.07L19.071 12l1.414 1.414-5.657 5.657a7 7 0 11-9.9-9.9l5.658-5.656a5 5 0 017.07 7.07L12 16.244A3 3 0 117.757 12l5.657-5.657 1.414 1.414z' />
			</svg>
		),
		execute: () => {
			const fileInput = document.createElement("input");
			fileInput.type = "file";
			fileInput.accept = "*";
			fileInput.onchange = async (e) => {
				const file = e.target.files[0];
				if (file) {
					if (!allowedTypes.includes(file.type)) {
						toast.error(t("fileTypeNotSupported"));
						return;
					}
					const data = await handleFileUpload(file);
					if (data) {
						if (data?.data?.fileUrl) {
							const fileUrl = data?.data?.fileUrl;
							const fileExtension = fileUrl
								.split(".")
								.pop()
								.toLowerCase();
							const isImage = ["jpg", "jpeg", "png"].includes(
								fileExtension
							);

							// Format as image or file link based on file type
							const fileLink = isImage
								? `![](${fileUrl})` // Markdown for displaying an image
								: `[Download File](${fileUrl})`; // Markdown for non-image file link

							let updatedContent = "";
							setContentValue((prevContent) => {
								updatedContent = `${prevContent}\n${fileLink}`;
								return `${prevContent}\n${fileLink}`;
							});
							const updatedNotes = [...notes];
							updatedNotes[
								updatedNotes.findIndex(
									(note) => note.id === currentNote.id
								)
							] = {
								...currentNote,
								content: updatedContent,
							};
							setCurrentNote({
								...currentNote,
								content: updatedContent,
							});

							setNotes(updatedNotes);
						}
					}
				}
			};
			fileInput.click();
		},
	};

	const customCommands = commands.getCommands().map((cmd) => {
		switch (cmd.name) {
			case "bold":
				cmd.buttonProps.title = t("addBoldText");
				break;
			case "italic":
				cmd.buttonProps.title = t("addItalicText");
				break;
			case "strikethrough":
				cmd.buttonProps.title = t("addStrikethroughText");
				break;
			case "quote":
				cmd.buttonProps.title = t("insertAQuote");
				break;
			case "link":
				cmd.buttonProps.title = t("addALink");
				break;
			case "image":
				cmd.buttonProps.title = t("addImage");
				break;
			case "comment":
				cmd.buttonProps.title = t("insertComment");
				break;
			case "codeBlock":
				cmd.buttonProps.title = t("insertCodeBlock");
				break;
			case "unordered-list":
				cmd.buttonProps.title = t("addUnorderedList");
				break;
			case "ordered-list":
				cmd.buttonProps.title = t("addOrderedList");
				break;
			case "checked-list":
				cmd.buttonProps.title = t("addCheckedList");
				break;
			case "title":
				cmd.buttonProps.title = t("insertTitle");
				break;
			case "title1":
				cmd.buttonProps.title = t("insertTitle1");
				break;
			case "title2":
				cmd.buttonProps.title = t("insertTitle2");
				break;
			case "title3":
				cmd.buttonProps.title = t("insertTitle3");
				break;
			case "title4":
				cmd.buttonProps.title = t("insertTitle4");
				break;
			case "title5":
				cmd.buttonProps.title = t("insertTitle5");
				break;
			case "title6":
				cmd.buttonProps.title = t("insertTitle6");
				break;
			case "help":
				cmd.buttonProps.title = t("openHelp");
				break;
			case "hr":
				cmd.buttonProps.title = t("insertHR");
				break;
			case "issue":
				cmd.buttonProps.title = t("addIssue");
				break;
			case "table":
				cmd.buttonProps.title = t("addTable");
				break;
			default:
				break;
		}
		return cmd;
	});

	const extraCustomCommands = commands.getExtraCommands().map((cmd) => {
		switch (cmd.name) {
			case "fullscreen":
				cmd.buttonProps.title = t("toggleFullscreen");
				break;
			case "preview":
				cmd.buttonProps.title = t("previewCode");
				break;
			case "live":
				cmd.buttonProps.title = t("liveCode");
				break;
			case "edit":
				cmd.buttonProps.title = t("editCode");
				break;
			default:
				break;
		}
		return cmd;
	});

	useEffect(() => {
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
									tagIds: notes[i].tags.map((e) => e.id),
								});
							}
						}
						toast.success(t("saveNotesSuccessfully"));
						dispatch(setListNote(notes));
					} catch (error) {
						toast.error(t("saveNoteFailed"));
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
				event.returnValue = t("youHaveUnsavedChanges"); // Display warning dialog
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
	}, [dispatch, listNote, notes, t, updateNote]);

	useDeepCompareEffect(() => {
		toast(t("useCtrlSToSaveNoteChanges"));
	}, []);

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
					toast.error(t("noSelectedNoteFound!"));
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
			content: revertProcessedContent(newContent),
		};
		setCurrentNote({
			...currentNote,
			content: revertProcessedContent(newContent),
		});
		setContentValue(revertProcessedContent(newContent));
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

		if (selectedValues.length !== 0) {
			for (let i = 0; i < selectedValues.length; i++) {
				const element = selectedValues[i];
				if (!element.id) {
					try {
						const newTag = await createTag({
							userId: userId,
							name: element.value,
						}).unwrap();

						newSelectedValue[i] = {
							id: newTag.metadata.id,
							label: newTag.metadata.name,
							value: newTag.metadata.name,
						};

						setTags([
							...tags,
							{
								id: newTag.metadata.id,
								name: newTag.metadata.name,
							},
						]);
					} catch (error) {
						toast.error(t("errorCreatingTag"));
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

		const updatedNote = await updateNote({
			noteId: currentNote.id,
			content: currentNote.content,
			name: currentNote.name,
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
								placeholder={t("noteName")}
								value={nameValue}
								onChange={handlenameChange}
								onBlur={handleContentBlur}
								ref={nameInputRef}
							/>
						</div>
						<div className='w-full' data-color-mode={`${theme}`}>
							<MDEditor
								value={processMarkdownContent(contentValue)}
								onChange={handleContentChange}
								previewOptions={{
									rehypePlugins: [[rehypeSanitize]],
								}}
								textareaProps={{
									placeholder: t("pleaseEnterMarkdownText"),
								}}
								visibleDragbar={false}
								ref={contentInputRef}
								// height="100%"
								// minHeight={1000}
								height={height - 210}
								commands={[
									// ...commands.getCommands(),
									...customCommands,
									attachFileCommand,
								]}
								extraCommands={extraCustomCommands}
								components={{
									preview: (source, state, dispatch) => {
										return (
											<MarkdownPreview
												rehypePlugins={[
													[rehypeSanitize],
												]}
												source={revertProcessedContent(
													source
												)}
											/>
											// <div>
											// 	{revertProcessedContent(source)}
											// </div>
										);
									},
								}}
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
						<div className='mt-2 xl:hidden'>
							<Button
								onClick={async () => {
									if (notes.length > 0) {
										try {
											for (
												let i = 0;
												i < notes.length;
												i++
											) {
												if (
													notes[i].name !==
														listNote[i].name ||
													notes[i].content !==
														listNote[i].content
												) {
													const updatedNote =
														await updateNote({
															noteId: notes[i].id,
															name: notes[i].name,
															content:
																notes[i]
																	.content,
															tagIds: notes[
																i
															].tags.map(
																(e) => e.id
															),
														});
												}
											}
											toast.success(
												t("saveNotesSuccessfully")
											);
											dispatch(setListNote(notes));
										} catch (error) {
											toast.error(t("saveNoteFailed"));
										}
									}
								}}
							>
								{t("tagDialog.saveChanges")}
							</Button>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
