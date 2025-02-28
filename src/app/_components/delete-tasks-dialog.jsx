"use client";

import * as React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
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
import { Icons } from "@/components/icons";

import { deleteTasks } from "../_lib/actions";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export function DeleteTasksDialog({
	tasks,
	showTrigger = true,
	onSuccess,
	...props
}) {
	const [isDeletePending, startDeleteTransition] = React.useTransition();
	const isDesktop = useMediaQuery("(min-width: 640px)");
	const selected = useSelector((state) => state.adminContent.selectedContent);
	const { t } = useTranslation();

	function onDelete() {
		startDeleteTransition(async () => {
			const { error } = await deleteTasks(
				{
					ids: tasks.map((task) => task.id),
				},
				selected
			);

			if (error) {
				toast.error(error);
				return;
			}

			props.onOpenChange?.();
			toast.success("Tasks deleted");
			onSuccess?.();
		});
	}

	if (isDesktop) {
		return (
			<Dialog {...props}>
				{showTrigger ? (
					<DialogTrigger asChild>
						<Button variant='outline' size='sm'>
							<TrashIcon
								className='mr-2 size-4'
								aria-hidden='true'
							/>
							{t("delete")} ({tasks.length})
						</Button>
					</DialogTrigger>
				) : null}
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t("areYouAbsolutelySure")}</DialogTitle>
					</DialogHeader>
					<DialogFooter className='gap-2 sm:space-x-0'>
						<DialogClose asChild>
							<Button variant='outline'>{t("cancel")}</Button>
						</DialogClose>
						<Button
							aria-label='Delete selected rows'
							variant='destructive'
							onClick={onDelete}
							disabled={isDeletePending}
						>
							{isDeletePending && (
								<Icons.spinner
									className='mr-2 size-4 animate-spin'
									aria-hidden='true'
								/>
							)}
							{t("delete")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer {...props}>
			{showTrigger ? (
				<DrawerTrigger asChild>
					<Button variant='outline' size='sm'>
						<TrashIcon className='mr-2 size-4' aria-hidden='true' />
						{t("delete")} ({tasks.length})
					</Button>
				</DrawerTrigger>
			) : null}
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{t("areYouAbsolutelySure")}</DrawerTitle>
				</DrawerHeader>
				<DrawerFooter className='gap-2 sm:space-x-0'>
					<DrawerClose asChild>
						<Button variant='outline'>{t("cancel")}</Button>
					</DrawerClose>
					<Button
						aria-label='Delete selected rows'
						variant='destructive'
						onClick={onDelete}
						disabled={isDeletePending}
					>
						{isDeletePending && (
							<Icons.spinner
								className='mr-2 size-4 animate-spin'
								aria-hidden='true'
							/>
						)}
						{t("delete")}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
