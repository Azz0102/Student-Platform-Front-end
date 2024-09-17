import * as React from "react";
import { Tag, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useGetListTagQuery } from "@/lib/services/tag";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "./ui/loading-spinner";

const tags = Array.from({ length: 3 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
export function TagList() {
    const { data, error, isLoading } = useGetListTagQuery("2");

    return (
        <div className="flex-col items-center w-1/2 border-r-foreground border-r-2 flex">
            <div className="flex p-4 justify-between w-full">
                <div className="flex items-center p-2 pb-12">
                    <Tag />
                    <h3 className="pl-2">Tag</h3>
                </div>
            </div>
            {/* {isLoading && (
                <div className="w-full items-center flex justify-center">
                    <LoadingSpinner />
                </div>
            )}
            {error && (
                <Alert variant="destructive" className='w-5/6'>
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
