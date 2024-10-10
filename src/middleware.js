import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
	// Apply i18n routing first to ensure localization works everywhere
	// const i18nResponse = i18nRouter(request, i18nConfig);

	const { pathname } = request.nextUrl;

	// Extract the first segment, which could be the locale
	const segments = pathname.split("/").filter(Boolean); // Filter out empty strings
	let locale = segments[0]; // First part of the URL

	// Check if there is a 'locale' cookie
	const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

	// If the extracted locale is not valid, fallback to the default locale
	if (!i18nConfig.locales.includes(locale)) {
		locale = localeFromCookie || i18nConfig.defaultLocale || "en";
	}

	const refreshToken = request.cookies.get("refreshToken")?.value;

	// Redirect for unauthenticated users (with locale-based path handling)
	if (!refreshToken) {
		// Handle English locale
		if (pathname.includes("reset-password")) {
			return i18nRouter(request, i18nConfig);
		}

		if (!pathname.endsWith("/login")) {
			return NextResponse.redirect(
				new URL(`/${locale}/login`, request.url)
			);
		}
	}

	if (refreshToken) {
		console.log("4");

		const roleId = jwtDecode(refreshToken).roleId;

		if (pathname === "/login") {
			return NextResponse.redirect(
				new URL(`/${locale}/user/dashboard`, request.url)
			);
		}

		if (pathname === `${locale}/login}`) {
			return NextResponse.redirect(
				new URL(`/${locale}/user/dashboard`, request.url)
			);
		}

		if (
			pathname === "/user/dashboard/news" ||
			pathname === "/user/dashboard/class" ||
			pathname === `/${locale}/user/dashboard/news` ||
			pathname === `/${locale}/user/dashboard/class`
		) {
			// Just return and let the user stay on these pages
			return;
		}

		// Handle the case where the user goes to "/"
		if (pathname === "/" || pathname === "/user") {
			const defaultLocale =
				localeFromCookie || i18nConfig.defaultLocale || "en"; // Use locale from cookie or fallback to default locale

			if (roleId === 1) return;
			return NextResponse.redirect(
				new URL(`/${defaultLocale}/user/dashboard`, request.url)
			);
		}

		// Handle the case where the user goes to "/[locale]" or "/[locale]/user"
		if (
			(pathname === `/${locale}/user` || pathname === `/${locale}`) &&
			i18nConfig.locales.includes(locale)
		) {
			if (roleId === 1) return;
			return NextResponse.redirect(
				new URL(`/${locale}/user/dashboard`, request.url)
			);
		}
	}

	// Default i18n routing
	return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
