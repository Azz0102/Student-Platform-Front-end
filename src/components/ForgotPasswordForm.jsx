"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jwtDecode } from "jwt-decode";
import * as Yup from "yup";
import { toast } from "sonner";
import {
	useLoginMutation,
	useReset_passwordMutation,
} from "@/lib/services/auth";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { PasswordInput } from "./PasswordInput";

export default function ForgotPasswordForm() {
	const router = useRouter();
	const pathName = usePathname();
	const [reset] = useReset_passwordMutation();
	const { t } = useTranslation();

	const SigninSchema = Yup.object().shape({
		newPassword: Yup.string()
			.min(6, t("forgot-password:mustBeMoreThan6Digits"))
			.required(t("forgot-password:required")),
		confirmPassword: Yup.string()
			.oneOf(
				[Yup.ref("newPassword"), null],
				t("forgot-password:passwordsMustMatch")
			)
			.required(t("forgot-password:required")),
	});

	return (
		<div className='grid gap-4'>
			<Formik
				initialValues={{
					newPassword: "",
					confirmPassword: "",
				}}
				validationSchema={SigninSchema}
				onSubmit={async (values) => {
					// same shape as initial values
					console.log(values);

					try {
						const segments = pathName.split("/").filter(Boolean); // Filter out empty strings
						let resetToken = segments[segments.length - 1];
						const response = await reset({
							resetToken,
							newPassword: values.confirmPassword,
						}).unwrap();

						router.push("/login");
					} catch (error) {
						toast.error(t("forgot-password:resetPasswordError"));
					}
				}}
			>
				{({ isValid, dirty, isSubmitting }) => (
					<Form>
						<div className='mb-4 grid gap-2'>
							<Label htmlFor='password'>
								{t("forgot-password:newPassword")}
							</Label>
							<Field name='newPassword'>
								{({ field }) => (
									<PasswordInput
										{...field}
										id='newPassword'
										// type='password'
										placeholder={t(
											"forgot-password:enterYourNewPassword"
										)}
									/>
								)}
							</Field>
							<ErrorMessage
								name='newPassword'
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
									{t("forgot-password:confirmPassword")}
								</Label>
							</div>

							<Field name='confirmPassword'>
								{({ field }) => (
									<PasswordInput
										{...field}
										id='confirmPassword'
										// type='password'
										placeholder={t(
											"forgot-password:enterYourConfirmPassword"
										)}
									/>
								)}
							</Field>
							<ErrorMessage
								name='confirmPassword'
								component='div'
								style={{ color: "red" }}
							/>
							{/* <Input id="password" type="password" required /> */}
						</div>
						<Button
							type='submit'
							className='w-full'
							disabled={!isValid || !dirty || isSubmitting}
						>
							{t("forgot-password:submit")}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
