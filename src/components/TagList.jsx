import * as React from "react";
import { Tags, AlertCircle, Delete } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "./ui/loading-spinner";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TagElement } from "./TagElement";
import { useRemoveTagMutation } from "@/lib/services/tag";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setListNote } from "@/lib/features/noteSlice";
import { useTranslation } from "react-i18next";

export function TagList({
	tags,
	setCurrentTag,
	currentTag,
	setCurrentNote,
	notes,
	setTitleValue,
	setContentValue,
	setSelectedValues,
	setTags,
	currentNote,
	setNotes,
	isLoading,
	error,
}) {
	const dispatch = useDispatch();
	const [
		removeTagMutation,
		{
			isLoading: isRemoveTagLoading,
			isError: removeTagError,
			data: removeTagData,
		},
	] = useRemoveTagMutation();
	const { t } = useTranslation();

	const removeTag = async (tag) => {
		try {
			const removeTagResult = await removeTagMutation({
				tagId: tag.id,
			}).unwrap();

			setCurrentTag({});
			const updatedTags = [...tags];
			const newTags = updatedTags.filter((e) => e.id !== tag.id);
			setTags(newTags);
			setCurrentNote({
				...currentNote,
				tags: currentNote.tags.filter((e) => e.id !== tag.id),
			});
			let updatedNotes = [...notes];

			for (let i = 0; i < updatedNotes.length; i++) {
				const element = updatedNotes[i];
				updatedNotes[i] = {
					...element,
					tags: element.tags.filter((e) => e.id !== tag.id),
				};

				setNotes(updatedNotes);
				dispatch(setListNote(updatedNotes));
			}
		} catch (error) {
			toast.error(t("tagList.errorRemovingTag"));
		}
	};

	return (
		<div className='flex w-1/2 flex-col items-center border-r-2 border-r-foreground'>
			<div className='flex w-full justify-between p-4'>
				<div className='flex items-center p-2 pb-10'>
					<Tags />
					<h3 className='pl-2'>{t("tagList.tag")}</h3>
				</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
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
						</TooltipTrigger>
						<TooltipContent>
							<p>{t("tagList.clearTag")}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			{isLoading && (
				<div className='flex w-full items-center justify-center'>
					<LoadingSpinner />
				</div>
			)}
			{error && (
				<Alert variant='destructive' className='w-5/6'>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>{t("tagList.error")}</AlertTitle>
					<AlertDescription>{t("tagList.errorFetchingTags")}</AlertDescription>
				</Alert>
			)}
			{tags.length === 0 && !isLoading && !error && (
				<div>{t("tagList.noTagAvailablePleaseCreateANewTag")}</div>
			)}

			{tags.length !== 0 && !isLoading && !error && (
				<ScrollArea className='h-[600px] w-full rounded-md [&>div>div[style]]:!block'>
					<div className='p-4'>
						{tags.map((tag, index) => (
							<TagElement
								key={index}
								tag={tag}
								tags={tags}
								index={index}
								currentTag={currentTag}
								notes={notes}
								removeTag={removeTag}
								setCurrentTag={setCurrentTag}
								setCurrentNote={setCurrentNote}
								setTitleValue={setTitleValue}
								setContentValue={setContentValue}
								setSelectedValues={setSelectedValues}
								setNotes={setNotes}
								currentNote={currentNote}
								setTags={setTags}
							/>
						))}
					</div>
				</ScrollArea>
			)}
		</div>
	);
}
