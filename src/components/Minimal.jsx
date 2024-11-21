"use client";

import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { TooltipProvider } from '@/components/ui/tooltip';
import React, { useState } from 'react'
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
  } from "@/components/ui/credenza"
import { Button } from './ui/button';

const Minimal = React.forwardRef(({ className, ...props }, ref) =>  {
    const [value, setValue] = useState(props.value);
    
    return (
		<Credenza>
          <CredenzaTrigger asChild>
            <Button>Edit Content Event.</Button>
          </CredenzaTrigger>
          <CredenzaContent className="max-w-5xl h-5/6">
            <CredenzaHeader>
              <CredenzaTitle>Content Event</CredenzaTitle>
              <CredenzaDescription>
                Edit Content Event.
              </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody>
				<TooltipProvider>
					<MinimalTiptapEditor
						ref={ref}
						value={value}
						onChange={(event)=>{
							setValue(event);
							props.onChange(event);
						}}
						className="w-full"
						editorContentClassName="p-5"
						output="html"
						placeholder="Type your description here..."
						autofocus={true}
						editable={true}
						editorClassName="focus:outline-none"
					/>
				</TooltipProvider>
            </CredenzaBody>
            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button>Save</Button>
              </CredenzaClose>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
    )
}
)

Minimal.displayName = "Minimal"

export default Minimal