"use client";

import React from "react";
import Papa from "papaparse";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const createCsv = [
    'admin/sign-up-multiple',
    'teacher/multiple',
    'classroom/bulk',
    '',
    'subject/bulk',
    'class-session/bulk',
    '',
    'grade/bulk',
    'user_session_details/bulk'
]

export default function CsvUpLoadFile() {

    const selected = useSelector((state) => state.adminContent.selectedContent);

	const handleFileUpload = (file) => {
		const reader = new FileReader();

		reader.onload = async (event) => {
			const csvData = event.target.result;

			// Parse CSV to JSON
			const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true });
			const dataObject = parsedData.data;

			console.log("ParsedData:", dataObject);
			try {
				const response = await axios.post(`https://localhost:3001/api/${createCsv[selected]}`, dataObject, {
					headers: {
						"Content-Type": "application/json",
					},
				});
				toast.success("Thành công")
			} catch (error) {
				toast.error("Thất Bại")
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
			variant="outline"
			size="sm"
			className="gap-2"
			onClick={handleClick}
		>
			Import CSV file
		</Button>
	);
}
