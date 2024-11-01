"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation, withTranslation } from "react-i18next";

function ModeToggle() {
	const [mounted, setMounted] = useState(false);
	const { setTheme } = useTheme();
	const { t } = useTranslation();
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>{t("toggleTheme")}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() => {
						console.log("light");
						setTheme("light");
					}}
				>
					{t("light")}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						console.log("dark");
						setTheme("dark");
					}}
				>
					{t("dark")}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					{t("system")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default withTranslation("setting")(ModeToggle);
