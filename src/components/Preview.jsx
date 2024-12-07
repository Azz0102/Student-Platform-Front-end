"use client";

import { useProcessor } from "@/hooks/use-processor";

export function Preview({ textValue }) {
	// const Component = useProcessor(textValue);

	return (
		// <div className='prose dark:prose-invert prose-sm prose-headings:font-cal w-full overflow-hidden border border-transparent px-1'>
		// 	{Component}
		// </div>
		<div
        	dangerouslySetInnerHTML={{ __html: textValue }}
      />
	);
}
