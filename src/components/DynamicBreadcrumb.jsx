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

export function DynamicBreadcrumb() {
    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {pathNames.map((link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join("/")}`;
                    let itemClasses = paths === href;
                    let itemLink = link[0].toUpperCase() + link.slice(1);

                    return (
                        <>
                            {!itemClasses ? (
                                <>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href={href}>{itemLink}</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </>
                            ) : (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{itemLink}</BreadcrumbPage>
                                </BreadcrumbItem>
                            )}
                        </>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
