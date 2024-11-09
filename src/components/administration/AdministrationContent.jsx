"use client";

import React from 'react'
import Table from "@/components/Table";
import { ExpandableChatHeader } from '../ui/chat/expandable-chat';

const AdministrationContent = ({content}) => {
    return (
        <div className='flex h-full w-full flex-col '>
            <>
                <ExpandableChatHeader>
                    <div className='flex items-center gap-5'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{`${content}`}</span>
                        </div>
                    </div>
                </ExpandableChatHeader>
                <Table />
            </>
        </div>
    )
}

export default AdministrationContent