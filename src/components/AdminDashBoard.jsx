"use client";

import * as React from "react";

import { MyCalendar } from "./calendar";
import { NewsCard } from "./NewsCard";
import LineChartDashBoard from "./LineChartDashBoard";

export function AdminDashBoard() {
    return (
        <main className="flex flex-col lg:m-2 lg:flex-row">
            <LineChartDashBoard />
        </main>
    );
}
