"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";

export default function LanguageToggle() {
	const { i18n, t } = useTranslation();
	const currentLocale = i18n.language;
	const router = useRouter();
	const currentPathname = usePathname();

	const handleChange = (newLocale) => {
		// Use newLocale directly since it comes from the Select component
		// set cookie for next-i18n-router
		console.log(6);

		Cookies.set("NEXT_LOCALE", newLocale, { expires: 30, path: "/" });

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
					<SelectItem value='vn'>{t("vietnamese")}</SelectItem>
				</SelectContent>
			</Select>
		</>
	);
}
