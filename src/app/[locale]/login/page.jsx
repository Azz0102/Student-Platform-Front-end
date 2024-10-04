"use client";
import React, { createContext } from "react";
import Cookies from "js-cookie";

import Image from "next/image";
import Link from "next/link";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import vercel from "/public/android-chrome-512x512.png";
import { ModeToggle } from "@/components/mode-toggle";
import LanguageToggle from "@/components/LanguageToggle";
import { toast } from "sonner";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["setting"];

const SigninSchema = Yup.object().shape({
	name: Yup.string()
		.matches(/^\d{8}$/, "Name must be exactly 8 digits")
		.required("Required"),
	password: Yup.string()
		.min(6, "Must be more than 6 digits")
		.required("Required"),
});

export const description =
	"A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export default async function Dashboard({ params: { locale } }) {
	const router = useRouter();
	const [login] = useLoginMutation();
	const { height } = useWindowDimensions();
	const { resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<div
				className='flex w-full items-center justify-center'
				style={{ height: `${height}px` }}
			>
				<div className='flex items-center justify-center py-12 lg:w-1/2'>
					<div className='mx-auto grid gap-6'>
						<div className='grid gap-2 text-center'>
							<h1 className='text-3xl font-bold'>Login</h1>
							<p className='text-balance text-muted-foreground'>
								Enter your email below to login to your account
							</p>
						</div>
						<div className='grid gap-4'>
							<Formik
								initialValues={{
									name: "",
									password: "",
								}}
								validationSchema={SigninSchema}
								onSubmit={async (values) => {
									// same shape as initial values
									console.log(values);

									try {
										const response =
											await login(values).unwrap();

										const roleId = jwtDecode(
											response.metadata.tokens
												.refreshToken
										).roleId;
										Cookies.set(
											"refreshToken",
											response.metadata.tokens
												.refreshToken,
											{ expires: 365 }
										);
										if (roleId === 1) {
											router.push("/admin/dashboard");
										} else {
											router.push("/user/dashboard");
										}
									} catch (error) {
										toast.error("Login Error");
									}
								}}
							>
								{({ isValid, dirty }) => (
									<Form>
										<div className='mb-4 grid gap-2'>
											<Label htmlFor='text'>Name</Label>
											<Field name='name' as={Input} />
											<ErrorMessage
												name='name'
												component='div'
												style={{ color: "red" }}
											/>
											{/* <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        /> */}
										</div>
										<div className='mb-4 grid gap-2'>
											<div className='flex items-center'>
												<Label htmlFor='password'>
													Password
												</Label>
												<Link
													href='/forgot-password'
													className='ml-auto inline-block text-sm underline'
												>
													Forgot your password?
												</Link>
											</div>

											<Field name='password' as={Input} />
											<ErrorMessage
												name='password'
												component='div'
												style={{ color: "red" }}
											/>
											{/* <Input id="password" type="password" required /> */}
										</div>
										<Button
											type='submit'
											className='w-full'
											disabled={!isValid || !dirty}
										>
											Login
										</Button>
									</Form>
								)}
							</Formik>
						</div>
						<div className='flex flex-row justify-between'>
							<ModeToggle />
							<LanguageToggle />
						</div>
					</div>
				</div>
				<div className='hidden bg-muted lg:block lg:h-full lg:w-1/2'>
					<Image
						src={vercel}
						alt='Image'
						width='1920'
						height='1080'
						className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
					/>
				</div>
			</div>
		</TranslationsProvider>
	);
}
