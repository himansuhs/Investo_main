import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaEye, FaComment } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  dislikePostAPI,
  fetchPost,
  likePostAPI,
} from "../../APIServices/posts/postsAPI";
import { RiUserUnfollowFill, RiUserFollowLine } from "react-icons/ri";
import {
  followUserAPI,
  unfollowUserAPI,
  userProfileAPI,
} from "../../APIServices/users/usersAPI";
import { createCommentAPI } from "../../APIServices/comments/commentsAPI";
import { useFormik } from "formik";

const PostDetails = () => {
  const [comment, setComment] = useState("");
  const { postId } = useParams();

  const {
    isError,
    isLoading,
    data,
    error,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(postId),
  });

  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userProfileAPI(),
  });

  const targetId = data?.postFound?.author;
  const userId = profileData?.user?._id;
  const isFollowing = profileData?.user?.following?.find(
    (user) => user?._id?.toString() === targetId?.toString()
  );

  const followUserMutation = useMutation({
    mutationKey: ["follow"],
    mutationFn: followUserAPI,
  });

  const unfollowUserMutation = useMutation({
    mutationKey: ["unfollow"],
    mutationFn: unfollowUserAPI,
  });

  const likePostMutation = useMutation({
    mutationKey: ["likes"],
    mutationFn: likePostAPI,
  });

  const dislikePostMutation = useMutation({
    mutationKey: ["dislikes"],
    mutationFn: dislikePostAPI,
  });

  const followUserHandler = async () => {
    followUserMutation
      .mutateAsync(targetId)
      .then(() => {
        refetchProfile();
      })
      .catch((e) => console.log(e));
  };

  const unfollowUserHandler = async () => {
    unfollowUserMutation
      .mutateAsync(targetId)
      .then(() => {
        refetchProfile();
      })
      .catch((e) => console.log(e));
  };

  const likePostHandler = async () => {
    likePostMutation
      .mutateAsync(postId)
      .then(() => {
        refetchPost();
      })
      .catch((e) => console.log(e));
  };

  const dislikesPostHandler = async () => {
    dislikePostMutation
      .mutateAsync(postId)
      .then(() => {
        refetchPost();
      })
      .catch((e) => console.log(e));
  };

  const commentMutation = useMutation({
    mutationKey: ["create-comment"],
    mutationFn: createCommentAPI,
  });

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Comment content is required"),
    }),
    onSubmit: (values) => {
      const data = {
        content: values.content,
        postId,
      };
      commentMutation
        .mutateAsync(data)
        .then(() => {
          refetchPost();
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex-grow container mx-auto p-4">
        <div className="bg-gray-800 rounded-lg shadow-lg p-5">
          <img
            src={data?.postFound?.image?.path}
            alt={data?.postFound?.description}
            className="w-full h-64 object-cover rounded-md mb-4"
          />

          <div className="flex gap-4 items-center mb-4">
            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={likePostHandler}
            >
              <FaThumbsUp />
              {data?.postFound?.likes?.length || 0}
            </span>

            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={dislikesPostHandler}
            >
              <FaThumbsDown />
              {data?.postFound?.dislikes?.length || 0}
            </span>

            <span className="flex items-center gap-1">
              <FaEye />
              {data?.postFound?.viewers?.length || 0}
            </span>
          </div>

          {isFollowing ? (
            <button
              onClick={unfollowUserHandler}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <RiUserUnfollowFill className="mr-2" />
              Unfollow
            </button>
          ) : (
            <button
              onClick={followUserHandler}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Follow
              <RiUserFollowLine className="ml-2" />
            </button>
          )}

          <span className="ml-2">{data?.postFound?.author?.username}</span>

          <div className="rendered-html-content mb-2">
            <div
              className="rendered-html-content mb-2"
              dangerouslySetInnerHTML={{ __html: data?.postFound?.description }}
            />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <textarea
              className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-lg mb-2"
              rows="3"
              placeholder="Add a comment..."
              {...formik.getFieldProps("content")}
            ></textarea>

            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500 mb-4 mt-1">
                {formik.errors.content}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
            >
              <FaComment className="inline mr-1" /> Comment
            </button>
          </form>

          <div>
            <h2 className="text-xl font-bold mb-2">Comments:</h2>
            {data?.postFound?.comments?.map((comment, index) => (
              <div key={index} className="border-b border-gray-600 mb-2 pb-2">
                <p className="text-gray-300">{comment.content}</p>
                <span className="text-gray-400 text-sm">
                  - {comment.author?.username}
                </span>
                <small className="text-gray-400 text-sm ml-2">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
