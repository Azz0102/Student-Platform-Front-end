"use client";

import { useProcessor } from "@/hooks/use-processor";

export function Preview({ textValue }) {
	const Component = useProcessor(textValue);
	return (
		<div className='prose dark:prose-invert prose-sm prose-headings:font-cal w-full overflow-auto border border-transparent px-1'>
			{Component}
		</div>
	);
}
