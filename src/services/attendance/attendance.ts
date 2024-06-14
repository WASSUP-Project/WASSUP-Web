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

export const getMembersByLastFourDigitsForLeaving = async (data: RequestMembers) => {
    try {
        const response = await axios.get(`/api/attendances/leaving/members?code=${data.code}&phoneNumber=${data.phoneNumber}`,
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

export const requestLeavingWithMemberId = async (memberId: number, code: string) => {
    try {
        const response = await axios.post(`/api/attendances/leaving/${memberId}`, {
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

export type AttendanceInfo = {
    attendanceRate: number;
    notAttendanceMembers: ResponseMembers[] | [];
};

export const getAttendanceInfo = async (groupId: number) => {
    try {
        const response = await axios.get(`/api/attendances/info/${groupId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.data as AttendanceInfo;
    } catch (error) {
        console.error(error);
    }
};

export type MemberWithAttendanceStatus = {
    memberId: number;
    memberName: string;
    status: string;
}

export const getMembersWithAttendanceStatus = async (groupId: number) => {
    try {
        const response = await axios.get(`/api/attendances/members/${groupId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.data as MemberWithAttendanceStatus[];
    } catch (error) {
        console.error(error);
    }
};

export enum AttendanceStatus {
    ATTENDANCE = "ATTENDANCE",
    ABSENCE = "ABSENCE",
    ILLNESS = "ILLNESS",
    LEAVING = "LEAVING",
}

export namespace AttendanceStatus {
    export function of(status: string): AttendanceStatus {
        switch (status) {
            case "ATTENDANCE":
                return AttendanceStatus.ATTENDANCE;
            case "ABSENCE":
                return AttendanceStatus.ABSENCE;
            case "ILLNESS":
                return AttendanceStatus.ILLNESS;
            case "LEAVING":
                return AttendanceStatus.LEAVING;
            default:
                throw new Error(`Unknown status: ${status}`);
        }
    }
}

export type RequestUpdateAttendanceStatus = {
    memberId: number;
    status: string;
};

export const updateAttendanceStatus = async (data: RequestUpdateAttendanceStatus) => {
    try {
        await axios.put(`/api/attendances/members/${data.memberId}?status=${data.status}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return { status: 200 };
    } catch (error) {
        console.error(error);
        return { status: 500 };
    }
};

export const updateAttendanceStatusAll = async (groupId: number, status: number) => {
    try {
        await axios.put(`/api/attendances/members/all?id=${groupId}&statusId=${status}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return { status: 200 };
    } catch (error) {
        console.error(error);
        return { status: 500 };
    }
};