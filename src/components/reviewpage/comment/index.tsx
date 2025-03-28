import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import Comment from './Comment';

type CommentType = {
  _id: string;
  userId: UserType;
  content: string;
  imgUrls: string[];
  starpoint: number;
  like: boolean;
  dislike: boolean;
  totalLike: number;
  totalDisLike: number;
  IsOwner: boolean;
  reportstatus: boolean;
  createdAt: string;
  deletedAt: string;
  movieTitle?: string;
  moviePoster?: string;
};

type UserType = {
  nickname: string;
  profile: string;
  _id: string;
};

type InfoType = {
  reviewScore: string;
  reviewLength: number;
};

export interface CommentContextType {
  comment: CommentType;
  setComments?: Dispatch<SetStateAction<CommentType[]>>;
  setReviewInfo?: Dispatch<SetStateAction<InfoType>>;
}

interface CommentProps {
  comments: CommentType[];
  setComments?: Dispatch<SetStateAction<CommentType[]>>;
  setReviewInfo?: Dispatch<SetStateAction<InfoType>>;
  isProfilePage?: boolean;
}

const defaultComment = {
  _id: '',
  userId: {
    nickname: '',
    profile: '',
    _id: '',
  },
  content: '',
  imgUrls: [],
  starpoint: 0,
  like: false,
  dislike: false,
  totalLike: 0,
  totalDisLike: 0,
  IsOwner: false,
  reportstatus: false,
  createdAt: '',
  deletedAt: '',
};

const CommentContext = createContext<CommentContextType>({
  comment: defaultComment,
  setComments: () => {},
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
  const { comments, setComments, setReviewInfo, isProfilePage } = props;

  return (
    <>
      {comments.map((comment, index) => (
        <CommentContext.Provider
          key={index}
          value={{ comment, setComments, setReviewInfo }}
        >
          <Comment
            index={index}
            movieTitle={comment.movieTitle}
            moviePoster={comment.moviePoster}
            isProfilePage={isProfilePage}
          />
          <div className="h-[1px] bg-slate-200 my-5"></div>
        </CommentContext.Provider>
      ))}
    </>
  );
};

export default Comments;
