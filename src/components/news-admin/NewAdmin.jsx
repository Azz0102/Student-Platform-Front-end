"use client";

import React, { useState } from "react";
import Minimal from "../Minimal";
import { TagList } from "../TagList";
import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Plus, Search, Trash, LoaderCircle } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const students = ["20020672", "20020673", "20020674", "2002075"];

const NewAdmin = () => {
	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [inputValue, setInputValue] = useState("");

	return (
		<Credenza>
			<CredenzaTrigger asChild>
				<Button>Open modal</Button>
			</CredenzaTrigger>
			<CredenzaContent className='h-auto max-w-3xl'>
				<CredenzaHeader>
					<CredenzaTitle>Credenza</CredenzaTitle>
					<CredenzaDescription>
						A responsive modal component for shadcn/ui.
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<div className='rounded-lg border p-4'>
						<div className='flex flex-col items-center md:flex-row md:justify-between'>
							<p className='mb-2 text-xl md:mb-0'>Sinh vien</p>
							<div className='w-full md:w-1/2'>
								<div className='relative'>
									<Input
										id='input-26'
										className='peer ps-9'
										placeholder='Search...'
										type='search'
										value={inputValue}
										onChange={(e) =>
											setInputValue(e.target.value)
										}
									/>
									<div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
										<Search size={16} strokeWidth={2} />
									</div>
								</div>
								<ScrollArea className='mt-2 h-44'>
									<div className='mx-3'>
										{students.map((tag) => (
											<>
												<div
													key={tag}
													className='flex flex-row items-center justify-between text-sm'
												>
													{tag}
													<TooltipProvider
														delayDuration={0}
													>
														<Tooltip>
															<TooltipTrigger
																asChild
															>
																<Button
																	variant='outline'
																	size='icon'
																	aria-label='Add new item'
																>
																	<Trash
																		size={
																			16
																		}
																		strokeWidth={
																			2
																		}
																		aria-hidden='true'
																	/>
																</Button>
															</TooltipTrigger>
															<TooltipContent className='border border-input bg-popover px-2 py-1 text-xs text-muted-foreground'>
																Delete
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</div>
												<Separator className='my-1' />
											</>
										))}
									</div>
								</ScrollArea>
							</div>
						</div>
					</div>
					<div className='mt-2 rounded-lg border p-4'>
						<div className='flex flex-col items-center md:flex-row md:justify-between'>
							<p className='mb-2 text-xl md:mb-0'>
								Them sinh vien
							</p>
							<div className='w-full md:w-1/2'>
								<div className='relative'>
									<Input
										id='input-26'
										className='peer pe-9 ps-9'
										placeholder='Search...'
										type='search'
										value={inputValue}
										onChange={(e) =>
											setInputValue(e.target.value)
										}
									/>
									<div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
										{isLoading ? (
											<LoaderCircle
												className='animate-spin'
												size={16}
												strokeWidth={2}
												aria-hidden='true'
												role='presentation'
											/>
										) : (
											<Search
												size={16}
												strokeWidth={2}
												aria-hidden='true'
											/>
										)}
									</div>
									<button
										className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
										aria-label='Submit search'
										type='submit'
										onClick={() => {
											setIsLoading(!isLoading);
										}}
									>
										<ArrowRight
											size={16}
											strokeWidth={2}
											aria-hidden='true'
										/>
									</button>
								</div>
								<ScrollArea className='mt-2 h-44'>
									<div className='mx-3'>
										{students.map((tag) => (
											<>
												<div
													key={tag}
													className='flex flex-row items-center justify-between text-sm'
												>
													{tag}
													<TooltipProvider
														delayDuration={0}
													>
														<Tooltip>
															<TooltipTrigger
																asChild
															>
																<Button
																	variant='outline'
																	size='icon'
																	aria-label='Add new item'
																>
																	<Plus
																		size={
																			16
																		}
																		strokeWidth={
																			2
																		}
																		aria-hidden='true'
																	/>
																</Button>
															</TooltipTrigger>
															<TooltipContent className='border border-input bg-popover px-2 py-1 text-xs text-muted-foreground'>
																Delete
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</div>
												<Separator className='my-1' />
											</>
										))}
									</div>
								</ScrollArea>
							</div>
						</div>
					</div>
				</CredenzaBody>
				<CredenzaFooter>
					<CredenzaClose asChild>
						<Button>Close</Button>
					</CredenzaClose>
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
};

export default NewAdmin;
