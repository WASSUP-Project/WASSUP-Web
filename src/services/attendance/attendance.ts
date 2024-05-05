import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ResponseCode = {
    code: string;
};

export const getAttendancePageUniqueCode = async (groupId : number) => {
    try {
        const response = await axios.get(`/api/attendance/code/${groupId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")} `,
            },
            timeout: 3000,
        });
        return response.data as ResponseCode;
    } catch (error) {
        console.error(error);
    }
}
