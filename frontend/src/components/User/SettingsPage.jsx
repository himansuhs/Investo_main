import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          User Settings
        </h2>
        {/* upload profile photo */}
        <Link to="/dashboard/upload-profile-photo">
          <div className="bg-gray-700 shadow-lg rounded-lg p-6 mb-4 hover:bg-gray-600 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-orange-500 text-3xl" />
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">
                  Update Profile Photo
                </h3>
                <p className="text-gray-300">Change your profile photo</p>
              </div>
            </div>
          </div>
        </Link>
        {/* add email */}
        <Link to="/dashboard/add-email">
          <div className="bg-gray-700 shadow-lg rounded-lg p-6 mb-4 hover:bg-gray-600 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-orange-500 text-3xl" />
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">
                  Update Email
                </h3>
                <p className="text-gray-300">Change your email address</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
