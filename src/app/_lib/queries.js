
const objectQuery = [
    "admin/user",
    "teacher",
    "classroom",
    "news",
    "session-details",
    "subject"
];

const toQueryString = (params) => {
    const queryString = [];

    // Duyệt qua các thuộc tính và thêm vào query string
    Object.keys(params).forEach(key => {
        // Kiểm tra nếu là mảng hoặc đối tượng, chuyển thành chuỗi JSON
        if (Array.isArray(params[key]) || typeof params[key] === 'object') {
            queryString.push(`${key}=${JSON.stringify(params[key])}`);
        } else {
            queryString.push(`${key}=${params[key]}`);
        }
    });

    return queryString.join('&');
};

export const getList = async (search, selected) => {

    const response = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/${objectQuery[selected]}/?${toQueryString(search)}`, {
        cache: 'no-store'  // hoặc "force-cache" nếu cần cache
    });

    const data = await response.json();
    return data;
}

