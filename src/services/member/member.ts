import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getGroupMembers = async (id: number) => {
    try {
        const response = await axios.get(`/api/groups/members?id=${id}&type=accepted`, {
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

export type ResponseMember = {
    id: number;
    name: string;
    phoneNumber: string;
    birth: string;
    specifics: string;
};

export const getMemberById = async (id: number) => {
    try {
        const response = await axios.get(`/api/members?id=${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.data as ResponseMember;
    } catch (error) {
        console.error(error);
    }
};

export type RequestUpdateMember = {
    id: number;
    name: string;
    phoneNumber: string;
    birth: string;
    specifics: string;
};

export const updateMember = async ({ id, name, phoneNumber, birth, specifics }: RequestUpdateMember) => {
    try {
        const response = await axios.put(`/api/members?id=${id}`, {
            name,
            phoneNumber,
            birth,
            specifics,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error(error);
    }
};