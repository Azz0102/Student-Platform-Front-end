"use client";

import React from "react";
import Papa from "papaparse";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const createCsv = [
	"admin/sign-up-multiple",
	"teacher/multiple",
	"classroom/bulk",
	"",
	"subject/bulk",
	"class-session/bulk",
	"",
	"grade/bulk",
	"user_session_details/bulk",
];

export default function CsvUpLoadFile({setIsOpen,onOpenChange}) {
	const { t } = useTranslation();
	const selected = useSelector((state) => state.adminContent.selectedContent);

	const handleFileUpload = (file) => {
		const reader = new FileReader();

		reader.onload = async (event) => {
			const csvData = event.target.result;

			// Parse CSV to JSON
			const parsedData = Papa.parse(csvData, {
				header: true,
				skipEmptyLines: true,
			});
			const dataObject = parsedData.data;

			console.log("ParsedData:", dataObject);
			try {
				const response = await axios.post(
					`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/${createCsv[selected]}`,
					dataObject,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				setIsOpen(false);
				onOpenChange?.(false);
				toast.success(t("success"));
			} catch (error) {
				toast.error(t("fail"));
			}
		};

		reader.readAsText(file);
	};

	const handleClick = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".csv";
		input.style.display = "none";

		input.onchange = (event) => {
			const target = event.target;
			if (target.files && target.files[0]) {
				const file = target.files[0];
				handleFileUpload(file);
			}
		};

		document.body.appendChild(input);
		input.click();
		document.body.removeChild(input);
	};

	return (
		<Button
			variant='outline'
			size='sm'
			className='mx-1 gap-2'
			onClick={handleClick}
		>
			{t("importCSVFile")}
		</Button>
	);
}
