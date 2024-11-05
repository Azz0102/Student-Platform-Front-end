"use client";

import Table from "@/components/Table";
import { TooltipProvider } from '@/components/ui/tooltip';
import { useState } from 'react'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'

export default function Page() {
	const [value, setValue] = useState('')
	return (
		<div>
			<TooltipProvider>
				<MinimalTiptapEditor
					value={value}
					onChange={setValue}
					className="w-full"
					editorContentClassName="p-5"
					output="html"
					placeholder="Type your description here..."
					autofocus={true}
					editable={true}
					editorClassName="focus:outline-none"
				/>
    		</TooltipProvider>
			{/* <Table /> */}
		</div>
	);
}
