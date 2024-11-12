"use client";

import React from 'react'
import Table from "@/components/Table";
import { ExpandableChatHeader } from '../ui/chat/expandable-chat';

const AdministrationContent = ({content,children}) => {
    return (
        <div className='flex h-full w-full flex-col '>
            <>
                <ExpandableChatHeader>
                    <div className='flex items-center gap-5'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{`Quan Ly ${content}`}</span>
                        </div>
                    </div>
                </ExpandableChatHeader>
                {children}
            </>
        </div>
    )
}

export default AdministrationContent