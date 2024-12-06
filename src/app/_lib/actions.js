
import { revalidateTag, unstable_noStore } from "next/cache"
import Cookies from "js-cookie";

const creactList = [
    "admin/sign-up",
    "teacher",
    "classroom",
    "news",
    "subject",
    "class-session",
    "session_details",
    "grade",
    "user_session_details"
]

const deleteList = [
    "admin/user-list",
    "teacher",
    "classroom",
    "news",
    "subject",
    "class-session",
    "session_details",
    "grade",
    "user_session_details"
]

export const deleteTasks = async ({ ids }, selected) => {
    unstable_noStore()
    try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/${deleteList[selected]}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ids: ids, // Truyền id trong body
            }),
        });

        return response;

    } catch (error) {
        return error;
    }
}

export async function updateTask(input) {
    unstable_noStore()
    try {
        console.log("props", input)

    } catch (err) {

    }
}
const refreshToken = Cookies.get("refreshToken");

export const creactTask = async (data, selected) => {
    unstable_noStore()
    try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/${creactList[selected]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'refreshToken': refreshToken,
            },
            body: JSON.stringify(data),
        });

        return response.json();

    } catch (error) {
        return error;
    }
}