import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ResponseCode = {
    code: string;
};

export const getAttendancePageUniqueCode = async (groupId : number) => {
    try {
        const response = await axios.get(`/api/attendances/code/${groupId}`, {
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

export type RequestMembers = {
    code: string;
    phoneNumber: string;
};

export type ResponseMembers = {
    memberId: number;
    memberName: string;
};

export const getMembersByLastFourDigits = async (data: RequestMembers) => {
    try {
        const response = await axios.get(`/api/attendances/members?code=${data.code}&phoneNumber=${data.phoneNumber}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 3000,
        });
        return response.data as ResponseMembers[];
    } catch (error) {
        console.error(error);
    }
}

export const requestAttendanceWithMemberId = async (memberId: number, code: string) => {
    try {
        const response = await axios.post(`/api/attendances/${memberId}`, {
            code: code,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 3000,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}