
const objectQuery = [
    "admin/user",
    "teacher",
    "classroom",
    "news",
    "subject",
    "class-session",
    "session_details",
    "grade",
    "user_session_details"
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

const toQueryString67 = (params, classSession) => {
    const queryString = [];
    queryString.push(`classSession=${classSession}`);
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

const toQueryString8 = (params, sessionDetailsId) => {
    const queryString = [];
    queryString.push(`sessionDetailsId=${sessionDetailsId}`);
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

export const getList67 = async (search, selected, classSession) => {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/${objectQuery[selected]}/?${toQueryString67(search, classSession)}`, {
        cache: 'no-store'  // hoặc "force-cache" nếu cần cache
    });
    const data = await response.json();
    return data;
}

export const getList8 = async (search, selected, sessionDetailsId) => {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/${objectQuery[selected]}/?${toQueryString8(search, sessionDetailsId)}`, {
        cache: 'no-store'  // hoặc "force-cache" nếu cần cache
    });
    const data = await response.json();
    return data;
}


