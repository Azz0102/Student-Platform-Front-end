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
import { useTranslation } from "react-i18next";
export default function LanguageChanger() {
	const { t } = useTranslation();

	return (
		<>
			<h1 className='mb-6 ml-2 text-2xl font-bold'>{t("settings")}</h1>
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Globe className='h-5 w-5' />
						{t("language")}
					</CardTitle>
					<CardDescription>
						{t("chooseYourPreferredLanguageForTheInterface")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<LanguageToggle />
					<p className='mt-4 text-sm text-muted-foreground'>
						{t(
							"thisSettingWillChangeTheLanguageOfTheUserInterface"
						)}
					</p>
				</CardContent>
			</Card>
		</>
	);
}
