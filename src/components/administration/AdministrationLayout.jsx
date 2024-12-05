"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Table from '../Table';
// import dynamic from "next/dynamic";
// const Table = dynamic(() => import("../Table"), { ssr: false });
import {
	Book,
	Building2,
	CalendarClock,
	GraduationCap,
	LibraryBig,
	Newspaper,
	UserPlus,
	Users,
	UsersRound
} from "lucide-react";
import AdministrationContent from "./AdministrationContent";
import AdministrationSideBar from "./AdministrationSideBar";

import { setSelectedContent } from "@/lib/features/adminContentSlice";
import { useDispatch, useSelector } from "react-redux";

const lists = [
	{ id: 0,name: "SinhVien",icon: <Users />,},
	{ id: 1, name: "GiaoVien", icon: <UsersRound /> },
	{ id: 2, name: "PhongHoc", icon: <Building2 /> },
	{ id: 3, name: "TinTuc", icon: <Newspaper /> },
	{ id: 4, name: "Monhoc", icon: <LibraryBig /> },
	{ id: 5, name: "HocPhan", icon: <Book />},
	{ id: 6, name: "BuoiHoc", icon: <CalendarClock />},
	{ id: 7, name: "DiemSo", icon: <GraduationCap /> },
	{ id: 8, name: "GhiDanh", icon: <UserPlus /> },
];

const AdministrationLayout = ({
	defaultLayout = [320, 480],
	defaultCollapsed = false,
	navCollapsedSize,
	search,
	id
}) => {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
	const [isMobile, setIsMobile] = useState(false);
	const { width, height } = useWindowDimensions();
	
	const { t } = useTranslation();
	const selected = useSelector((state) => state.adminContent.selectedContent);
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(setSelectedContent(id));
	},[id,dispatch])

	const [searched, setsearched] = useState(search);

	useEffect(()=>{
		setsearched(search);
	},[search])
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
						variant: id === list.id ? "secondary" : "ghost",
						icon: list.icon,
					}))}
					isCollapsed={isCollapsed || isMobile}
					setsearched={setsearched}
				/>
			</ResizablePanel>

			<ResizableHandle withHandle />

			<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
				<AdministrationContent
					content={
						lists.find((list) => {
							return list.id === id;
						}).name
					}
				>
					{/* <Suspense fallback={<div>Loading...</div>}>
					 </Suspense> */}
						< Table 
							search={searched}
						 />
				</AdministrationContent>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default AdministrationLayout;
