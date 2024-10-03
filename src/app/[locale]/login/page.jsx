"use client"
import React, { createContext } from 'react';
import Cookies from 'js-cookie';

import Image from "next/image"
import Link from "next/link"

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { color } from 'framer-motion';
import { useLoginMutation } from '@/lib/services/login';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

const SigninSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^\d{8}$/, 'Name must be exactly 8 digits')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .required('Required'),
});

export const description =
    "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export default function Dashboard() {

    const router = useRouter()
    const [login, { isError: loginError }] = useLoginMutation()

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <Formik
                            initialValues={{
                                name: '',
                                password: '',
                            }}
                            validationSchema={SigninSchema}
                            onSubmit={async values => {
                                // same shape as initial values
                                console.log(values);

                                const response = await login(values).unwrap();

                                const roleId = jwtDecode(response.metadata.tokens.refreshToken).roleId;
                                Cookies.set('refreshToken', response.metadata.tokens.refreshToken, { expires: 365 })
                                if (roleId === 1) {
                                    router.push("/admin/dashboard")
                                }
                                else {
                                    router.push('/user/dashboard')
                                }

                            }}
                        >
                            {({ errors, touched, isValid, dirty }) => (
                                <Form>
                                    <div className="grid gap-2">
                                        <Label htmlFor="text">Name</Label>
                                        <Field
                                            name="name"
                                            as={Input}
                                        />
                                        <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                                        {/* <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        /> */}
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Link
                                                href="/forgot-password"
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>

                                        <Field
                                            name="password"
                                            as={Input}
                                        />
                                        <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                                        {/* <Input id="password" type="password" required /> */}
                                    </div>
                                    <Button type="submit" className="w-full" disabled={!isValid || !dirty}>
                                        Login
                                    </Button>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
