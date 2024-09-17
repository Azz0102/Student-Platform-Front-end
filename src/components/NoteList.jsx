import * as React from "react";
import { Search, Notebook, Plus, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetListNoteQuery } from "@/lib/services/note";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "./ui/loading-spinner";

const tags = Array.from({ length: 3 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);
export function NoteList() {
    const { data, error, isLoading } = useGetListNoteQuery("2");

    return (
        <div className="flex w-1/2 flex-col items-center">
            <div className="flex w-full justify-between p-4">
                <div className="flex items-center">
                    <Notebook />
                    <h3 className="pl-2">Note</h3>
                </div>
                <div className="flex">
                    <Button
                        variant="ghost"
                        className="p-2"
                        disabled={isLoading || error ? true : false}
                    >
                        <Plus />
                    </Button>
                </div>
            </div>
            <div className="w-full px-2">
                <div className="relative w-full flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8"
                    />
                </div>
            </div>
            {/* {isLoading && (
                <div className="w-full items-center flex justify-center">
                    <LoadingSpinner />
                </div>
            )}
            {error && (
                <Alert variant="destructive" className="w-5/6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )} */}
            {
                // data &&
                <ScrollArea className="h-[600px] w-full rounded-md">
                    <div className="p-4">
                        {tags.map((tag) => (
                            <>
                                <Button
                                    key={tag}
                                    className="m-0 w-full justify-start text-sm text-foreground"
                                    variant="ghost"
                                >
                                    {tag}
                                </Button>
                                <Separator className="" />
                            </>
                        ))}
                    </div>
                </ScrollArea>
            }
        </div>
    );
}
