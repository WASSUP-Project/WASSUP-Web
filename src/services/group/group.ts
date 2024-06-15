import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestCreateGroup = {
    groupName: string;
    groupDescription: string;
    address: string;
    businessNumber: string;
    email: string;
    imageUrl: string;
};

export const createGroup = async (requestCreateGroup: RequestCreateGroup) => {
    try {
        const response = await axios.post(`/api/groups`, {
            groupName: requestCreateGroup.groupName,
            groupDescription: requestCreateGroup.groupDescription,
            address: requestCreateGroup.address,
            businessNumber: requestCreateGroup.businessNumber,
            email: requestCreateGroup.email,
            imageUrl: requestCreateGroup.imageUrl,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")} `,
            },
        });
        return response.status === 201;
    } catch (error) {
        console.error(error);
    }
};

export const checkDuplicateGroupName = async (groupName: string) => {
    try {
        const response = await axios.post(`/api/groups/check?groupName=${groupName}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const sendVerificationCode = async (email: string) => {
    try {
        const response = await axios.post(`/api/groups/certification?email=${email}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

type RequestVerifyCode = {
    email: string;
    inputCertificationCode: string;
};

export const verifyCode = async (requestVerifyCode: RequestVerifyCode) => {
    try {
        const response = await axios.post(`/api/groups/verify`, {
            email: requestVerifyCode.email,
            inputCertificationCode: requestVerifyCode.inputCertificationCode,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getGroup = async (groupId: number) => {
    try {
        const response = await axios.get(`/api/groups?id=${groupId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

type RequestUpdateGroup = {
    description: string;
    address: string;
    businessNumber: string;
    imageUrl: string;
};

export const updateGroup = async (groupId: number, requestUpdateGroup: RequestUpdateGroup) => {
    try {
        const response = await axios.put(`/api/groups?id=${groupId}`, {
            description: requestUpdateGroup.description,
            address: requestUpdateGroup.address,
            businessNumber: requestUpdateGroup.businessNumber,
            imageUrl: requestUpdateGroup.imageUrl}, {
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

export const deleteGroup = async (groupId: number) => {
    try {
        const response = await axios.delete(`/api/groups?id=${groupId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return { status: 200 };
    } catch (error) {
        console.error(error);
        return { status: 500 };
    }
};

export const getMyGroups = async () => {
    try {
        const response = await axios.get(`/api/groups/my`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};