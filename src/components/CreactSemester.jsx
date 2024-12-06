"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

import { Input01, Input40 } from "@/components/Input"
import { Credenza, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSelector } from "react-redux"
import { toast } from "sonner"

const Form0 = ({ form, onSubmit, isUpdatePending }) => {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên Học Kỳ</FormLabel>
                            <FormControl>
                                <Input01
                                    placeholder="Do a kickflip"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fromDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ngày Bắt Đầu</FormLabel>
                            <FormControl>
                                <Input40
                                    placeholder="Do a kickflip"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ngày Kết Thúc</FormLabel>
                            <FormControl>
                                <Input40
                                    placeholder="Do a kickflip"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                    <CredenzaClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </CredenzaClose>
                    <Button disabled={isUpdatePending}>
                        {isUpdatePending && (
                            <Icons.spinner
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        Save
                    </Button>
                </CredenzaFooter>
            </form>
        </Form>
    );
}
export function CreactSemester({refetchSemester}) {
    const [isUpdatePending, startUpdateTransition] = useTransition()
    const [isOpen, setIsOpen] = useState(false);
    const selected = useSelector((state) => state.adminContent.selectedContent);
    const form = useForm({
    })

    function onSubmit(input) {
        console.log("input", input)
          startUpdateTransition(async () => {
            const response = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/semester`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            });

            const {metadata} = await response.json();

            console.log("metadata",metadata)
            refetchSemester();
            if ( typeof metadata == "string") {
              toast.error(metadata)
              return
            }
            setIsOpen(false);
            form.reset()
            toast.success("Creacted!");
          })
    }

    return (
        <Credenza open={isOpen} onOpenChange={setIsOpen}>
            <CredenzaTrigger onClick={() => setIsOpen(true)}>
                Thêm Học Kỳ
            </CredenzaTrigger>
            <CredenzaContent className="flex flex-col gap-6 sm:max-w-md">
                <CredenzaHeader className="text-left">
                    <CredenzaDescription>
                        Create item and save.
                    </CredenzaDescription>
                    <CredenzaTitle>Thêm Học Kỳ</CredenzaTitle>
                </CredenzaHeader>
                <ScrollArea className="max-h-96 rounded-md overflow-auto ">
                    <Form0 form={form} onSubmit={onSubmit} isUpdatePending={isUpdatePending} />
                </ScrollArea>
            </CredenzaContent>
        </Credenza>
    )
}
