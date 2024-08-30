import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/components/store-provider";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export function generateStaticParams() {
    return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
    return (
        <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
            <body className={inter.className}>
                <StoreProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
