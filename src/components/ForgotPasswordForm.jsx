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
import { useLoginMutation, useReset_passwordMutation } from "@/lib/services/auth";
import { useRouter, usePathname } from "next/navigation";


const SigninSchema = Yup.object().shape({
	newPassword: Yup.string()
		.min(6, "Must be more than 6 digits")
		.required("Required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword'), null], "Passwords must match")
		.required("Required"),
});


export default function ForgotPasswordForm() {
	const router = useRouter();
	const pathName = usePathname()
	const [reset] = useReset_passwordMutation();
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
						const response = await reset({ resetToken, newPassword: values.confirmPassword }).unwrap();

						router.push("/login");
					} catch (error) {
						toast.error("Login Error");
					}
				}}
			>
				{({ isValid, dirty, isSubmitting }) => (
					<Form>
						<div className='mb-4 grid gap-2'>
							<Label htmlFor='password'>NewPassword</Label>
							<Field name='newPassword'>
								{({ field }) => (
									<Input {...field} id="newPassword" type="password" placeholder="Enter your newPassword" />
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
								<Label htmlFor='password'>ConfirmPassword</Label>

							</div>

							<Field name='confirmPassword'>
								{({ field }) => (
									<Input {...field} id="confirmPassword" type="password" placeholder="Enter your confirmPassword" />
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
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
