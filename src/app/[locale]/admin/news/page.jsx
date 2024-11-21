"use client";

// import NewAdmin from "@/components/news-admin/NewAdmin";

// export default function Page() {
// 	return (
// 		<div>
// 			<NewAdmin />
// 		</div>
// 	);
// }

import { useState } from "react";
import Papa from "papaparse";

export default function CSVReader() {
  	const [data, setData] = useState([]);

	console.log("data",data);
  // Hàm xử lý khi file được chọn
  const handleFileChange = (event,fileType) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop(); // Lấy phần mở rộng của file
      if (fileExtension === "csv") {
        parseCSV(file,fileType); // Xử lý file CSV
      } else if (fileExtension === "txt") {
        readFile(file); // Xử lý file TXT
      }
    }
  };

  // Đọc nội dung file và chuyển thành mảng JavaScript
  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      try {
        const parsedData = JSON.parse(content); // Chuyển chuỗi thành mảng JavaScript
        setData((pre)=>{
			return {...pre, noConflictingClassSessions:parsedData}
		}); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  // Hàm xử lý file CSV
  const parseCSV = (file,fileType) => {
    Papa.parse(file, {
      complete: (result) => {
        console.log("Parsed CSV result:", fileType);
		setData((pre)=>{
			return {...pre, [fileType]:processData(result.data,fileType)}
		}); // Lưu dữ liệu vào state
      },
      header: true, // Nếu CSV có header
      skipEmptyLines: true, // Bỏ qua các dòng trống
    });
  };

  // Kiểm tra tên file và xử lý dữ liệu tương ứng
  const processData = (data,fileType) => {
    if (fileType === "sessionDetails") {
      return data.map((item) => ({
        detail: {
          classSessionName: item.classSessionName,
          numOfHour: item.numOfHour,
          sessionType: item.sessionType,
          capacity: item.capacity,
        },
        teacher: {
          name: item.teacherName,
        },
      }));
    }

    if (fileType === "classrooms") {
      return data.map((item) => ({
        name: item.name,
        capacity: item.capacity,
        type: item.type,
      }));
    }

    if (fileType === "constantSessionsFixedTimeLocation") {
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
        teacher: {
          name: item.teacherName,
        },
      }));
    }

    if (fileType === "constantSessionsFixedLocation") {
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
        teacher: {
          name: item.teacherName,
        },
      }));
    }

    if (fileType === "constantSessionsFixedTime") {
      return data.map((item) => ({
        detail: {
          classSessionName: item.classSessionName,
          numOfHour: item.numOfHour,
          sessionType: item.sessionType,
          capacity: item.capacity,
          startTime: item.startTime,
          dayOfWeek: item.dayOfWeek,
        },
        teacher: {
          name: item.teacherName,
        },
      }));
    }

    // Nếu không tìm thấy tên file phù hợp, trả về dữ liệu gốc
    return data;
  };

  return (
    <div>
      <input type="file" accept=".csv,.txt" onChange={(e)=>handleFileChange(e,"sessionDetails")} />
	  sessionDetails
	  <br />
	  <input type="file" accept=".csv,.txt" onChange={(e)=>handleFileChange(e,"classrooms")} />
	  classrooms
	  <br />
	  <input type="file" accept=".csv,.txt" onChange={(e)=>handleFileChange(e,"constantSessionsFixedTimeLocation")} />
	  constantSessionsFixedTimeLocation
	  <br />
	  <input type="file" accept=".csv,.txt" onChange={(e)=>handleFileChange(e,"constantSessionsFixedLocation")} />
	  constantSessionsFixedLocation
	  <br />
	  <input type="file" accept=".csv,.txt" onChange={(e)=>handleFileChange(e,"constantSessionsFixedTime")} />
	  constantSessionsFixedTime
	  <br />
	  <input type="file" accept=".txt" onChange={(e)=>handleFileChange(e,"noConflictingClassSessions")} />
	  noConflictingClassSessions

      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Hiển thị dữ liệu đã chuyển */}
    </div>
  );
}



