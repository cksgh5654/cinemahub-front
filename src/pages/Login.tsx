import { useEffect } from "react";
import GoogleIcon from "../icons/GoogleIcon";
import NaverIcon from "../icons/NaverIcon";
import bgMovies from "../assets/images/bg-image.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseInstance } from "../apis/axios.config";

const Login = () => {
  const [searchParams, _] = useSearchParams();
  const navigator = useNavigate();
  const user = searchParams.get("user") || null;

  const handleGoogleSignin = () => {
    window.location.href = "/api/login/google/google-oauth";
  };

  const handleNaverSignin = () => {
    window.location.href = "/api/login/naver/naver-oauth";
  };

  useEffect(() => {
    if (user === "deleted") {
      alert("이미 탈퇴 처리중인 이메일입니다. 다른 계정으로 로그인해주세요.");
      navigator("/login", { replace: true });
      return;
    }
  }, []);

  const code = searchParams.get("code");
  const url =
    import.meta.env.MODE === "development"
      ? ""
      : "https://app.chanhoportfolio.com/api";

  useEffect(() => {
    if (code) {
      baseInstance
        .get(`${url}/login/google/google-oauth-redirect?code=${code}`)
        .then(() => {
          navigator("/", { replace: true });
          console.log("로그인 성공");
        });
    }
  }, [code]);

  return (
    <>
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
            <h1 className="font-bold text-2xl">로그인</h1>
            <div>
              <GoogleIcon
                className="cursor-pointer"
                onClick={handleGoogleSignin}
              />
            </div>

            <div>
              <NaverIcon
                className="cursor-pointer"
                onClick={handleNaverSignin}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
