"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Input01, Input40 } from "@/components/Input";
import {
	Credenza,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
} from "@/components/ui/credenza";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Form0 = ({ form, onSubmit, isUpdatePending, t }) => {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-1 flex flex-col gap-4'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("admin.semesterName")}</FormLabel>
							<FormControl>
								<Input01
									placeholder='Do a kickflip'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='fromDate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("admin.startDate")}</FormLabel>
							<FormControl>
								<Input40
									placeholder='Do a kickflip'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='endDate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("admin.endDate")}</FormLabel>
							<FormControl>
								<Input40
									placeholder='Do a kickflip'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<CredenzaFooter className='gap-2 pt-2 sm:space-x-0'>
					<CredenzaClose asChild>
						<Button type='button' variant='outline'>
							{t("admin.cancel")}
						</Button>
					</CredenzaClose>
					<Button disabled={isUpdatePending}>
						{isUpdatePending && (
							<Icons.spinner
								className='mr-2 size-4 animate-spin'
								aria-hidden='true'
							/>
						)}
						{t("admin.save")}
					</Button>
				</CredenzaFooter>
			</form>
		</Form>
	);
};
export function CreactSemester({ refetchSemester }) {
	const { t } = useTranslation();
	const [isUpdatePending, startUpdateTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);
	const selected = useSelector((state) => state.adminContent.selectedContent);
	const form = useForm({});

	function onSubmit(input) {
		console.log("input", input);
		startUpdateTransition(async () => {
			const response = await fetch(
				`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/semester`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(input),
				}
			);

			const { metadata } = await response.json();

			refetchSemester();
			if (typeof metadata == "string") {
				toast.error(metadata);
				return;
			}
			setIsOpen(false);
			form.reset();
			toast.success(t("admin.success"));
		});
	}

	return (
		<Credenza open={isOpen} onOpenChange={setIsOpen}>
			<CredenzaTrigger onClick={() => setIsOpen(true)}>
				{t("admin.addSemester")}
			</CredenzaTrigger>
			<CredenzaContent className='flex flex-col gap-6 sm:max-w-md'>
				<CredenzaHeader className='text-left'>
					<CredenzaTitle>{t("admin.addSemester")}</CredenzaTitle>
					<CredenzaDescription>
						{t("admin.addNewSemester")}
					</CredenzaDescription>
				</CredenzaHeader>
				<ScrollArea className='max-h-96 overflow-auto rounded-md'>
					<Form0
						form={form}
						onSubmit={onSubmit}
						isUpdatePending={isUpdatePending}
						t={t}
					/>
				</ScrollArea>
			</CredenzaContent>
		</Credenza>
	);
}
