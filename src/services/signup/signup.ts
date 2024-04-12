import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestSignup = {
    adminId: string;
    password: string;
    name: string;
    phoneNumber: string;
};

export const signup = async (requestSignup: RequestSignup) => {
  try {
    const response = await axios.post(`/api/admins/signup`, {
        adminId: requestSignup.adminId,
        password: requestSignup.password,
        name: requestSignup.name,
        phoneNumber: requestSignup.phoneNumber,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status === 201;
  } catch (error) {
    console.error(error);
  }
};

export const checkDuplicateId = async (id: string) => {
    try {
        const response = await axios.post(`/api/admins/duplicate?adminId=${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const sendVerificationCode = async (phoneNumber: string) => {
    try {
        const response = await axios.post(`/api/admins/certification?phone=${phoneNumber}`, {
        phoneNumber
        }, {
        headers: {
            "Content-Type": "application/json",
        },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

type RequestVerifyCode = {
    phoneNumber: string;
    inputCertificationCode: string;
};

export const verifyCode = async (requestVerifyCode: RequestVerifyCode) => {
    try {
        const response = await axios.post(`/api/admins/verify`, {
            phoneNumber: requestVerifyCode.phoneNumber,
            inputCertificationCode: requestVerifyCode.inputCertificationCode,
        }, {
        headers: {
            "Content-Type": "application/json",
        },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
