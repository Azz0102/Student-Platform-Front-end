import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Extract the first segment, which could be the locale
    const segments = pathname.split("/").filter(Boolean); // Filter out empty strings
    const locale = segments[0]; // First part of the URL

    // Check if there is a 'locale' cookie
    const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

    // Handle the case where the user goes to "/"
    if (pathname === "/" || pathname === "/user") {
        const defaultLocale =
            localeFromCookie || i18nConfig.defaultLocale || "en"; // Use locale from cookie or fallback to default locale
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}/user/dashboard`;
        return NextResponse.redirect(url);
    }

    // Handle the case where the user goes to "/[locale]" or "/[locale]/user"
    if (
        (pathname === `/${locale}/user` || pathname === `/${locale}`) &&
        i18nConfig.locales.includes(locale)
    ) {
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}/user/dashboard`;
        return NextResponse.redirect(url);
    }

    // Default i18n routing
    return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
