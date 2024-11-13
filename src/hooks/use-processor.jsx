import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import React, { createElement, useEffect, useState, Fragment } from "react";
import { Mention } from "@/components/Mention";
import { jsx } from "react/jsx-runtime";

export function useProcessor(md) {
	const [content, setContent] = useState(null);
	// console.log("md", md);
	const mentionRegex = /@(\w+)/g;
	const text = md.replace(mentionRegex, '<mention handle="$1">@$1</mention>');

	// console.log("text", text);

	useEffect(() => {
		unified()
			.use(remarkParse)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(rehypeSanitize, {
				...defaultSchema,
				tagNames: [...defaultSchema.tagNames, "mention"],
				attributes: {
					...defaultSchema.attributes,
					mention: ["handle"],
				},
			})
			.use(rehypeReact, {
				createElement: createElement,
				Fragment: Fragment,
				jsx: jsx,
				jsxs: jsx,
				components: {
					mention: Mention,
				},
			})
			.process(text)
			.then((file) => {
				setContent(file.result);
			});
	}, [text]);

	return content;
}
