"use client";

import React, { useState } from 'react'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Sidebar } from '../ChatSideBar';
import AdministrationSideBar from './AdministrationSideBar';
import AdministrationContent from './AdministrationContent';


const lists= [
    {
        id:0,
        name: "SinhVien",
    },
    { id: 1, name: "GiaoVien" },
    { id: 2, name: "PhongHoc" },
]

const AdministrationLayout = ({
	defaultLayout = [320, 480],
	defaultCollapsed = false,
	navCollapsedSize,
}) => {

    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [isMobile, setIsMobile] = useState(false);
    const { width, height } = useWindowDimensions();
    const [selected, setSelected] = useState(0);

    const { t } = useTranslation();

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
				height: isMobile ? `${height - 58}px` : `${height - 89}px`,
			}}
		>

            <ResizablePanel
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible={true}
				minSize={isMobile ? 13 : 24}
				maxSize={isMobile ? 13 : 30}
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
                    lists={
						lists.map((list) => ({
									id: list.id,
									name: list.name,
									variant:
										selected === list.id
											? "secondary"
											: "ghost",
						}))		
					}
                    setSelected={setSelected}
                />
			</ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <AdministrationContent 
                    content={lists.find((list)=>{
                        return list.id == selected
                    }).name}
                />
			</ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default AdministrationLayout