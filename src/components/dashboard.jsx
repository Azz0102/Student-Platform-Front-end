"use client";

import * as React from "react";

import { MyCalendar } from "./calendar";
import { NewsCard } from "./NewsCard";
import { useGetcalenderQuery } from "@/lib/services/calender";
import { useDeepCompareEffect } from "use-deep-compare";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function Dashboard() {

    return (
        <main className="flex flex-col lg:m-2 lg:flex-row">
            <div className="block w-full lg:w-3/5">
                <MyCalendar />
            </div>
            <div className="my-2 ml-2 flex w-full flex-col items-center justify-center p-0 lg:w-2/5">
                <NewsCard />
            </div>
        </main>
    );
}
