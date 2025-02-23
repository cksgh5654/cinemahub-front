import { createContext, useContext } from 'react';
import Comment from './comment';

type CommentType = {
  _id: string;
  userId: UserType;
  content: string;
  createdAt: string;
  image: string;
  starpoint: number;
  totalLike: number;
  totalUnlike: number;
  like: boolean;
  dislike: boolean;
};

type UserType = {
  nickname: string;
  profile: string;
  _id: string;
};

export interface CommentContextType {
  comment: CommentType;
}

interface CommentProps {
  comments: CommentType[];
}

const CommentContext = createContext<CommentContextType>({
  comment: {
    _id: '',
    userId: {
      nickname: '',
      profile: '',
      _id: '',
    },
    content: '',
    createdAt: '',
    image: '',
    starpoint: 0,
    totalLike: 0,
    totalUnlike: 0,
    like: false,
    dislike: false,
  },
});

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('CommentContext에서 호출 가능');
  }
  return context;
};

const Comments = (props: CommentProps) => {
  const { comments } = props;

  return (
    <>
      {comments.map((comment, index) => (
        <CommentContext.Provider key={index} value={{ comment }}>
          <Comment />
        </CommentContext.Provider>
      ))}
    </>
  );
};

export default Comments;
