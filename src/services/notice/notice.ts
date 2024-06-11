import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ResponseNotice = {
    id: number;
    title: string;
    content: string;
};

export const getNotices = async (id: number) => {
    try {
        const response = await axios.get(`/api/announcements?id=${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.data as ResponseNotice[];
    } catch (error) {
        console.error(error);
    }
};

export type RequestCreateNotice = {
    id: number;
    title: string;
    content: string;
};

export const createNotice = async (request: RequestCreateNotice) => {
    try {
        const response = await axios.post(`/api/announcements?id=${request.id}`, {
            title: request.title,
            content: request.content,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export type RequestCreateNoticeToMember = {
    memberId: number;
    groupId: number;
    title: string;
    content: string;
};

export const createNoticeToMember = async (request: RequestCreateNoticeToMember) => {
    try {
        const response = await axios.post(`/api/announcements/${request.memberId}?groupId=${request.groupId}`, {
            title: request.title,
            content: request.content,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};