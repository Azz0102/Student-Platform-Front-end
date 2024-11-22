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
	useForgot_passwordMutation,
	useLoginMutation,
} from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import { useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PasswordInput } from "./PasswordInput";

export default function LoginForm() {
	const router = useRouter();
	const [login] = useLoginMutation();
	const [forgot, { isLoading }] = useForgot_passwordMutation();
	const { t } = useTranslation();

	const SigninSchema = Yup.object().shape({
		name: Yup.string()
			.matches(/^\d{8}$/, t("login:nameMustBeExactly8Digits"))
			.required(t("login:required")),
		password: Yup.string()
			.min(6, t("login:mustBeMoreThan6Digits"))
			.required(t("login:required")),
	});
	return (
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
						const response = await login(values).unwrap();

						const roleId = jwtDecode(
							response.metadata.tokens.refreshToken
						).roleId;
						Cookies.set(
							"refreshToken",
							response.metadata.tokens.refreshToken,
							{ expires: 365 }
						);
						if (roleId === 1) {
							router.push("/admin/dashboard");
						} else {
							router.push("/user/dashboard");
						}
					} catch (error) {
						toast.error(t("login:loginError"));
					}
				}}
			>
				{({
					isValid,
					dirty,
					values,
					errors,
					touched,
					isSubmitting,
				}) => (
					<Form>
						<div className='mb-4 grid gap-2'>
							<Label htmlFor='text'>{t("login:name")}</Label>
							<Field name='name'>
								{({ field }) => (
									<Input
										{...field}
										id='name'
										type='text'
										placeholder={t("login:enterYourName")}
									/>
								)}
							</Field>
							<ErrorMessage
								name='name'
								component='p'
								className='text-xs text-destructive'
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
									{t("login:password")}
								</Label>
								<Link
									href='#'
									className={`ml-auto inline-block text-sm underline ${!touched.name || errors.name || isLoading ? "pointer-events-none text-gray-400" : ""}`}
									onClick={async (e) => {
										// Kiểm tra nếu tên hợp lệ

										// Nếu hợp lệ, thực hiện fetch API cho quên mật khẩu
										e.preventDefault();
										try {
											const response = await forgot({
												name: values.name,
											}).unwrap();

											// Xử lý phản hồi từ API
											if (response.ok) {
												console.log(
													"Forgot password request successful"
												);
											}
										} catch (error) {
											console.error("Error:", error);
										}
									}}
								>
									{t("login:forgotYourPassword")}
								</Link>
							</div>

							<Field name='password'>
								{({ field }) => (
									// <Input
									// 	{...field}
									// 	id='password'
									// 	type='password'
									// 	placeholder={t(
									// 		"login:enterYourPassword"
									// 	)}
									// />
									<PasswordInput
										{...field}
										id='password'
										// type='password'
										placeholder={t(
											"login:enterYourPassword"
										)}
									/>
								)}
							</Field>
							<ErrorMessage
								name='password'
								component='p'
								className='text-xs text-destructive'
							/>
							{/* <Input id="password" type="password" required /> */}
						</div>
						<Button
							type='submit'
							className='w-full'
							disabled={!isValid || !dirty || isSubmitting}
						>
							{t("login:login")}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
