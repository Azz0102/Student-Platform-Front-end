"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Globe } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
export default function LanguageChanger() {
	return (
		<>
			<h1 className='mb-6 ml-2 text-2xl font-bold'>Settings</h1>
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Globe className='h-5 w-5' />
						Language
					</CardTitle>
					<CardDescription>
						Choose your preferred language for the interface
					</CardDescription>
				</CardHeader>
				<CardContent>
					<LanguageToggle />
					<p className='mt-4 text-sm text-muted-foreground'>
						This setting will change the language of the user
						interface. Your content will remain in its original
						language.
					</p>
				</CardContent>
			</Card>
		</>
	);
}
