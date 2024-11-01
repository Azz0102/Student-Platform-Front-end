import * as React from "react";

import { cn } from "@/lib/utils";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MultipleSelector from "@/components/ui/multiple-selector";
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
import { useTranslation } from "react-i18next";

export function TagDialog({
	open,
	handleDialogChange,
	setSelectedValues,
	currentNote,
	selectedValues,
	handleSelectChange,
	handleTagChange,
	tags,
}) {
	const { width } = useWindowDimensions();
	const { t } = useTranslation();

	if (width > 768) {
		return (
			<Dialog open={open} onOpenChange={handleDialogChange}>
				<DialogTrigger asChild>
					<div
						className='mt-1 flex w-full flex-wrap items-center'
						onClick={() => {
							setSelectedValues(
								currentNote.tags.length === 0 ||
									!currentNote.tags
									? []
									: currentNote.tags.map((e) => ({
											id: e.id,
											label: e.name,
											value: e.name,
										}))
							);
						}}
					>
						<Button variant='ghost' className='h-6 p-1'>
							<Tag size={20} />
						</Button>
						{currentNote &&
							currentNote.tags &&
							currentNote.tags.length !== 0 &&
							currentNote.tags
								.map((tag) => ({
									id: tag.id,
									label: tag.name,
									value: tag.name,
								}))
								.map((option, index) => {
									return (
										<div className='m-1' key={index}>
											<Badge>{option.value}</Badge>
										</div>
									);
								})}
						<div className='ml-2 text-foreground'>
							{t("tagDialog.clickToAddTags")}
						</div>
					</div>
				</DialogTrigger>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>
							{t("tagDialog.addOrRemoveTags")}
						</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<div className='flex items-center space-x-2'>
						<MultipleSelector
							defaultOptions={(tags || []).map((tag) => ({
								id: tag.id,
								label: tag.name,
								value: tag.name,
							}))}
							placeholder={t(
								"tagDialog.typeSomethingThatDoesNotExistInDropdowns"
							)}
							creatable
							emptyIndicator={
								<p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
									{t("tagDialog.noResultsFound")}
								</p>
							}
							value={selectedValues}
							onChange={handleSelectChange}
						/>
					</div>
					<DialogFooter className='sm:justify-end'>
						<DialogClose asChild>
							<Button type='submit' onClick={handleTagChange}>
								{t("tagDialog.saveChanges")}
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={handleDialogChange}>
			<DrawerTrigger asChild>
				<div
					className='mt-1 flex w-full flex-wrap items-center'
					onClick={() => {
						setSelectedValues(
							currentNote.tags.length === 0 || !currentNote.tags
								? []
								: currentNote.tags.map((e) => ({
										id: e.id,
										label: e.name,
										value: e.name,
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
							.map((tag) => ({
								id: tag.id,
								label: tag.name,
								value: tag.name,
							}))
							.map((option, index) => {
								return (
									<div className='m-1' key={index}>
										<Badge>{option.value}</Badge>
									</div>
								);
							})}
					<div className='ml-2 text-foreground'>
						{t("tagDialog.clickToAddTags")}
					</div>
				</div>
			</DrawerTrigger>
			<DrawerContent className='h-96'>
				<DrawerHeader className='text-left'>
					<DrawerTitle>{t("tagDialog.addOrRemoveTags")}</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<div className='m-2 flex items-center space-x-2'>
					<MultipleSelector
						defaultOptions={(tags || []).map((tag) => ({
							id: tag.id,
							label: tag.name,
							value: tag.name,
						}))}
						placeholder={t(
							"tagDialog.typeSomethingThatDoesNotExistInDropdowns"
						)}
						creatable
						emptyIndicator={
							<p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
								{t("tagDialog.noResultsFound")}
							</p>
						}
						value={selectedValues}
						onChange={handleSelectChange}
					/>
				</div>
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button type='submit' onClick={handleTagChange}>
							{t("tagDialog.saveChanges")}
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
