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