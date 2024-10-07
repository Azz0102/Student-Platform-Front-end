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
import { useForgot_passwordMutation, useLoginMutation } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

const SigninSchema = Yup.object().shape({
	name: Yup.string()
		.matches(/^\d{8}$/, "Name must be exactly 8 digits")
		.required("Required"),
	password: Yup.string()
		.min(6, "Must be more than 6 digits")
		.required("Required"),
});

export default function LoginForm() {
	const router = useRouter();
	const [login] = useLoginMutation();
	const [forgot, { isLoading }] = useForgot_passwordMutation();
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
						toast.error("Login Error");
					}
				}}
			>
				{({ isValid, dirty, values, errors, touched, isSubmitting }) => (
					<Form>
						<div className='mb-4 grid gap-2'>
							<Label htmlFor='text'>Name</Label>
							<Field name='name' >
								{({ field }) => (
									<Input {...field} id="name" type="text" placeholder="Enter your name" />
								)}
							</Field>
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
								<Label htmlFor='password'>Password</Label>
								<Link
									href='#'
									className={`ml-auto inline-block text-sm underline ${!touched.name || errors.name || isLoading ? 'pointer-events-none text-gray-400' : ''}`}
									onClick={async (e) => {
										// Kiểm tra nếu tên hợp lệ


										// Nếu hợp lệ, thực hiện fetch API cho quên mật khẩu
										e.preventDefault();
										try {
											const response = await forgot({ name: values.name }).unwrap()

											// Xử lý phản hồi từ API
											if (response.ok) {
												console.log("Forgot password request successful");
											}
										} catch (error) {
											console.error("Error:", error);
										}
									}}
								>
									Forgot your password?
								</Link>

							</div>

							<Field name='password' >
								{({ field }) => (
									<Input {...field} id="password" type="password" placeholder="Enter your password" />
								)}
							</Field>
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
							disabled={!isValid || !dirty || isSubmitting}
						>
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
