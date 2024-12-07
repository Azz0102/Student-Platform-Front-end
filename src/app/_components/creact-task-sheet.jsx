"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input01, Input40 } from "@/components/Input";
import Minimal from "@/components/Minimal";
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
import { useSelector } from "react-redux";
import { creactTask } from "../_lib/actions";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import CsvUpLoadFile from "@/components/CsvUpLoadFile";
import { Switch } from "@/components/ui/switch";
import MultipleSelector from "@/components/ui/multiple-selector";
import { useEffect } from "react";
import { useGetlistClassSessionQuery } from "@/lib/services/calender";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

// Định nghĩa các giá trị hằng số thay thế cho enum
const LABEL_VALUES = ["bug", "feature", "enhancement", "documentation"];
const AMPHITHEATERS = ["Amphitheater A", "Amphitheater B"];
const TYPE = ["Theory", "Practice"];
const SEMESTER = ["Hoc Ky I Nam 2024", "Hoc Ky II Nam 2024"];
const DAY_OF_WEEK = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
const GRADE_TYPE = ["Thành phần", "Giữa kỳ", "Cuối kỳ"];
const EVENT_TYPE = ["EXAM-001", "EVENT-002", "ASSIGNMENT-003"];
const STATUS_VALUES = ["todo", "in-progress", "done", "canceled"];
const PRIORITY_VALUES = ["low", "medium", "high"];

const Form0 = ({
	form,
	onSubmit,
	isUpdatePending,
	selected,
	selectedClassSession,
	classSession,
	onSubmitFile,
	handleSwitchChange,
	isGeneralSchoolNews,
	t,
}) => {
	switch (selected) {
		case 0:
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
									<FormLabel>{t("name")}</FormLabel>
									<FormControl>
										<Input01
											placeholder='Do a kickflip'
											type='number'
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
									{t("cancel")}
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								{t("save")}
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		case 1:
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
									<FormLabel>{t("name")}</FormLabel>
									<FormControl>
										{/* <Textarea
                        placeholder="Do a kickflip"
                        className="resize-none"
                        {...field}
                        /> */}
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
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										{/* <Textarea
                        placeholder="Do a kickflip"
                        className="resize-none"
                        {...field}
                        /> */}
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
							name='dateOfBirth'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dateOfBirth")}</FormLabel>
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
									{t("cancel")}
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								{t("save")}
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		case 2:
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
									<FormLabel>{t("name")}</FormLabel>
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
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("type")}</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='capitalize'>
												<SelectValue placeholder='Select a Type' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{TYPE.map((item) => (
													<SelectItem
														key={item}
														value={item}
														className='capitalize'
													>
														{item}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='capacity'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("capacity")}</FormLabel>
									<FormControl>
										<Input01
											placeholder='Do a kickflip'
											type={"number"}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='nameAmphitheater'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("amphitheater")}</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='capitalize'>
												<SelectValue
													placeholder={t(
														"selectAAmphitheater"
													)}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{AMPHITHEATERS.map((item) => (
													<SelectItem
														key={item}
														value={item}
														className='capitalize'
													>
														{item}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<CredenzaFooter className='gap-2 pt-2 sm:space-x-0'>
							<CredenzaClose asChild>
								<Button type='button' variant='outline'>
									{t("cancel")}
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								{t("save")}
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		case 3:
			return (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmitFile)}
						className='mx-1 flex flex-col gap-4'
						enctype='multipart/form-data'
					>
						<FormField
							control={form.control}
							name='isGeneralSchoolNews'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between'>
									<FormLabel>
										{t("isGeneralSchoolNews")}
									</FormLabel>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={(checked) => {
												field.onChange(checked);
												handleSwitchChange(checked); // Update local state
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{!isGeneralSchoolNews && (
							<FormField
								control={form.control}
								name='classSessionIds'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t("classSessionIds")}
										</FormLabel>
										<FormControl>
											<MultipleSelector
												defaultOptions={classSession}
												placeholder=''
												creatable
												emptyIndicator={
													<p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'></p>
												}
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("name")}</FormLabel>
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
							name='content'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Minimal {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("type")}</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='capitalize'>
												<SelectValue
													placeholder={t(
														"selectAType"
													)}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{EVENT_TYPE.map((item) => (
													<SelectItem
														key={item}
														value={item}
														className='capitalize'
													>
														{item}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='location'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("location")}</FormLabel>
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
							name='time'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("time")}</FormLabel>
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
							name='files'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("uploadFiles")}</FormLabel>
									<FormControl>
										<Input
											type='file'
											multiple // Cho phép chọn nhiều file
											onChange={(e) => {
												const files = Array.from(
													e.target.files
												); // Chuyển FileList thành Array
												field.onChange(files); // Cập nhật giá trị với danh sách tệp
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<CredenzaFooter className='gap-2 pt-2 sm:space-x-0'>
							<CredenzaClose asChild>
								<Button type='button' variant='outline'>
									{t("cancel")}
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								{t("save")}
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		case 4:
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
									<FormLabel>{t("name")}</FormLabel>
									<FormControl>
										{/* <Textarea
                    placeholder="Do a kickflip"
                    className="resize-none"
                    {...field}
                    /> */}
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
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("description")}</FormLabel>
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
						<CredenzaFooter className='gap-2 pt-2 sm:space-x-0'>
							<CredenzaClose asChild>
								<Button type='button' variant='outline'>
									{t("cancel")}
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								{t("save")}
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		case 5:
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
									<FormLabel>{t("name")}</FormLabel>
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
							name='nameSubject'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("subject")}</FormLabel>
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
							name='nameSemester'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("semester")}</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='capitalize'>
												<SelectValue
													placeholder={t(
														"selectASemester"
													)}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{SEMESTER.map((item) => (
													<SelectItem
														key={item}
														value={item}
														className='capitalize'
													>
														{item}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='fromDate'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fromDate")}</FormLabel>
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
									<FormLabel>{t("endDate")}</FormLabel>
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
							name='capacity'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("capacity")}</FormLabel>
									<FormControl>
										<Input01
											placeholder='Do a kickflip'
											type={"number"}
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
									{t("cancel")}
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								{t("save")}
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		case 6:
			return (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='mx-1 flex flex-col gap-4'
					>
						<FormField
							control={form.control}
							name='nameClassSession'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("ClassSession")}</FormLabel>
									<FormControl>
										<Input01
											values={selectedClassSession}
											placeholder='Dddd'
											disabled={true}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='nameClassroom'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("classroom")}</FormLabel>
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
							name='nameTeacher'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("teacher")}</FormLabel>
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
							name='startTime'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("startTime")}</FormLabel>
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
							name='numOfHour'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("numOfHours")}</FormLabel>
									<FormControl>
										<Input01
											placeholder='Do a kickflip'
											type={"number"}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='capacity'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("capacity")}</FormLabel>
									<FormControl>
										<Input01
											placeholder='Do a kickflip'
											type={"number"}
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
									{t("cancel")}
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								{t("save")}
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		case 7:
			return (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='mx-1 flex flex-col gap-4'
					>
						<FormField
							control={form.control}
							name='nameClassSession'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("ClassSession")}</FormLabel>
									<FormControl>
										<Input01
											values={selectedClassSession}
											placeholder='Dddd'
											disabled={true}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='nameUser'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("user")}</FormLabel>
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
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("type")}</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='capitalize'>
												<SelectValue
													placeholder={t(
														"selectAType"
													)}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{GRADE_TYPE.map((item) => (
													<SelectItem
														key={item}
														value={item}
														className='capitalize'
													>
														{item}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("value")}</FormLabel>
									<FormControl>
										<Input01
											placeholder='Do a kickflip'
											type={"number"}
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
									{t("cancel")}
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								{t("save")}
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		case 8:
			return (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='mx-1 flex flex-col gap-4'
					>
						<FormField
							control={form.control}
							name='nameUser'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("user")}</FormLabel>
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
						<CredenzaFooter className='gap-2 pt-2 sm:space-x-0'>
							<CredenzaClose asChild>
								<Button type='button' variant='outline'>
									{t("cancel")}
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								{t("save")}
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		default:
			break;
	}
};

export function CreactTaskSheet({ setLoadingDelete, ...props }) {
	const { t } = useTranslation();
	const [isUpdatePending, startUpdateTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);
	const selected = useSelector((state) => state.adminContent.selectedContent);
	const selectedClassSession = useSelector(
		(state) => state.adminContent.selectedClassSession
	);
	const selectedSessionDetail = useSelector(
		(state) => state.adminContent.selectedSessionDetail
	);
	const [isGeneralSchoolNews, setIsGeneralSchoolNews] = useState(false);

	const handleSwitchChange = (checked) => {
		setIsGeneralSchoolNews(checked);
	};

	const [classSession, setClassSession] = useState("");

	const {
		data: listClassSession,
		isLoading,
		refetch,
	} = useGetlistClassSessionQuery(
		{},
		{
			refetchOnFocus: true,
			refetchOnMountOrArgChange: true,
		}
	);

	useEffect(() => {
		if (listClassSession) {
			setClassSession(
				listClassSession.metadata.map((item) => {
					return {
						id: item.id,
						label: item.name,
						value: item.name,
					};
				})
			);
		}
	}, [listClassSession]);

	const form = useForm({});

	function onSubmit(input) {
		if (selected == 6 || selected == 7) {
			input.nameClassSession = selectedClassSession;
		}
		if (selected == 8) {
			input.sessionDetailsId = selectedSessionDetail;
		}
		console.log("input", input);
		startUpdateTransition(async () => {
			const { metadata } = await creactTask(input, selected);

			console.log("metadata", metadata);
			if (typeof metadata == "string") {
				toast.error(metadata);
				return;
			}
			setIsOpen(false);
			form.reset();
			props.onOpenChange?.(false);
			toast.success(t("success"));
		});
	}

	function onSubmitFile(data) {
		console.log("input", data);
		startUpdateTransition(async () => {
			const formData = new FormData();
			data.files?.forEach((file) => {
				formData.append("files", file); // Tên field 'files' phải khớp với backend
			});

			// Thêm các field còn lại vào FormData
			Object.keys(data).forEach((key) => {
				if (key !== "files") {
					formData.append(key, data[key]);
				}
			});
			const response = await fetch(
				`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/news`,
				{
					method: "POST",
					headers: {
						refreshToken: Cookies.get("refreshToken"), // Truyền refreshToken vào header
					},
					body: formData,
				}
			);

			const result = await response.json();
			console.log("Upload result:", result);

			const { metadata } = result;

			console.log("metadata", metadata);
			if (typeof metadata == "string") {
				toast.error(metadata);
				return;
			}
			setIsOpen(false);
			form.reset();
			props.onOpenChange?.(false);
			toast.success(t("success"));
		});
	}

	async (data) => {
		const formData = new FormData();

		// Thêm các file vào FormData
		data.files.forEach((file) => {
			formData.append("files", file); // Tên field 'files' phải khớp với backend
		});

		// Thêm các field còn lại vào FormData
		Object.keys(data).forEach((key) => {
			if (key !== "files") {
				formData.append(key, data[key]);
			}
		});

		try {
			const response = await fetch(
				`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/news`,
				{
					method: "POST",
					headers: {
						refreshToken: Cookies.get("refreshToken"), // Truyền refreshToken vào header
					},
					body: formData,
				}
			);

			const result = await response.json();
			console.log("Upload result:", result);
		} catch (error) {
			console.error("Error uploading files:", error);
		}
	};

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<Credenza open={isOpen} onOpenChange={setIsOpen}>
			<CredenzaTrigger onClick={() => setIsOpen(true)}>
				{t("create")}
			</CredenzaTrigger>
			<CredenzaContent className='flex flex-col gap-6 sm:max-w-md'>
				<CredenzaHeader className='text-left'>
					<CredenzaTitle>{t("create")}</CredenzaTitle>
					<CredenzaDescription>
						{t("createItemAndSave")}
					</CredenzaDescription>
				</CredenzaHeader>
				{selected != 3 && selected != 6 && <CsvUpLoadFile />}

				{/* <TabsDemo form={form} onSubmit={onSubmit} /> */}
				<ScrollArea className='max-h-96 overflow-auto rounded-md'>
					<Form0
						form={form}
						onSubmit={onSubmit}
						isUpdatePending={isUpdatePending}
						selected={selected}
						selectedClassSession={selectedClassSession}
						classSession={classSession}
						onSubmitFile={onSubmitFile}
						handleSwitchChange={handleSwitchChange}
						isGeneralSchoolNews={isGeneralSchoolNews}
						t={t}
					/>
				</ScrollArea>
			</CredenzaContent>
		</Credenza>
	);
}
