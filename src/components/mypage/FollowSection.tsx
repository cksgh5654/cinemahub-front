import { useState } from "react";
import Button from "../Button";
import profileImg from "/images/profileImg.png";
import closeImg from "/images/close.png";

interface FollowUser {
  nickname: string;
  email: string;
  profileImg?: string;
}

interface FollowSectionProps {
  followerCount: number;
  followingCount: number;
  followerList: FollowUser[];
  followingList: FollowUser[];
}

const FollowSection = ({
  followerCount,
  followingCount,
  followerList,
  followingList,
}: FollowSectionProps) => {
  const [view, setView] = useState<"follower" | "following" | null>(null);

  return (
    <div className="w-full ">
      {view === null ? (
        <div className="w-full flex flex-col gap-2">
          <div className="h-full flex flex-col justify-center items-center border border-[#DFDFDF] rounded-2xl p-4 px-12">
            <p className="font-semibold">팔로워</p>
            <p className="font-bold text-2xl py-4">{followerCount}명</p>
            <Button
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400"
              onClick={() => setView("follower")}
            >
              팔로워 보기
            </Button>
          </div>
          <div className="h-full flex flex-col justify-center items-center border border-[#DFDFDF] rounded-2xl p-4 px-12">
            <p className="font-semibold">팔로잉</p>
            <p className="font-bold text-2xl py-4">{followingCount}명</p>
            <Button
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400"
              onClick={() => setView("following")}
            >
              팔로잉 보기
            </Button>
          </div>
        </div>
      ) : (
        <div className="border border-[#DFDFDF] rounded-2xl p-4 w-full h-full ">
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-xl font-bold">
              {view === "follower" ? "팔로워" : "팔로잉"}
            </h2>
            <button
              className="font-bold cursor-pointer"
              onClick={() => setView(null)}
            >
              <img className="w-8" src={closeImg} alt="닫기 버튼" />
            </button>
          </div>

          <div>
            {(view === "follower" ? followerList : followingList).map(
              (user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2"
                >
                  <div className="w-full flex items-center gap-3">
                    <img
                      src={user.profileImg || profileImg}
                      alt="프로필"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{user.nickname}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Button>팔로우</Button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowSection;
