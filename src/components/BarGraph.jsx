"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

// const chartData = [
// 	{ date: "Phong1", frequency: 222, time: 150 },
// 	{ date: "Phong2", frequency: 97, time: 180 },
// 	{ date: "Phong3", frequency: 167, time: 120 },
// ]

const chartConfig = {
	frequency: {
		label: "Tần suất sử dụng",
		color: "hsl(var(--chart-1))",
	},
	time: {
		label: "Thời gian sử dụng",
		color: "hsl(var(--chart-2))",
	},
};

export default function BarGraph({ chartData }) {
	const [activeChart, setActiveChart] = React.useState("frequency");

	const total = React.useMemo(
		() => ({
			frequency: chartData.reduce((acc, curr) => acc + curr.frequency, 0),
			time: chartData.reduce((acc, curr) => acc + Number(curr.time), 0),
		}),
		[chartData]
	);

	return (
		<Card>
			<CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
				<div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
					<CardTitle>Phòng học</CardTitle>
					<CardDescription>
						Dữ liệu phòng học theo khoảng thời gian.
					</CardDescription>
				</div>
				<div className='flex'>
					{["frequency", "time"].map((key) => {
						const chart = key;
						return (
							<button
								key={chart}
								data-active={activeChart === chart}
								className='relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
								onClick={() => setActiveChart(chart)}
							>
								<span className='text-xs text-muted-foreground'>
									{chartConfig[chart].label}
								</span>
								<span className='text-lg font-bold leading-none sm:text-3xl'>
									{total[key].toLocaleString()}
								</span>
							</button>
						);
					})}
				</div>
			</CardHeader>
			<CardContent className='px-2 sm:p-6'>
				<ChartContainer
					config={chartConfig}
					className='aspect-auto h-[480px] w-full'
				>

					<div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
						<ResponsiveContainer width={150 * chartData.length} height={490}>
							<BarChart
								accessibilityLayer
								data={chartData}
								margin={{
									left: 12,
									right: 12,
								}}
							>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey='date'
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									minTickGap={32}
									tickFormatter={(value) => {
										return value;
									}}
									interval={0}
								/>
								<ChartTooltip
									content={
										<ChartTooltipContent
											className='w-40'
											nameKey={activeChart}
											labelFormatter={(value) => {
												return value;
											}}

										/>
									}
								/>
								<Bar
									dataKey={activeChart}
									fill={`var(--color-${activeChart})`}
									radius={8}
								// barSize={300}
								// barCategoryGap="20%"
								// barGap={10}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
