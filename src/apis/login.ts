import { AxiosError } from "axios";
import { baseInstance } from "./axios.config";

type UserInfoType = {
  email: string;
  nickname: string;
  profile: string;
};

export const getFetchGoogleData = async () => {
  try {
    const response = await baseInstance.get("/login/google/google-get-data");

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
    const response = await baseInstance.get("/login/naver/naver-get-data");

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

export const getFetchUserLogout = async () => {
  try {
    const response = await baseInstance.get("/login/logout");

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
    const response = await baseInstance.post("/login/user", {
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

export const getFetchNicknameCheck = async (nickname: string) => {
  try {
    const response = await baseInstance.post("/login/check-name", {
      nickname,
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
export const getFetchUserSession = async () => {
  try {
    console.log("getFetchUserSession 요청 시작:", {
      url: `${baseInstance.defaults.baseURL}/login/check-login`,
      withCredentials: true,
    });

    const response = await baseInstance.get("/login/check-login", {
      withCredentials: true,
    });

    console.log("getFetchUserSession 응답:", {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });

    if (response.data.isError) {
      throw new Error(response.data.message || "세션 확인 실패");
    }

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      console.error("getFetchUserSession 에러:", {
        status: err.response.status,
        data: err.response.data,
        message: err.response.data.message || err.message,
      });
      throw new Error(err.response.data.message || "세션 확인 중 오류 발생");
    }
    console.error("getFetchUserSession 알 수 없는 에러:", err);
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
