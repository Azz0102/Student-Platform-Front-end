"use client";

import * as React from "react";
import { Tag } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import MultipleSelector from "@/components/ui/multiple-selector";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import * as commands from "@uiw/react-md-editor/commands";
import { useTheme } from "next-themes";
import { TagList } from "./TagList";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { NoteList } from "./NoteList";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false },
);

const tags = Array.from({ length: 3 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

const OPTIONS = [
    { label: "Nextjs", value: "nextjs" },
    { label: "React", value: "react" },
    { label: "Remix", value: "remix" },
    { label: "Vite", value: "vite" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "Angular", value: "angular" },
    { label: "Ember", value: "ember", disable: true },
    { label: "Gatsby", value: "gatsby", disable: true },
    { label: "Astro", value: "astro" },
];

export function Note() {
    const [value, setValue] = useState("");
    const { width, height } = useWindowDimensions();
    const { theme } = useTheme();

    return (
        <main className="flex flex-col xl:flex-row">
            <div className="block w-full 2xl:w-2/5">
                <div
                    className="flex w-full flex-row"
                    style={{ height: `${height - 90}px` }}
                >
                    <TagList />
                    <NoteList />
                </div>
            </div>
            <div className="my-4 flex w-full flex-col items-center justify-center p-0 2xl:mr-2 2xl:w-3/5">
                <div className="mb-2 w-full">
                    <Input placeholder="Note's title" />
                </div>
                <div className="w-full" data-color-mode={`${theme}`}>
                    <MDEditor
                        value={value}
                        onChange={setValue}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                        textareaProps={{
                            placeholder: "Please enter Markdown text",
                        }}
                        visibleDragbar={false}
                        // height="100%"
                        // minHeight={1000}
                        height={height - 210}
                    />
                </div>
                <div className="mt-1 flex w-full flex-wrap items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="h-6 p-1">
                                <Tag size={20} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add or remove tags</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <MultipleSelector
                                    defaultOptions={OPTIONS}
                                    placeholder="Type something that does not exist in dropdowns..."
                                    creatable
                                    emptyIndicator={
                                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                            no results found.
                                        </p>
                                    }
                                />
                            </div>
                            <DialogFooter className="sm:justify-end">
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {OPTIONS.map((option) => {
                        return (
                            <div className="m-1">
                                <Badge>{option.value}</Badge>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
