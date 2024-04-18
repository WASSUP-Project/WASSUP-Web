import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type RequestSendInvite = {
    id: number;
    phoneNumber: string;
    link: string;
};

export const sendInviteMessage = async (requestSendInvite: RequestSendInvite) => {
    try {
        const response = await axios.post(`/api/groups/invite/send?id=${requestSendInvite.id}`, {
            phoneNumber: requestSendInvite.phoneNumber,
            link: requestSendInvite.link,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.status === 200;
    } catch (error) {
        console.error(error);
    }
}

export const acceptInvite = async (id: number) => {
    try {
        const response = await axios.post(`/api/groups/invite/accept?id=${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.status === 200;
    } catch (error) {
        console.error(error);
    }
};

export const rejectInvite = async (id: number) => {
    try {
        const response = await axios.post(`/api/groups/invite/reject?id=${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.status === 200;
    } catch (error) {
        console.error(error);
    }
};

export const getWaitingMembers = async (id: number) => {
    try {
        const response = await axios.get(`/api/groups/invite/waiting?id=${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}