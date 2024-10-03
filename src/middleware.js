import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
	const { pathname } = request.nextUrl;

	// Extract the first segment, which could be the locale
	const segments = pathname.split("/").filter(Boolean); // Filter out empty strings
	const locale = segments[0]; // First part of the URL

	// Check if there is a 'locale' cookie
	const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

	console.log("Huy");


	// const refreshToken = request.cookies.get("refreshToken")?.value;


	// if (!refreshToken) {
	// 	const url = request.nextUrl.clone();
	// 	url.pathname = `/login`;
	// 	return NextResponse.redirect(url);
	// } else 
	{
		// const roleId = jwtDecode(refreshToken).roleId;


		// Handle the case where the user goes to "/"
		if (
			pathname === "/" ||
			pathname === "/user" ||
			pathname === "/user/dashboard/news" ||
			pathname === "/user/dashboard/class"
		) {
			const defaultLocale =
				localeFromCookie || i18nConfig.defaultLocale || "en"; // Use locale from cookie or fallback to default locale
			const url = request.nextUrl.clone();
			url.pathname = `/${defaultLocale}/user/dashboard`;
			// if (roleId === 1) return;
			return NextResponse.redirect(url);
		}

		// Handle the case where the user goes to "/[locale]" or "/[locale]/user"
		if (
			(pathname === `/${locale}/user` ||
				pathname === `/${locale}` ||
				pathname === `/${locale}/user/dashboard/news` ||
				pathname === `/${locale}/user/dashboard/class`) &&
			i18nConfig.locales.includes(locale)
		) {
			const url = request.nextUrl.clone();
			url.pathname = `/${locale}/user/dashboard`;
			// if (roleId === 1) return;
			return NextResponse.redirect(url);
		}
	}


	// Default i18n routing
	return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
