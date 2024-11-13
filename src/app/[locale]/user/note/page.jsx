import initTranslations from "@/app/i18n";
import { Note } from "@/components/Note";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["note"];

export default async function Page({ params: { locale } }) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<div>
				<Note />
			</div>
		</TranslationsProvider>
	);
}
