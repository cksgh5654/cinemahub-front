import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Comment from './Comment';

type CommentType = {
  _id: string;
  userId: UserType;
  content: string;
  createdAt: string;
  imgUrls: string[];
  starpoint: number;
  like: boolean;
  dislike: boolean;
  totalLike: number;
  totalDisLike: number;
  IsOwner: boolean;
  deletedAt: string;
};

type UserType = {
  nickname: string;
  profile: string;
  _id: string;
};

type InfoType = {
  reviewScore: number;
  reviewLength: number;
};

export interface CommentContextType {
  comment: CommentType;
  setCommentsState: Dispatch<SetStateAction<CommentType[]>>;
  setReviewInfo: Dispatch<SetStateAction<InfoType>>;
}

interface CommentProps {
  comments: CommentType[];
  setReviewInfo: Dispatch<SetStateAction<InfoType>>;
}

const defaultComment = {
  _id: '',
  userId: {
    nickname: '',
    profile: '',
    _id: '',
  },
  content: '',
  createdAt: '',
  imgUrls: [],
  starpoint: 0,
  like: false,
  dislike: false,
  totalLike: 0,
  totalDisLike: 0,
  IsOwner: false,
  deletedAt: '',
};

const CommentContext = createContext<CommentContextType>({
  comment: defaultComment,
  setCommentsState: () => {},
  setReviewInfo: () => {},
});

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('CommentContext에서 호출 가능');
  }
  return context;
};

const Comments = (props: CommentProps) => {
  const { comments, setReviewInfo } = props;
  const [commentsState, setCommentsState] = useState<CommentType[]>([]);

  useEffect(() => {
    setCommentsState(comments);
  }, [comments]);

  return (
    <>
      {commentsState.length ? (
        commentsState.map((comment, index) => (
          <CommentContext.Provider
            key={index}
            value={{ comment, setCommentsState, setReviewInfo }}
          >
            <Comment index={index} />
            <div className="h-[1px] bg-slate-200 my-5"></div>
          </CommentContext.Provider>
        ))
      ) : (
        <div className="text-center border border-slate-300 p-5">
          <p>리뷰 조회 내역이 없습니다.</p>
        </div>
      )}
    </>
  );
};

export default Comments;
