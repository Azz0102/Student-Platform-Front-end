"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { X, UploadCloud, File } from "lucide-react";
import { useTranslation } from "react-i18next";

const FILE_TYPES = [
	"sessionDetails",
	"classrooms",
	"constantSessionsFixedTimeLocation",
	"constantSessionsFixedLocation",
	"constantSessionsFixedTime",
	"noConflictingClassSessions",
];

export const ImageUpload = ({ setData }) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [filesToUpload, setFilesToUpload] = useState([]);
	const { t } = useTranslation();

	const onDrop = useCallback((acceptedFiles) => {
		setFilesToUpload((prev) => [
			...prev,
			...acceptedFiles.map((file) => ({
				file,
				progress: 6,
			})),
		]);

		acceptedFiles.forEach((file) => {
			const fileType = getFileType(file.name);
			if (
				fileType === "noConflictingClassSessions" &&
				file.name.endsWith(".txt")
			) {
				readTextFile(file);
			} else if (file.name.endsWith(".csv")) {
				parseCSVFile(file, fileType);
			}
		});
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const getFileType = (fileName) => {
		return FILE_TYPES.find((type) => fileName.includes(type)) || "unknown";
	};

	const readTextFile = (file) => {
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const parsedData = JSON.parse(reader.result);
				setData((prev) => ({
					...prev,
					noConflictingClassSessions: parsedData,
				}));
			} catch (error) {
				console.error("Error parsing JSON from TXT file:", error);
			}
		};
		reader.readAsText(file);
	};

	const parseCSVFile = (file, fileType) => {
		Papa.parse(file, {
			complete: (result) => {
				setData((prev) => ({
					...prev,
					[fileType]: processCSVData(result.data, fileType),
				}));
				// setUploadedFiles((prev) => [...prev, file]);
				// setFilesToUpload((prev) => prev.filter((item) => item.file !== file));
			},
			header: true,
			skipEmptyLines: true,
		});
	};

	const processCSVData = (data, fileType) => {
		switch (fileType) {
			case "sessionDetails":
				return data.map((item) => ({
					detail: {
						classSessionName: item.classSessionName,
						numOfHour: item.numOfHour,
						sessionType: item.sessionType,
						capacity: item.capacity,
					},
					teacher: { name: item.teacherName },
				}));
			case "classrooms":
				return data.map((item) => ({
					name: item.name,
					capacity: item.capacity,
					type: item.type,
				}));
			case "constantSessionsFixedTimeLocation":
				return data.map((item) => ({
					detail: {
						classSessionName: item.classSessionName,
						numOfHour: item.numOfHour,
						sessionType: item.sessionType,
						capacity: item.capacity,
						startTime: item.startTime,
						dayOfWeek: item.dayOfWeek,
					},
					classroom: {
						name: item.classroomName,
						capacity: item.classroomCapacity,
						type: item.classroomType,
					},
					teacher: { name: item.teacherName },
				}));
			case "constantSessionsFixedLocation":
				return data.map((item) => ({
					detail: {
						classSessionName: item.classSessionName,
						numOfHour: item.numOfHour,
						sessionType: item.sessionType,
						capacity: item.capacity,
					},
					classroom: {
						name: item.classroomName,
						capacity: item.classroomCapacity,
						type: item.classroomType,
					},
					teacher: { name: item.teacherName },
				}));
			case "constantSessionsFixedTime":
				return data.map((item) => ({
					detail: {
						classSessionName: item.classSessionName,
						numOfHour: item.numOfHour,
						sessionType: item.sessionType,
						capacity: item.capacity,
						startTime: item.startTime,
						dayOfWeek: item.dayOfWeek,
					},
					teacher: { name: item.teacherName },
				}));
			default:
				return data;
		}
	};

	const removeFile = (file) => {
		setFilesToUpload((prev) => prev.filter((item) => item.file !== file));
		setUploadedFiles((prev) => prev.filter((item) => item !== file));
	};

	return (
		<div>
			<div
				{...getRootProps()}
				className='relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 !bg-background bg-gray-50 py-6 hover:bg-gray-100'
			>
				<div className='text-center'>
					<div className='mx-auto max-w-min rounded-md border p-2'>
						<UploadCloud size={20} />
					</div>
					<p className='mt-2 text-sm text-foreground'>
						<span className='font-semibold'>
							{t("admin.dragFiles")}
						</span>
					</p>
					<p className='text-xs text-foreground'>
						{t("admin.clickToUploadFiles")} &#40;
						{t("admin.filesShouldBeUnder10MB")}
						&#41;
					</p>
				</div>
				<Input
					{...getInputProps()}
					accept='.csv,.txt'
					id='dropzone-file'
					type='file'
					className='hidden'
				/>
			</div>

			{filesToUpload.length > 0 && (
				<div className='mt-2'>
					<ScrollArea className='h-40'>
						{/* <p className="my-2 mt-6 text-sm font-medium text-muted-foreground">
							Files to upload
						</p> */}
						<div className='space-y-2 pr-3'>
							{filesToUpload.map(({ file, progress }) => (
								<div
									key={file.name}
									className='group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 hover:pr-0'
								>
									<div className='flex flex-1 items-center p-2'>
										<div className='text-white'>
											<File
												size={40}
												className='fill-blue-400'
											/>
										</div>
										<div className='text-muted-foreground'>
											{file.name.slice(0, 35)}
										</div>
										{/* <Progress progress={progress} className="ml-2 flex-grow" /> */}
									</div>
									<button
										onClick={() => removeFile(file)}
										className='hidden items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex'
									>
										<X size={16} />
									</button>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>
			)}

			{uploadedFiles.length > 0 && (
				<div>
					<p className='my-2 mt-6 text-sm font-medium text-muted-foreground'>
						{t("admin.uploadedFiles")}
					</p>
					<div className='space-y-2 pr-3'>
						{uploadedFiles.map((file) => (
							<div
								key={file.name}
								className='group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 hover:border-slate-300 hover:pr-0'
							>
								<div className='flex flex-1 items-center p-2'>
									<div className='text-muted-foreground'>
										{file.name.slice(0, 25)}
									</div>
								</div>
								<button
									onClick={() => removeFile(file)}
									className='hidden items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex'
								>
									<X size={16} />
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
