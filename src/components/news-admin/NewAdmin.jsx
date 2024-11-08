"use client";

import React, { useState } from 'react'
import Minimal from '../Minimal'
import { TagList } from '../TagList'
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
import { Button } from '../ui/button'

const NewAdmin = () => {
    const [value, setValue] = useState('');


    return (
        <Credenza>
          <CredenzaTrigger asChild>
            <Button>Open modal</Button>
          </CredenzaTrigger>
          <CredenzaContent className="max-w-5xl h-5/6">
            <CredenzaHeader>
              <CredenzaTitle>Credenza</CredenzaTitle>
              <CredenzaDescription>
                A responsive modal component for shadcn/ui.
              </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody>
              <Minimal />
            </CredenzaBody>
            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button>Close</Button>
              </CredenzaClose>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
    )
}

export default NewAdmin