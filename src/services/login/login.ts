import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestLogin = {
    adminId: string;
    password: string;
};

export const login = async (requestLogin: RequestLogin) => {
  try {
    const response = await axios.post(`/api/admins/login`, {
        adminId: requestLogin.adminId,
        password: requestLogin.password,
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

export const logout = async () => {
  let localStorage: Storage | null = null;
  if (typeof window !== 'undefined') {
    localStorage = window.localStorage;
  }

  localStorage?.removeItem("accessToken");
}
