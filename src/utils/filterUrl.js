import i18nConfig from "@/i18nConfig";

const supportedLocales = i18nConfig.locales; // Add your supported locales here

export function filterUrl(url) {
	const pathSegments = url.split("/").filter(Boolean); // Split and remove empty segments

	// Check if the first segment is a locale and remove it if it is
	if (supportedLocales.includes(pathSegments[0])) {
		pathSegments.shift(); // Remove the first segment if it’s a locale
	}

	// Return the rest of the path as a string
	const filteredPath = `/${pathSegments.join("/")}`;
	return filteredPath; // e.g., /user/dashboard
}
