import { Inter } from "next/font/google";
import "./globals.css";
import "../../styles/darkThemeCalendar.scss";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/components/store-provider";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import { Toaster } from "@/components/ui/sonner";
import { notFound } from "next/navigation";
const inter = Inter({ subsets: ["latin", "vietnamese"] });
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
	if (!i18nConfig.locales.includes(locale)) {
		notFound();
	}
	return (
		<html lang={locale} dir={dir(locale)} suppressHydrationWarning>
			<body className={inter.className}>
				<StoreProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<Toaster closeButton richColors />
						<NuqsAdapter>{children}</NuqsAdapter>
					</ThemeProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
