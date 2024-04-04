import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type SignupRequest = {
    adminId: string;
    password: string;
    name: string;
    phoneNumber: string;
};

export const signup = async (signupRequest: SignupRequest) => {
  try {
    const response = await axios.post(`/api/admins/signup`, {
        adminId: signupRequest.adminId,
        password: signupRequest.password,
        name: signupRequest.name,
        phoneNumber: signupRequest.phoneNumber,
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
        const response = await axios.post(`/api/admins/duplicate?id=${id}`, {
        id
        }, {
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

type VerifyCodeRequest = {
    phoneNumber: string;
    inputCertificationCode: string;
};

export const verifyCode = async (verifyCodeRequest: VerifyCodeRequest) => {
    try {
        const response = await axios.post(`/api/admins/verify`, {
            phoneNumber: verifyCodeRequest.phoneNumber,
            inputCertificationCode: verifyCodeRequest.inputCertificationCode,
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
