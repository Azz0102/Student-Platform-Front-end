"use client";

import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import {
	AudioWaveform,
	File,
	FileImage,
	FolderArchive,
	UploadCloud,
	Video,
	X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";

const ImageColor = {
	bgColor: "bg-purple-600",
	fillColor: "fill-purple-600",
};

const PdfColor = {
	bgColor: "bg-blue-400",
	fillColor: "fill-blue-400",
};

const AudioColor = {
	bgColor: "bg-yellow-400",
	fillColor: "fill-yellow-400",
};

const VideoColor = {
	bgColor: "bg-green-400",
	fillColor: "fill-green-400",
};

const OtherColor = {
	bgColor: "bg-gray-400",
	fillColor: "fill-gray-400",
};

const FileTypes = {
	Image: "image",
	Pdf: "pdf",
	Audio: "audio",
	Video: "video",
	Other: "other",
};

export default function ImageUpload() {
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [filesToUpload, setFilesToUpload] = useState([]);

	const getFileIconAndColor = (file) => {
		if (file.type.includes(FileTypes.Image)) {
			return {
				icon: <FileImage size={40} className={ImageColor.fillColor} />,
				color: ImageColor.bgColor,
			};
		}

		if (file.type.includes(FileTypes.Pdf)) {
			return {
				icon: <File size={40} className={PdfColor.fillColor} />,
				color: PdfColor.bgColor,
			};
		}

		if (file.type.includes(FileTypes.Audio)) {
			return {
				icon: (
					<AudioWaveform size={40} className={AudioColor.fillColor} />
				),
				color: AudioColor.bgColor,
			};
		}

		if (file.type.includes(FileTypes.Video)) {
			return {
				icon: <Video size={40} className={VideoColor.fillColor} />,
				color: VideoColor.bgColor,
			};
		}

		return {
			icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
			color: OtherColor.bgColor,
		};
	};

	// feel free to mode all these functions to separate utils
	// here is just for simplicity
	const onUploadProgress = (progressEvent, file, cancelSource) => {
		const progress = Math.round(
			(progressEvent.loaded / (progressEvent.total ?? 0)) * 100
		);

		if (progress === 100) {
			setUploadedFiles((prevUploadedFiles) => {
				return [...prevUploadedFiles, file];
			});

			setFilesToUpload((prevUploadProgress) => {
				return prevUploadProgress.filter((item) => item.File !== file);
			});

			return;
		}

		setFilesToUpload((prevUploadProgress) => {
			return prevUploadProgress.map((item) => {
				if (item.File.name === file.name) {
					return {
						...item,
						progress,
						source: cancelSource,
					};
				} else {
					return item;
				}
			});
		});
	};

	const uploadImageToCloudinary = async (
		formData,
		onUploadProgress,
		cancelSource
	) => {
		return axios.post(
			`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
			formData,
			{
				onUploadProgress,
				cancelToken: cancelSource.token,
			}
		);
	};

	const removeFile = (file) => {
		setFilesToUpload((prevUploadProgress) => {
			return prevUploadProgress.filter((item) => item.File !== file);
		});

		setUploadedFiles((prevUploadedFiles) => {
			return prevUploadedFiles.filter((item) => item !== file);
		});
	};

	const onDrop = useCallback(async (acceptedFiles) => {
		setFilesToUpload((prevUploadProgress) => {
			return [
				...prevUploadProgress,
				...acceptedFiles.map((file) => {
					return {
						progress: 0,
						File: file,
						source: null,
					};
				}),
			];
		});

		// cloudinary upload

		// const fileUploadBatch = acceptedFiles.map((file) => {
		//   const formData = new FormData();
		//   formData.append("file", file);
		//   formData.append(
		//     "upload_preset",
		//     process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
		//   );

		//   const cancelSource = axios.CancelToken.source();
		//   return uploadImageToCloudinary(
		//     formData,
		//     (progressEvent) => onUploadProgress(progressEvent, file, cancelSource),
		//     cancelSource
		//   );
		// });

		// try {
		//   await Promise.all(fileUploadBatch);
		//   alert("All files uploaded successfully");
		// } catch (error) {
		//   console.error("Error uploading files: ", error);
		// }
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div>
			<div>
				<label
					{...getRootProps()}
					className='relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 !bg-background bg-gray-50 py-6 hover:bg-gray-100'
				>
					<div className='text-center'>
						<div className='mx-auto max-w-min rounded-md border p-2'>
							<UploadCloud size={20} />
						</div>

						<p className='mt-2 text-sm text-foreground'>
							<span className='font-semibold'>Drag files</span>
						</p>
						<p className='text-xs text-foreground'>
							Click to upload files &#40;files should be under 10
							MB &#41;
						</p>
					</div>
				</label>

				<Input
					{...getInputProps()}
					id='dropzone-file'
					accept='image/png, image/jpeg'
					type='file'
					className='hidden'
				/>
			</div>

			{filesToUpload.length > 0 && (
				<div>
					<ScrollArea className='h-40'>
						<p className='my-2 mt-6 text-sm font-medium text-muted-foreground'>
							Files to upload
						</p>
						<div className='space-y-2 pr-3'>
							{filesToUpload.map((fileUploadProgress) => {
								return (
									<div
										key={
											fileUploadProgress.File.lastModified
										}
										className='group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 hover:pr-0'
									>
										<div className='flex flex-1 items-center p-2'>
											<div className='text-white'>
												{
													getFileIconAndColor(
														fileUploadProgress.File
													).icon
												}
											</div>

											<div className='ml-2 w-full space-y-1'>
												<div className='flex justify-between text-sm'>
													<p className='text-muted-foreground'>
														{fileUploadProgress.File.name.slice(
															0,
															25
														)}
													</p>
													<span className='text-xs'>
														{
															fileUploadProgress.progress
														}
														%
													</span>
												</div>
												<Progress
													progress={
														fileUploadProgress.progress
													}
													className={
														getFileIconAndColor(
															fileUploadProgress.File
														).color
													}
												/>
											</div>
										</div>
										<button
											onClick={() => {
												if (fileUploadProgress.source)
													fileUploadProgress.source.cancel(
														"Upload cancelled"
													);
												removeFile(
													fileUploadProgress.File
												);
											}}
											className='hidden cursor-pointer items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex'
										>
											<X size={20} />
										</button>
									</div>
								);
							})}
						</div>
					</ScrollArea>
				</div>
			)}

			{uploadedFiles.length > 0 && (
				<div>
					<p className='my-2 mt-6 text-sm font-medium text-muted-foreground'>
						Uploaded Files
					</p>
					<div className='space-y-2 pr-3'>
						{uploadedFiles.map((file) => {
							return (
								<div
									key={file.lastModified}
									className='group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 transition-all hover:border-slate-300 hover:pr-0'
								>
									<div className='flex flex-1 items-center p-2'>
										<div className='text-white'>
											{getFileIconAndColor(file).icon}
										</div>
										<div className='ml-2 w-full space-y-1'>
											<div className='flex justify-between text-sm'>
												<p className='text-muted-foreground'>
													{file.name.slice(0, 25)}
												</p>
											</div>
										</div>
									</div>
									<button
										onClick={() => removeFile(file)}
										className='hidden items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex'
									>
										<X size={20} />
									</button>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
