import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ResponseAdmin = {
    id: number;
    name: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    groupCount: number;
    memberCount: number;
};

export const getAdmin = async () => {
    try {
        const response = await axios.get(`/api/admins`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")} `,
            },
        });
        return response.data as ResponseAdmin;
    } catch (error) {
        console.error(error);
    }
};