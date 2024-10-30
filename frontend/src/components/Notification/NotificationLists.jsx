import React from "react";
import {
  fetchNotificationsAPI,
  readNotificationAPI,
} from "../../APIServices/notifications/nofitificationsAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { data, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotificationsAPI,
  });

  // Filter unread notifications
  const unreadNotifications = data?.filter(
    (notification) => notification?.isRead === false
  );

  // Mutation
  const mutation = useMutation({
    mutationKey: ["read-notification"],
    mutationFn: readNotificationAPI,
  });

  // Read notification handler
  const readNotificationHandler = (id) => {
    mutation
      .mutateAsync(id)
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-900">
      {" "}
      {/* Dark background */}
      <div className="max-w-md w-full mt-5 bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        {" "}
        {/* Dark card background */}
        <div className="bg-gray-700 p-4 text-white text-lg font-semibold rounded-t-lg">
          {" "}
          {/* Dark header */}
          Notifications
        </div>
        <div className="max-h-96 mt-3 overflow-auto">
          {unreadNotifications?.length === 0 ? (
            <p className="text-center text-gray-400 py-4">
              {" "}
              {/* Light gray for empty state */}
              No new notifications
            </p>
          ) : (
            unreadNotifications?.map((notification) => (
              <div
                key={notification.id}
                onClick={() => readNotificationHandler(notification?._id)}
              >
                <div className="border-b cursor-pointer border-gray-600 px-4 py-3 hover:bg-gray-700 transition duration-300 ease-in-out">
                  {" "}
                  {/* Darker border and hover color */}
                  <p className="text-sm text-white font-medium">
                    {" "}
                    {/* White text for message */}
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {" "}
                    {/* Light gray for date */}
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
