import { AxiosError } from "axios";
import { baseInstance } from "./axios.config";

/* 로그인한 유저 프로필 조회 */
export const getLoggedInUserInfo = async () => {
  try {
    const response = await baseInstance.get(`/profile/me`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("로그인한 유저 정보 가져오기 실패:", error);
    throw new Error("로그인한 유저 정보 가져오는 중 오류가 발생했습니다.");
  }
};

/* 특정 닉네임의 프로필 조회 */
export const getProfileData = async (nickname: string) => {
  try {
    const response = await baseInstance.get(`/profile/${nickname}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("프로필 조회 실패:", error);
    throw new Error("프로필 조회 중 오류가 발생했습니다.");
  }
};

/* 닉네임 중복 체크 */
export const getFetchNicknameCheck = async (nickname: string) => {
  try {
    const response = await baseInstance.post("/profile/check-name", {
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

/* 프로필 업데이트 */
export const updateProfileData = async (
  nickname: string,
  introduce: string
) => {
  try {
    const response = await baseInstance.patch("/profile/profile-update", {
      name: nickname,
      intro: introduce,
    });
    return response.data;
  } catch (error) {
    console.error("프로필 업데이트 오류:", error);
    throw new Error("프로필 업데이트 중 오류가 발생했습니다.");
  }
};

/* 팔로우 요청 */
export const followUser = async (targetNickname: string) => {
  try {
    await baseInstance.post(`/follow/${targetNickname}`);
  } catch (error) {
    console.error("팔로우 요청 오류:", error);
    throw new Error("팔로우 요청 중 오류가 발생했습니다.");
  }
};

/* 언팔로우 요청 */
export const unfollowUser = async (targetNickname: string) => {
  try {
    await baseInstance.delete(`/follow/${targetNickname}`);
  } catch (error) {
    console.error("언팔로우 요청 오류:", error);
    throw new Error("언팔로우 요청 중 오류가 발생했습니다.");
  }
};

/* 즐겨찾기 상태체크 */
export const checkFavoriteAPI = async (
  favoriteType: string,
  favoriteId: string
) => {
  const response = await baseInstance.get(`/favorite/check`, {
    params: {
      favoriteType,
      favoriteId,
    },
  });
  return response.data;
};
/* 즐겨찾기 추가 */
export const addFavoriteAPI = async (
  favoriteType: string,
  favoriteId: string
) => {
  const response = await baseInstance.post(`/favorite/add`, {
    favoriteType,
    favoriteId,
  });
  return response.data;
};
/* 즐겨찾기 삭제 */
export const removeFavoriteAPI = async (
  favoriteType: string,
  favoriteId: string
) => {
  const response = await baseInstance.post(`/favorite/remove`, {
    favoriteType,
    favoriteId,
  });
  return response.data;
};
