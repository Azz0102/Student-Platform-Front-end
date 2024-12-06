"use client";

import { useEffect, useTransition } from "react";
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
} from "@/components/ui/credenza";
import { useSelector } from "react-redux";
import { toast } from "sonner";

// Định nghĩa các giá trị hằng số thay thế cho enum
const LABEL_VALUES = ["bug", "feature", "enhancement", "documentation"];
const AMPHITHEATERS = ["Amphitheater A", "Amphitheater B"];
const EVENT_TYPE = ["EXAM-001", "EVENT-002", "ASSIGNMENT-003"];
const STATUS_VALUES = ["todo", "in-progress", "done", "canceled"];
const PRIORITY_VALUES = ["low", "medium", "high"];

const Form0 = ({ form, onSubmit, isUpdatePending, selected }) => {
	switch (selected) {
		case 0:
			return (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-4 mx-1'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
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
									Cancel
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								Save
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
						className='flex flex-col gap-4 mx-1'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
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
									<FormLabel>DateOfBirth</FormLabel>
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
									Cancel
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								Save
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
						className='flex flex-col gap-4 mx-1'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
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
						{/* <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        type={'number'}
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              /> */}
						{/* <FormField
              control={form.control}
              name="nameAmphitheater"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Amphitheater</FormLabel>
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                  >
                      <FormControl>
                      <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select a Amphitheater" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectGroup>
                          {AMPHITHEATERS.map((item) => (
                          <SelectItem
                              key={item}
                              value={item}
                              className="capitalize"
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
              /> */}
						<CredenzaFooter className='gap-2 pt-2 sm:space-x-0'>
							<CredenzaClose asChild>
								<Button type='button' variant='outline'>
									Cancel
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								Save
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		case 3:
			return (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-4 mx-1'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
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
									<FormLabel>Amphitheater</FormLabel>
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
									<FormLabel>Location</FormLabel>
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
									<FormLabel>Time</FormLabel>
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
									Cancel
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								Save
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
						className='flex flex-col gap-4 mx-1'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
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
									<FormLabel>Description</FormLabel>
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
									Cancel
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								Save
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
						className='flex flex-col gap-4 mx-1'
					>
						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
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
									Cancel
								</Button>
							</CredenzaClose>
							<Button disabled={isUpdatePending}>
								{isUpdatePending && (
									<Icons.spinner
										className='mr-2 size-4 animate-spin'
										aria-hidden='true'
									/>
								)}
								Save
							</Button>
						</CredenzaFooter>
					</form>
				</Form>
			);

		default:
			break;
	}
};

export function UpdateTaskSheet({ task, ...props }) {
	const [isUpdatePending, startUpdateTransition] = useTransition();
	const selected = useSelector((state) => state.adminContent.selectedContent);

	const form = useForm({});

	useEffect(() => {
		form.reset(task);
	}, [task, form]);

	function onSubmit(input) {
		console.log("input", input);
		startUpdateTransition(async () => {
			if (!task) return;

			// const { error } = await updateTask({
			//   id: task.id,
			//   ...input,
			// })

			// if (error) {
			//   toast.error(error)
			//   return
			// }

			form.reset();
			props.onOpenChange?.(false);
			toast.success("Task updated");
		});
	}

	return (
		<Credenza {...props}>
			<CredenzaContent className='flex flex-col gap-6 sm:max-w-md'>
				<CredenzaHeader className='text-left'>
					<CredenzaTitle>Update</CredenzaTitle>
					<CredenzaDescription>
						Update details and save the changes.
					</CredenzaDescription>
				</CredenzaHeader>

				{/* <TabsDemo form={form} onSubmit={onSubmit} /> */}

				<Form0
					form={form}
					onSubmit={onSubmit}
					isUpdatePending={isUpdatePending}
					selected={selected}
				/>
			</CredenzaContent>
		</Credenza>
	);
}
