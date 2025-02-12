import { AxiosError } from 'axios';
import { baseInstance } from './axios.config';

type UserInfoType = {
  email: string;
  nickname: string;
  profile: string;
};

export const getFetchGoogleData = async () => {
  try {
    const response = await baseInstance.get('/login/google/google-get-data');

    if (response.data.isError) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      console.log(err.response.data.message);
    }
    throw err;
  }
};

export const getFetchNaverData = async () => {
  try {
    const response = await baseInstance.get('/login/naver/naver-get-data');

    if (response.data.isError) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      console.log(err.response.data.message);
    }
    throw err;
  }
};

export const getFetchUserData = async (userInfo: UserInfoType) => {
  try {
    const response = await baseInstance.post('/login/user', {
      ...userInfo,
    });

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      console.log(err.response.data.message);
    }
    throw err;
  }
};
