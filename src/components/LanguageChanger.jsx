"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
export default function LanguageChanger() {
	const { i18n, t } = useTranslation();
	const currentLocale = i18n.language;
	const router = useRouter();
	const currentPathname = usePathname();

	const handleChange = (newLocale) => {
		// Use newLocale directly since it comes from the Select component
		// set cookie for next-i18n-router
		console.log(currentLocale);
		const days = 30;
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = date.toUTCString();
		document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

		// redirect to the new locale path
		if (
			currentLocale === i18nConfig.defaultLocale &&
			!i18nConfig.prefixDefault
		) {
			router.push("/" + newLocale + currentPathname);
		} else {
			router.push(
				currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
			);
		}

		router.refresh();
	};

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
					<Select onValueChange={handleChange}>
						<SelectTrigger className='w-full sm:w-[180px]'>
							<SelectValue
								placeholder={
									currentLocale === "en"
										? t("english")
										: t("vietnamese")
								}
							/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='en'>{t("english")}</SelectItem>
							<SelectItem value='vn'>
								{t("vietnamese")}
							</SelectItem>
						</SelectContent>
					</Select>
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
