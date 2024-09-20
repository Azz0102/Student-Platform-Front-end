import i18nConfig from "@/i18nConfig";

const supportedLocales = i18nConfig.locales; // Add your supported locales here

export function filterUrl(url) {
	const pathSegments = url.split("/").filter(Boolean); // Split and remove empty segments

	// Check if the first segment is a locale and remove it if it is
	if (supportedLocales.includes(pathSegments[0])) {
		pathSegments.shift(); // Remove the first segment if it’s a locale
	}

	// Slice the first two elements after filtering out the locale
	const firstTwoSegments = pathSegments.slice(0, 2);

	// Return the filtered path containing only the first two segments
	const filteredPath = `/${firstTwoSegments.join("/")}`;
	return filteredPath; // e.g., /user/dashboard
}
