
import { revalidateTag, unstable_noStore } from "next/cache"

export const deleteTasks = async ({ ids }) => {

    unstable_noStore()

    try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/user-list/`, {
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