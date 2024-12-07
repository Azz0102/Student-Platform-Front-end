import AdminHeader from "@/components/AdminHeader";
import AdminNavBar from "@/components/AdminNavBar";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["setting"];

export default async function Layout({ children, params: { locale } }) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<div vaul-drawer-wrapper='' className='bg-background'>
			<div className='flex min-h-screen w-full flex-col bg-muted/40'>
				<TranslationsProvider
					namespaces={i18nNamespaces}
					locale={locale}
					resources={resources}
				>
					<AdminNavBar />
				</TranslationsProvider>
				<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
					<TranslationsProvider
						namespaces={i18nNamespaces}
						locale={locale}
						resources={resources}
					>
						<AdminHeader />
					</TranslationsProvider>
					<>{children}</>
				</div>
			</div>
		</div>
	);
}
