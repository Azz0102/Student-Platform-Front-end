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

    useEffect(() => {
        const extendedSchema = {
            ...defaultSchema,
            tagNames: [...defaultSchema.tagNames, "mention", "img"], // Cho phép thẻ <img>
            attributes: {
                ...defaultSchema.attributes,
                mention: ["handle"],
                img: [
                    ["src", /^data:image\/[a-z]+;base64,/], // Cho phép chuỗi Base64 trong thuộc tính src
                    "alt",
                    "title",
                    "width",
                    "height",
                ],
            },
        };

        unified()
            .use(remarkParse) // Xử lý Markdown nếu cần
            .use(remarkRehype, { allowDangerousHtml: true }) // Cho phép HTML
            .use(rehypeRaw) // Xử lý HTML thô
            .use(rehypeSanitize, extendedSchema) // Sử dụng cấu hình mở rộng
            .use(rehypeReact, {
                createElement: createElement,
                Fragment: Fragment,
                jsx: jsx,
                jsxs: jsx,
                components: {
                    mention: Mention,
                },
            })
            .process(md) // Xử lý chuỗi HTML/Markdown
            .then((file) => {
                setContent(file.result);
            });
    }, [md]);

    return content;
}
