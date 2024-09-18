import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { MyCalendar } from "@/components/calendar";

const i18nNamespaces = ["home"];

export default async function Home({ params: { locale } }) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<MyCalendar />
		</TranslationsProvider>
	);
}
