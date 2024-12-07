"use client";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";

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
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "react-i18next";
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

export default function BarChartHorizontalTeacher({ chartData }) {
	const { t } = useTranslation();

	const chartConfig = {
		desktop: {
			label: t("admin.hour"),
			color: "hsl(var(--chart-1))",
		},
		mobile: {
			label: "Mobile",
			color: "hsl(var(--chart-2))",
		},
		label: {
			color: "hsl(var(--background))",
		},
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("admin.top6TeachersWhoTeachTheMost")}</CardTitle>
				<CardDescription>{t("admin.calculatedByHour")}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout='vertical'
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey='month'
							type='category'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							hide
						/>
						<XAxis dataKey='desktop' type='number' hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>
						<Bar
							dataKey='desktop'
							layout='vertical'
							fill='var(--color-desktop)'
							radius={4}
						>
							<LabelList
								dataKey='month'
								position='insideLeft'
								offset={8}
								className='fill-[--color-label]'
								fontSize={12}
							/>
							<LabelList
								dataKey='desktop'
								position='right'
								offset={8}
								className='fill-foreground'
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
