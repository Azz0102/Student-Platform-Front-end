import LanguageChanger from "@/components/LanguageChanger";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["setting"];

export default async function Page({ params: { locale } }) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<div className='mx-auto w-full p-4'>
				<LanguageChanger />
			</div>
		</TranslationsProvider>
	);
}
