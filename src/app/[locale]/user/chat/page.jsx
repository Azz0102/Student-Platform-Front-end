import UserChat from "@/components/UserChat";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";

const i18nNamespaces = ["chat"];

export default async function Page({ params: { locale } }) {
	const { resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<div>
				<UserChat />
			</div>
		</TranslationsProvider>
	);
}
