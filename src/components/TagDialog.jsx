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

export function TagDialog(
	open,
	handleDialogChange,
	setSelectedValues,
	currentNote,
	selectedValues,
	handleSelectChange,
	handleTagChange,
	tags
) {
	const { width } = useWindowDimensions();

	if (width > 768) {
		return (
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
							defaultOptions={(tags || []).map((tag) => ({
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
		);
	}

	return (
		<Drawer open={open} onOpenChange={handleDialogChange}>
			<DrawerTrigger asChild>
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
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle>Add or remove tags</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<div className='flex items-center space-x-2'>
					<MultipleSelector
						defaultOptions={(tags || []).map((tag) => ({
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
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button type='submit' onClick={handleTagChange}>
							Save changes
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
