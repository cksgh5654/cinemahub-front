import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCommentContext } from '.';
import AspectRatio from '../AspectRatio';
import StarContainer from '../StarContainer';
import LikeComponent from '../LikeComponent';
import ListBarComponent from '../ListComponent';
import Textarea from '../../Textarea';
import Button from '../../Button';
import useLoginStore from '../../../store/useStore';
import CloseIcon from '../../../icons/CloseIcon';
import CameraIcon from '../../../icons/CameraIcon';
import { getPresignedUrl, uploadImageToS3 } from '../../../apis/profile';

const Comment = () => {
  const IsLogin = useLoginStore((set) => set.IsLogin);

  const { comment } = useCommentContext();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editReview, setEditReview] = useState<string>(comment.content);
  const [editStarpoint, setEditStarpoint] = useState<number>(comment.starpoint);
  const [editImgUrls, setEditImgUrls] = useState<string[]>(comment.imgUrls);

  const [files, setFiles] = useState<File[]>([]);
  const [__, setimgUrls] = useState<string[]>([]);

  const uploadRef = useRef<HTMLInputElement>(null);

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

  const handleFilePreview = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (typeof files === 'object' && files !== null && files.length <= 2) {
      const filesArr = Array.from(files);
      setFiles((prev) => [...prev, ...filesArr]);

      for (const file of filesArr) {
        const src = await SingleFileReader(file);
        setEditImgUrls((prev) => [...prev, `${src}`]);
      }
    }
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

  const handleResetFileValue = () => {
    if (uploadRef.current) {
      console.log(uploadRef.current.value);
      uploadRef.current.value = '';
      return;
    }
  };

  const handleRemovePreview = (targetIndex: number) => {
    setEditImgUrls(editImgUrls.filter((_, index) => index !== targetIndex));
    setFiles(files.filter((_, index) => index !== targetIndex));
  };

  const handleRating = (index: number) => {
    setEditStarpoint(index);
  };

  const handleEdit = (edit: boolean) => {
    setEditMode(edit);
  };

  const handleEditReviewInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length > 2000) {
      return;
    }
    setEditReview(value);
  };

  const handleEditReview = async () => {
    try {
      const imgUrls = await handleFileUpload();
      setimgUrls(imgUrls);

      //   const { result, message } = await editReviewFetch({
      //     commentId: comment._id,
      //     imgUrls: editImgUrls,
      //     content: editReview,
      //     starpoint: editStarpoint,
      //   });
      //   if (!result) {
      //     alert(message);
      //     return;
      //   }
      //   alert(message);
    } catch (e) {}
  };

  useEffect(() => {
    if (!uploadRef.current) {
      return;
    }
  }, []);

  return (
    <div className="mt-6">
      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-[36px]">
            <AspectRatio ratio={1 / 1}>
              <AspectRatio.Image
                className="rounded-[18px] w-full h-full"
                src={comment.userId.profile}
                alt={'리뷰 사진'}
              />
            </AspectRatio>
          </div>

          <p className="text-slate-400">{comment.userId.nickname}</p>
          <p className="text-slate-400">{comment.createdAt.split('T')[0]}</p>
        </div>

        <ListBarComponent handleEdit={handleEdit} />
      </div>

      <div className="flex items-center justify-between mt-5">
        {editMode ? (
          <StarContainer
            starRate={editStarpoint}
            handleRating={handleRating}
            defaultStar={0}
          />
        ) : (
          <StarContainer
            handleRating={handleRating}
            defaultStar={comment.starpoint}
          />
        )}
      </div>

      <div className="mt-5 flex gap-2">
        {editMode ? (
          <>
            {IsLogin ? (
              <div className="w-full h-full">
                <div className="flex gap-2">
                  {editImgUrls.map((src, index) => (
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

                  {editImgUrls.length < 2 ? (
                    <label
                      htmlFor="fileupdate"
                      className="block border border-[#DDDDDD] w-[180px] h-full rounded-[5px] hover:bg-[#BDBDBD] cursor-pointer"
                    >
                      <CameraIcon width={'100%'} height={'100%'} />
                    </label>
                  ) : null}
                </div>

                <input
                  ref={uploadRef}
                  style={{ display: 'none' }}
                  type="file"
                  name="fileupdate"
                  id="fileupdate"
                  accept="image/*"
                  onChange={handleFilePreview}
                  onClick={handleResetFileValue}
                  multiple
                />
              </div>
            ) : null}
          </>
        ) : (
          <>
            {comment.imgUrls.map((src, index) => (
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
              </div>
            ))}
          </>
        )}
      </div>

      {editMode ? (
        <div className="mt-2">
          <div className="px-3 py-5 rounded-md bg-[#F1F1F1] border border-[#BFBFBF]">
            <Textarea
              id="editreview"
              placeholder="이 콘텐츠의 어떤 점이 좋거나 싫었는지 다른 사용자들에게 알려주세요. 고객님의 리뷰는 다른 사용자들에게 큰 도움이 됩니다."
              className="w-full h-40 text-md resize-none focus:outline-none"
              value={editReview}
              onChange={handleEditReviewInput}
            />

            <p className="text-slate-400 text-sm float-right">
              {editReview.length}/2000
            </p>
          </div>

          <div className="flex justify-end gap-10">
            <div className="mt-2 w-30">
              <Button
                className="bg-blue-300 hover:bg-blue-500"
                onClick={handleEditReview}
              >
                수정하기
              </Button>
            </div>

            <div className="mt-2 w-30">
              <Button
                onClick={() => {
                  handleEdit(false);
                  setEditReview(comment.content);
                  setEditImgUrls(comment.imgUrls);
                  setEditStarpoint(comment.starpoint);
                }}
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p
          className="mt-2"
          style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
        >
          {comment.content}
        </p>
      )}

      <div className="mt-4">
        <LikeComponent />
      </div>
    </div>
  );
};

export default Comment;
