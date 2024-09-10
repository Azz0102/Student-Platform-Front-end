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
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
export function NoteList() {
    const { data, error, isLoading } = useGetListNoteQuery("2");

    return (
        <div className="flex-col items-center w-1/2 flex">
            <div className="flex p-4 justify-between w-full">
                <div className="flex items-center">
                    <Notebook />
                    <h3 className="pl-2">Note</h3>
                </div>
                <div className="flex">
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-[50px] rounded-lg bg-background pl-8 md:w-[120px] lg:w-[150px]"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        className="p-2"
                        disabled={isLoading || error ? true : false}
                    >
                        <Plus />
                    </Button>
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
                                    className="text-sm text-foreground w-full m-0 justify-start"
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
