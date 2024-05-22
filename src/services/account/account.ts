import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type RequestFindIdByCertification = {
    phoneNumber: string;
    inputCertificationCode: string;
};

export type ResponseFindIdByCertification = {
    adminId: string;
};

export const findIdByCertification = async (requestFindIdByCertification: RequestFindIdByCertification) => {
    try {
        const response = await axios.post(`/api/admins/find/id`, {
            phoneNumber: requestFindIdByCertification.phoneNumber,
            inputCertificationCode: requestFindIdByCertification.inputCertificationCode,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data as ResponseFindIdByCertification;
    } catch (error) {
        console.error(error);
    }
}

export type RequestSendVerificationCodeForPassword = {
    adminId: string;
    phoneNumber: string;
};

export const sendVerificationCodeForPassword = async (requestSendVerificationCodeForPassword: RequestSendVerificationCodeForPassword) => {
    try {
        const response = await axios.post(`/api/admins/find/password/certification`, {
            adminId: requestSendVerificationCodeForPassword.adminId,
            phoneNumber: requestSendVerificationCodeForPassword.phoneNumber,
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

export type RequestResetPassword = {
    adminId: string;
    phoneNumber: string;
    inputCertificationCode: string;
    newPassword: string;
};

export const resetPassword = async (requestResetPassword: RequestResetPassword) => {
    try {
        const response = await axios.put(`/api/admins/find/password`, {
            adminId: requestResetPassword.adminId,
            phoneNumber: requestResetPassword.phoneNumber,
            inputCertificationCode: requestResetPassword.inputCertificationCode,
            newPassword: requestResetPassword.newPassword,
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