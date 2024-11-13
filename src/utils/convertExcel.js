import * as XLSX from "xlsx";

export const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Tạo một Promise để chờ đợi việc đọc tệp hoàn tất
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            // Lấy sheet đầu tiên trong file Excel
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Chuyển sheet thành JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            resolve(jsonData); // Giải quyết Promise với dữ liệu JSON
        };

        reader.onerror = (error) => {
            reject(error); // Từ chối Promise nếu có lỗi
        };

        reader.readAsArrayBuffer(file); // Bắt đầu đọc tệp dưới dạng ArrayBuffer
    });

};
