
import React from 'react'
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AdministrationSideBar = ({lists,setSelected}) => {
    return (
        <div
			className='group relative flex h-full flex-col gap-4 bg-muted/10 p-2 data-[collapsed=true]:p-2 dark:bg-muted/20'
		>
            
            <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
				{lists.map((list, index) =>
                    <Link
                        key={index}
                        href='/'
                        className={cn(
                            buttonVariants({
                                variant: list.variant,
                                size: "xl",
                            }),
                            list.variant === "secondary" &&
                                "shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "h-16 justify-start gap-4 px-5"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelected(list.id);
                        }}
                    >
                        <div className='flex max-w-28 flex-col'>
                            <span>{`${list.id+1}. ${list.name}`}</span>
                            
                        </div>
                    </Link>
				)}
			</nav>

        </div>
    )
}

export default AdministrationSideBar