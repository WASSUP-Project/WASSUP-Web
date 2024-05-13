import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type RequestSendInvite = {
    id: number;
    phoneNumber: string;
    link: string;
};

export const sendInviteMessage = async (requestSendInvite: RequestSendInvite) => {
    try {
        const response = await axios.post(`/api/groups/send?id=${requestSendInvite.id}`, {
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
        const response = await axios.post(`/api/groups/accept?id=${id}`, {}, {
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
        const response = await axios.post(`/api/groups/reject?id=${id}`, {}, {
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
        const response = await axios.get(`/api/groups/members?id=${id}&type=waiting`, {
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

export type RequestJoinGroup = {
    name: string;
    phoneNumber: string;
    birth: string;
    specifics: string;
    groupCode: string;
};

export const joinGroup = async (requestJoinGroup: RequestJoinGroup) => {
    try {
        const response = await axios.post(`/api/members/join`, {
            name: requestJoinGroup.name,
            phoneNumber: requestJoinGroup.phoneNumber,
            birth: requestJoinGroup.birth,
            specifics: requestJoinGroup.specifics,
            groupCode: requestJoinGroup.groupCode,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.status === 200;
    } catch (error) {
        console.error(error);
    }
}