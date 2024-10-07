"use client";

import Image from "next/image";

import { useWindowDimensions } from "@/hooks/useWindowDimension";
import vercel from "/public/android-chrome-512x512.png";
import { ModeToggle } from "@/components/mode-toggle";
import LoginForm from "@/components/LoginForm";
import LanguageToggle from "@/components/LanguageToggle";

export default function Login() {
	const { height } = useWindowDimensions();
	return (
		<div
			className='flex w-full items-center justify-center'
			style={{ height: `${height}px` }}
		>
			<div
				className='flex w-full flex-col items-center justify-center lg:w-1/2'
				style={{ height: `${height}px` }}
			>
				<div className='m-2 flex w-1/2 self-end lg:w-full sm:justify-end'>
					<LanguageToggle />
				</div>
				<div className='m-4 flex w-3/4 grow flex-col justify-center lg:w-[350px]'>
					<div className='grid gap-2 text-center'>
						<h1 className='text-3xl font-bold'>Login</h1>
					</div>
					<LoginForm />
				</div>
				<div className='m-2 flex self-end lg:w-full lg:justify-end'>
					<ModeToggle />
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
	);
}
