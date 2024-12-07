"use client";

import * as React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import i18nConfig from "@/i18nConfig";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";

// Assuming you have a predefined list of supported locales
const supportedLocales = i18nConfig.locales; // Add your supported locales here

export function DynamicBreadcrumb() {
	const { t } = useTranslation();
	const paths = usePathname();
	// Split the pathname and filter out the locale
	const pathNames = paths
		.split("/")
		.filter((path) => path && !supportedLocales.includes(path)); // Remove locale if present
	return (
		<Breadcrumb className='hidden md:flex'>
			<BreadcrumbList>
				{pathNames.map((link, index) => {
					let href = `/${pathNames.slice(0, index + 1).join("/")}`;

					let itemLink = link;
					// let itemLink = link[0].toUpperCase() + link.slice(1);

					// Check if it's the last item in the array
					const isLastItem = index === pathNames.length - 1;

					return (
						<Fragment key={index}>
							{!isLastItem ? (
								<>
									<BreadcrumbItem key={index}>
										<BreadcrumbLink asChild>
											<Link href={href}>
												{t(`${itemLink}`)}
											</Link>
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</>
							) : (
								<BreadcrumbItem key={index}>
									<BreadcrumbPage>
										{t(`${itemLink}`)}
									</BreadcrumbPage>
								</BreadcrumbItem>
							)}
						</Fragment>
						
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
