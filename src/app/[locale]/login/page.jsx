import React from "react";

import TranslationsProvider from "@/components/TranslationsProvider";
import Login from "@/components/Login";
import initTranslations from "@/app/i18n";

const i18nNamespaces = ["setting"];

export default async function Dashboard({ params: { locale } }) {
	const { resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<Login />
		</TranslationsProvider>
	);
}
