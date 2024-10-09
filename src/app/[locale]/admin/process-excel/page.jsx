"use client";
import { handleFileUpload } from "@/utils/convertExcel";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function Page() {
    const [excelData, setExcelData] = useState([]);

    const handleFile = async (event) => {
        const data = await handleFileUpload(event);
        setExcelData(data);
        console.log(data);
    };

    return (
        <div>
            <h2>Upload Excel file</h2>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFile}
            />

            <h3>Data from Excel:</h3>
            <table>
                <thead>
                    <tr>
                        {excelData.length > 0 &&
                            Object.keys(excelData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {excelData.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}