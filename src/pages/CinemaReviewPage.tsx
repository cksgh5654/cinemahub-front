import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import StarContainer from '../components/reviewpage/StarContainer';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import AspectRatio from '../components/reviewpage/AspectRatio';

import {
  getMovieidCommentArrayFetch,
  RegisterReviewFetch,
} from '../apis/review';
import useLoginStore from '../store/useStore';
import { emptyChecker } from '../util/emptyCheck';
import CloseIcon from '../icons/CloseIcon';
import CameraIcon from '../icons/CameraIcon';
import Comments from '../components/reviewpage/comment';
import { getPresignedUrl, uploadImageToS3 } from '../apis/profile';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { movieDetail } from '../apis/movie';

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
};

type UserType = {
  nickname: string;
  profile: string;
  _id: string;
};

const CinemaReviewPage = () => {
  const IsLogin = useLoginStore((set) => set.IsLogin);

  const [searchParams] = useSearchParams();
  const movieId = searchParams.get('movie') || '';

  const navigator = useNavigate();

  const [movieTitle, setMovieTitle] = useState<string>('');
  const [comments, setComments] = useState<CommentType[]>([]);
  const [starRate, setStarRate] = useState(0);
  const [review, setReview] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [_, setimgUrls] = useState<string[]>([]);
  const [totalStarPoint, setTotalStarPoint] = useState<number>(0);

  const SingleFileReader = async (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        try {
          resolve(fileReader.result);
        } catch (err) {
          if (err instanceof Error) {
            reject(new Error(err.message));
          }
        }
      };
    });
  };

  const handleFilePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (typeof files === 'object' && files !== null && files.length <= 2) {
      const filesArr = Array.from(files);
      setFiles((prev) => [...prev, ...filesArr]);
      filesArr.forEach(async (file) => {
        const src = await SingleFileReader(file);
        setImageSrcs((prev) => [...prev, `${src}`]);
      });
    }
  };

  const handleRemovePreview = (targetIndex: number) => {
    setImageSrcs((prev) => prev.filter((_, index) => index !== targetIndex));
    setFiles((prev) => prev.filter((_, index) => index !== targetIndex));
  };

  const handleReviewInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    if (value.length > 2000) {
      return;
    }
    setReview(value);
  };

  const handleRating = (index: number) => {
    setStarRate(index);
  };

  const handleFileUpload = async () => {
    let imgUrls = [];

    if (files.length !== 0) {
      for (const file of files) {
        const presignedUrl = await getPresignedUrl(file.name);
        await uploadImageToS3(presignedUrl, file);
        const imgUrl = presignedUrl.split('?')[0];
        imgUrls.push(imgUrl);
      }
    }
    return imgUrls;
  };

  const handleRegisterReview = async () => {
    console.log(emptyChecker({ movieId, review, starRate }));

    if (emptyChecker({ movieId, review, starRate })) {
      alert('별점과 리뷰 내용을 적어주세요.');
      return;
    }

    try {
      const imgUrls = await handleFileUpload();
      setimgUrls(imgUrls);

      const { result, message } = await RegisterReviewFetch({
        movieId,
        imgUrls,
        content: review,
        starpoint: starRate,
      });

      if (!result) {
        alert(message);
        return;
      }

      alert(message);
      setReview(''); // 글 초기화
      setStarRate(0); // 별점 초기화
      setImageSrcs([]);
      handleGetComments(); // 목록 갱신
    } catch (e) {}
  };

  const handleGetComments = async () => {
    try {
      const { result, data, message } = await getMovieidCommentArrayFetch({
        movieId,
      });
      if (!result) {
        alert(message);
        return;
      }
      const { totalstarpoint, reviews } = data;
      setComments(reviews);
      setTotalStarPoint(totalstarpoint);
    } catch (e) {}
  };

  const getMovieTitle = async (movieId: string) => {
    try {
      const castingMovieId = Number(movieId);
      const response = await movieDetail(castingMovieId);

      if (emptyChecker({ response })) {
        alert(
          '영화 정보를 참조하지 못했어요. 리뷰 상세보기를 눌러 다시 진행해주세요.'
        );
        navigator('/', { replace: true });
        return;
      }
      setMovieTitle(response.title);
      handleGetComments();
    } catch (e) {}
  };

  useEffect(() => {
    if (emptyChecker({ movieId })) {
      alert(
        '영화 정보를 참조하지 못했어요. 리뷰 상세보기를 눌러 다시 진행해주세요.'
      );
      navigator('/', { replace: true });
      return;
    } else {
      getMovieTitle(movieId);
    }
  }, []);

  return (
    <>
      <div className="p-10 min-w-[480px] max-w-5xl mx-auto">
        <div className="p-10 bg-[#FBFBFB]">
          <div>
            <p className="text-3xl">{movieTitle}</p>
            <div className="flex gap-5 mt-5 items-center justify-between">
              <div className="flex gap-5">
                {IsLogin ? (
                  <StarContainer
                    starRate={starRate}
                    handleRating={handleRating}
                    defaultStar={0}
                  />
                ) : null}

                <p className="">{comments.length}개 리뷰</p>
              </div>

              <p className="text-3xl font-bold">평점 {totalStarPoint}</p>
            </div>

            {IsLogin ? (
              <div className="mt-5 w-full h-full">
                <div className="flex gap-5">
                  {imageSrcs.map((src, index) => (
                    <div
                      key={`image-src-${index}`}
                      className="relative w-[180px] h-full rounded-[5px] border border-[#DDDDDD]"
                    >
                      <AspectRatio ratio={1 / 1}>
                        <AspectRatio.Image
                          className="w-full h-full"
                          src={src}
                          alt={'리뷰 사진'}
                        />
                      </AspectRatio>

                      <div
                        onClick={() => handleRemovePreview(index)}
                        className="absolute w-[12px] top-1 right-1"
                      >
                        <CloseIcon width={'100%'} height={'100%'} />
                      </div>

                      <div className="absolute top-0 right-0 z-1" />
                    </div>
                  ))}

                  {imageSrcs.length < 2 ? (
                    <label
                      htmlFor="fileInput"
                      className="block border border-[#DDDDDD] w-[180px] h-full p-[50px] rounded-[5px] hover:bg-[#BDBDBD] cursor-pointer"
                    >
                      <CameraIcon width={'100%'} height={'100%'} />
                    </label>
                  ) : null}
                </div>

                <input
                  style={{ display: 'none' }}
                  type="file"
                  name="fileInput"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleFilePreview}
                  multiple
                />
              </div>
            ) : null}
          </div>

          <div className="h-[1px] bg-slate-200 my-5"></div>

          {IsLogin ? (
            <div>
              <label htmlFor="review" className="text-lg">
                리뷰 작성하기
              </label>

              <div className="mt-2">
                <div className="px-3 py-5 rounded-md bg-[#F1F1F1] border border-[#BFBFBF]">
                  <Textarea
                    id="review"
                    placeholder="이 콘텐츠의 어떤 점이 좋거나 싫었는지 다른 사용자들에게 알려주세요. 고객님의 리뷰는 다른 사용자들에게 큰 도움이 됩니다."
                    className="w-full h-40 text-md resize-none focus:outline-none"
                    value={review}
                    onChange={handleReviewInput}
                  />

                  <p className="text-slate-400 text-sm float-right">
                    {review.length}/2000
                  </p>
                </div>

                <Button className="mt-2 h-10" onClick={handleRegisterReview}>
                  등록하기
                </Button>
              </div>
            </div>
          ) : null}

          <div className="mt-5">
            {comments.length ? (
              <Comments comments={comments} />
            ) : (
              <>
                <div className="text-center border border-slate-300 p-5">
                  <p>리뷰 조회 내역이 없습니다.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CinemaReviewPage;
