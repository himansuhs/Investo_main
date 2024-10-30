import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaEye,
  FaDollarSign,
  FaUsers,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
  FaCommentDots,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  sendEmailVerificatonTokenAPI,
  userProfileAPI,
} from "../../APIServices/users/usersAPI";
import AlertMessage from "../Alert/AlertMessage";

const AccountSummaryDashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });

  const hasEmail = data?.user?.email;
  const hasPlan = data?.user?.hasSelectedPlan;
  const isEmailVerified = data?.user?.isEmailVerified;
  const totalFollowers = data?.user?.followers?.length;
  const totalFollowing = data?.user?.following?.length;
  const userPosts = data?.user?.posts?.length;

  let totalViews = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalDislikes = 0;

  data?.user?.posts?.forEach((post) => {
    totalViews += post.viewers.length;
    totalLikes += post.likes.length;
    totalDislikes += post.dislikes.length;
    totalComments += post.comments.length;
  });

  const stats = [
    {
      icon: <FaEye />,
      label: "Views",
      value: totalViews,
      bgColor: "bg-gray-800",
      textColor: "text-white",
      valueColor: "text-gray-300", // Dark gray for the value
    },
    // {
    //   icon: <FaDollarSign />,
    //   label: "Earnings",
    //   value: `$${(0).toFixed(2)}`, // Placeholder for earnings
    //   bgColor: "bg-green-700",
    //   textColor: "text-white",
    //   valueColor: "text-gray-300", // Dark gray for the value
    // },
    {
      icon: <FaUsers />,
      label: "Followers",
      value: totalFollowers || 0,
      bgColor: "bg-gray-800",
      textColor: "text-white",
      valueColor: "text-gray-300", // Dark gray for the value
    },
    {
      icon: <FaThumbsUp />,
      label: "Likes",
      value: totalLikes || 0,
      bgColor: "bg-gray-800",
      textColor: "text-gray-800",
      valueColor: "text-gray-300", // Dark gray for the value
    },
    {
      icon: <FaThumbsDown />,
      label: "Dislikes",
      value: totalDislikes || 0,
      bgColor: "bg-gray-800",
      textColor: "text-white",
      valueColor: "text-gray-300", // Dark gray for the value
    },
    {
      icon: <FaUsers />,
      label: "Following",
      value: totalFollowing || 0,
      bgColor: "bg-gray-800",
      textColor: "text-white",
      valueColor: "text-gray-300", // Dark gray for the value
    },
    {
      icon: <FaFlag />,
      label: "Posts",
      value: userPosts || 0,
      bgColor: "bg-gray-800",
      textColor: "text-white",
      valueColor: "text-gray-300", // Dark gray for the value
    },
    {
      icon: <FaCommentDots />,
      label: "Comments",
      value: totalComments,
      bgColor: "bg-gray-800",
      textColor: "text-white",
      valueColor: "text-gray-300", // Dark gray for the value
    },
  ];

  const verificationTokenMutation = useMutation({
    mutationKey: ["send-email-verification-token"],
    mutationFn: sendEmailVerificatonTokenAPI,
  });

  const handleSendVerificationEmail = async () => {
    verificationTokenMutation.mutate();
  };

  return (
    <div className="p-4 bg-gray-900 text-white">
      <p className="font-bold text-2xl mb-4">
        Welcome Back: {data?.user?.username}
      </p>

      {verificationTokenMutation.isPending && (
        <AlertMessage type="loading" message="Email sending loading..." />
      )}
      {verificationTokenMutation.isError && (
        <AlertMessage
          type="error"
          message={
            verificationTokenMutation?.error?.message ||
            verificationTokenMutation?.error?.response?.data?.message
          }
        />
      )}
      {verificationTokenMutation.isSuccess && (
        <AlertMessage
          type="success"
          message={verificationTokenMutation?.data?.message}
        />
      )}

      {!hasPlan && (
        <div
          className="bg-gray-800 border-l-4 border-yellow-500 text-yellow-300 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Plan Selection Required</p>
          <p>
            Please{" "}
            <Link to="/pricing" className="underline text-yellow-100">
              select a plan
            </Link>{" "}
            to continue using our services.
          </p>
        </div>
      )}
      {!isEmailVerified && (
        <div
          className="bg-gray-800 border-l-4 border-red-500 text-red-300 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Account Verification Needed</p>
          <p>
            Your account is not verified. Please{" "}
            <button
              onClick={handleSendVerificationEmail}
              className="underline text-red-100"
            >
              verify your account
            </button>{" "}
            for full access.
          </p>
        </div>
      )}
      {!hasEmail && (
        <div
          className="bg-blue-800 border-l-4 border-blue-500 text-blue-300 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Email Required</p>
          <p>
            Please{" "}
            <Link to="/add-email" className="underline text-blue-100">
              add an email
            </Link>{" "}
            to your account for important notifications.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} text-white rounded-lg shadow-lg p-6`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{stat.icon}</div>
              <div>
                <div className="text-xl font-semibold">{stat.value}</div>
                <div className="text-sm">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSummaryDashboard;
