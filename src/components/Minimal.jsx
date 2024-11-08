"use client";

import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useState } from 'react';

const Minimal = () => {
    const [value, setValue] = useState('');
    
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
		</div>
    )
}

export default Minimal