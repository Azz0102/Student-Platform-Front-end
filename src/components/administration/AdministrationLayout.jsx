"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Table from '../Table';
// import dynamic from "next/dynamic";
// const Table = dynamic(() => import("../Table"), { ssr: false });
import { Sidebar } from "../ChatSideBar";
import AdministrationSideBar from "./AdministrationSideBar";
import AdministrationContent from "./AdministrationContent";
import {
	Building,
	Building2,
	CalendarClock,
	LibraryBig,
	Newspaper,
	Users,
	UsersRound,
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

const lists = [
	{
		id: 0,
		name: "SinhVien",
		icon: <Users />,
	},
	{ id: 1, name: "GiaoVien", icon: <UsersRound /> },
	{ id: 2, name: "PhongHoc", icon: <Building2 /> },
	{ id: 3, name: "TinTuc", icon: <Newspaper /> },
	{ id: 4, name: "BuoiHoc", icon: <CalendarClock /> },
	{ id: 5, name: "Monhoc", icon: <LibraryBig /> },
];

const AdministrationLayout = ({
	defaultLayout = [320, 480],
	defaultCollapsed = false,
	navCollapsedSize,
	// promises,
	search
}) => {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
	const [isMobile, setIsMobile] = useState(false);
	const { width, height } = useWindowDimensions();
	const [selected, setSelected] = useState(0);
	
	const { t } = useTranslation();

	const router = useRouter();
	const searchParams = useSearchParams()
	const paramsObject = Object.fromEntries(searchParams.entries());
	console.log("searchParams",paramsObject)

	useEffect(() => {
		const checkScreenWidth = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		// Initial check
		checkScreenWidth();

		// Event listener for screen width changes
		window.addEventListener("resize", checkScreenWidth);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener("resize", checkScreenWidth);
		};
	}, []);

	return (
		<ResizablePanelGroup
			direction='horizontal'
			onLayout={(sizes) => {
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes
				)}`;
			}}
			className={`w-full items-stretch`}
			style={{
				height: isMobile ? `${height - 58}px` : `${height - 88}px`,
			}}
		>
			<ResizablePanel
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible={true}
				minSize={isMobile ? 13 : 22}
				maxSize={isMobile ? 13 : 22}
				onCollapse={() => {
					setIsCollapsed(true);
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						true
					)}`;
				}}
				onExpand={() => {
					setIsCollapsed(false);
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						false
					)}`;
				}}
				className={cn(
					isCollapsed &&
						"min-w-[50px] transition-all duration-300 ease-in-out md:min-w-[70px]"
				)}
			>
				<AdministrationSideBar
					lists={lists.map((list) => ({
						id: list.id,
						name: list.name,
						variant: selected === list.id ? "secondary" : "ghost",
						icon: list.icon,
					}))}
					isCollapsed={isCollapsed || isMobile}
					setSelected={setSelected}
				/>
			</ResizablePanel>

			<ResizableHandle withHandle />

			<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
				<AdministrationContent
					content={
						lists.find((list) => {
							return list.id == selected;
						}).name
					}
				>
					{/* <Suspense fallback={<div>Loading...</div>}>
					 </Suspense> */}
						< Table 
						// promises={promises}
						search={search}
						 />
				</AdministrationContent>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default AdministrationLayout;
