
import initTranslations from "@/app/i18n";
import ForgotPassword from "@/components/ForgotPassword";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["setting"];

export default async function Dashboard({ params: { locale } }) {
	const { resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<ForgotPassword />
		</TranslationsProvider>
	);
}
