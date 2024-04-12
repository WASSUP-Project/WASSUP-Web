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
        const response = await axios.post(`/api/groups/check?groupName=${groupName}`, 
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const sendVerificationCode = async (email: string) => {
    try {
        const response = await axios.post(`/api/groups/certification?email=${email}`, 
        {},
        {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

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