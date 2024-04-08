import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type LoginRequest = {
    adminId: string;
    password: string;
};

export const login = async (loginRequest: LoginRequest) => {
  try {
    const response = await axios.post(`/api/admins/login`, {
        adminId: loginRequest.adminId,
        password: loginRequest.password,
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
    window.localStorage.clear();
}
