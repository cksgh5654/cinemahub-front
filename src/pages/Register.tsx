import { ChangeEvent, useEffect, useState } from "react";
import {
  getFetchGoogleData,
  getFetchNaverData,
  getFetchNicknameCheck,
  getFetchUserData,
  getFetchUserSession,
} from "../apis/login";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLoginStore from "../store/useStore";
import bgMovies from "../assets/images/bg-image.jpg";

type UserInfoType = {
  email: string;
  nickname: string;
  profile: string;
};

const defaultUserInfo: UserInfoType = {
  email: "",
  nickname: "",
  profile: "",
};

const Register = () => {
  const navigate = useNavigate();
  const login = useLoginStore((state) => state.login);
  const [searchParams] = useSearchParams();
  const social = searchParams.get("social");

  const [userInfo, setUserInfo] = useState<UserInfoType>(defaultUserInfo);
  const [agree, setAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetGoogleDataFetch = async () => {
    try {
      setIsLoading(true);
      const { result, data, message } = await getFetchGoogleData();
      if (!result) throw new Error(message);

      const { email, name, picture } = data;
      setUserInfo({ email, nickname: name, profile: picture });
      console.log("Google 데이터 가져오기 성공:", data);
    } catch (e) {
      console.error("Google 데이터 가져오기 에러:", e);
      alert("소셜 계정 정보를 불러올 수 없습니다. 다시 로그인해주세요.");
      navigate("/login", { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetNaverDataFetch = async () => {
    try {
      setIsLoading(true);
      const { result, data, message } = await getFetchNaverData();
      if (!result) throw new Error(message);

      const { email, nickname, profile_image } = data;
      setUserInfo({ email, nickname, profile: profile_image });
      console.log("Naver 데이터 가져오기 성공:", data);
    } catch (e) {
      console.error("Naver 데이터 가져오기 에러:", e);
      alert("소셜 계정 정보를 불러올 수 없습니다. 다시 로그인해주세요.");
      navigate("/login", { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgree = (e: ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked);
  };

  const handleUniqueNickName = async (name: string) => {
    if (!name) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const { result, nickname, message } = await getFetchNicknameCheck(name);
      if (!result) throw new Error(message);

      setUserInfo((prev) => ({ ...prev, nickname }));
      alert(message);
      console.log("닉네임 중복 확인 성공:", { nickname, message });
    } catch (e: any) {
      console.error("닉네임 중복 확인 에러:", e);
      alert(e.message || "닉네임 확인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterUser = async () => {
    if (Object.values(userInfo).some((value) => !value)) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    if (!agree) {
      alert("이용약관 및 개인정보처리방침에 동의해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const { result, message } = await getFetchUserData(userInfo);
      if (!result) throw new Error(message);

      // 세션 상태 확인
      const sessionResponse = await getFetchUserSession();
      if (sessionResponse.result) {
        login();
        alert("회원가입이 완료되었습니다!");
        navigate("/", { replace: true });
        console.log("회원가입 및 로그인 성공:", sessionResponse);
      } else {
        throw new Error(
          "회원가입은 완료되었으나 로그인 상태를 확인할 수 없습니다."
        );
      }
    } catch (e: any) {
      console.error("회원가입 에러:", e);
      alert(e.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (social === "1") {
      handleGetGoogleDataFetch();
    } else if (social === "2") {
      handleGetNaverDataFetch();
    } else {
      alert("잘못된 접근입니다. 로그인 페이지로 이동합니다.");
      navigate("/login", { replace: true });
    }
  }, [social, navigate]);

  return (
    <div className="relative grid place-items-center w-full h-screen">
      <div className="absolute z-0 inset-0 overflow-hidden">
        <img
          className="min-w-full min-h-full max-w-none"
          src={bgMovies}
          alt="배경 이미지"
        />
      </div>

      <div className="relative z-1 max-w-md px-2 mx-auto">
        <div className="flex flex-col items-center justify-center p-10 rounded-2xl bg-slate-200 gap-5">
          <h1 className="font-bold text-2xl">회원 정보 입력</h1>

          {isLoading ? (
            <p>로딩 중...</p>
          ) : (
            <>
              <div>
                <label htmlFor="nickname">닉네임</label>
                <div className="relative w-[360px] bg-white p-3 border border-slate-300 rounded-[10px]">
                  <input
                    className="w-60 focus:outline-none active:bg-white"
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder="닉네임을 입력해주세요."
                    value={userInfo.nickname}
                    onChange={handleChangeNickname}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleUniqueNickName(userInfo.nickname)}
                    className="absolute cursor-pointer top-2 right-4 p-1 text-white text-sm bg-blue-300 border border-slate-300 rounded-[10px]"
                    disabled={isLoading}
                  >
                    중복확인
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <input
                  id="agree"
                  type="checkbox"
                  className="w-[24px] h-[24px] border border-slate-300 rounded-[10px] focus:ring-blue-500"
                  checked={agree}
                  onChange={handleAgree}
                  disabled={isLoading}
                />
                <label
                  htmlFor="agree"
                  className="text-md font-medium text-gray-900"
                >
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => window.open("/policy", "_blank")}
                  >
                    이용약관
                  </span>{" "}
                  과{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => window.open("/policy", "_blank")}
                  >
                    개인정보처리방침
                  </span>
                  에 동의합니다.
                </label>
              </div>

              <button
                className="w-full p-3 bg-white border border-slate-300 rounded-[10px]"
                onClick={() => navigate("/login", { replace: true })}
                disabled={isLoading}
              >
                취소
              </button>
              <button
                className="w-full p-3 bg-red-400 border border-slate-300 rounded-[10px]"
                onClick={handleRegisterUser}
                disabled={isLoading}
              >
                등록
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
