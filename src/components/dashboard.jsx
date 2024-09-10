"use client";

import * as React from "react";

import { MyCalendar } from "./calendar";
import { NewsCard } from "./NewsCard";

export function Dashboard() {
    return (
        <main className="flex flex-col lg:flex-row lg:m-2">
            <div className="block w-full lg:w-3/5">
                <MyCalendar />
            </div>
            <div className="w-full flex-col flex items-center justify-center my-2 p-0 lg:w-2/5">
                <NewsCard />
            </div>
        </main>
    );
}
