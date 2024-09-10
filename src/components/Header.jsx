"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LineChart, Package2, PanelLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import favicon from "../app/[locale]/favicon.ico";
import { ModeToggle } from "./mode-toggle";
import { NotiToggle } from "./notification-toggle";
import { DynamicBreadcrumb } from "./DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import links from "@/constants/Links";
import { usePathname } from "next/navigation";

export function Header() {
    const pathName = usePathname();

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        {links.map((link) => {
                            return (
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-4 px-2.5  ${
                                        pathName === link.href
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {link.icon}
                                    {link.title}
                                </Link>
                            );
                        })}
                        <Link
                            href="/user/settings"
                            className={`flex items-center gap-4 px-2.5 ${
                                pathName === "/user/settings"
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <LineChart className="h-5 w-5" />
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <DynamicBreadcrumb />
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
            <NotiToggle />
            <ModeToggle />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Image
                            src={favicon}
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
