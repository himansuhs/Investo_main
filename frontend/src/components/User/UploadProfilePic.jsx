import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "react-quill/dist/quill.snow.css";
import { FaTimesCircle } from "react-icons/fa";

import { useMutation } from "@tanstack/react-query";

import AlertMessage from "../Alert/AlertMessage";
import { uplaodProfilePicAPI } from "../../APIServices/users/usersAPI";

const UploadProfilePic = () => {
  // File upload state
  const [imageError, setImageErr] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Post mutation
  const mutation = useMutation({
    mutationKey: ["upload-profile-pic"],
    mutationFn: uplaodProfilePicAPI,
  });

  const formik = useFormik({
    // Initial data
    initialValues: {
      image: "",
    },
    // Validation
    validationSchema: Yup.object({
      image: Yup.string().required("Image is required"),
    }),
    // Submit
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("image", values.image);

      mutation.mutate(formData);
    },
  });

  // Handle file change
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    // Limit file size
    if (file.size > 1048576) {
      setImageErr("File size exceeds 1MB");
      return;
    }
    // Limit the file types
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageErr("Invalid file type");
      return;
    }
    // Set the image preview
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Remove image
  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  // Loading and error states
  const isLoading = mutation.isPending;
  const isError = mutation.isError;
  const isSuccess = mutation.isSuccess;
  const errorMsg = mutation?.error?.response?.data?.message;

  return (
    <div className="flex items-center justify-center bg-gray-900 min-h-screen">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Upload Profile Picture
        </h2>

        {/* Show alerts */}
        {isLoading && (
          <AlertMessage type="loading" message="Loading, please wait" />
        )}
        {isSuccess && (
          <AlertMessage
            type="success"
            message="Profile image has been updated successfully"
          />
        )}
        {isError && <AlertMessage type="error" message={errorMsg} />}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Image Upload Input */}
          <div className="flex flex-col items-center justify-center bg-gray-700 p-4 shadow rounded-lg">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Upload Image
            </label>
            <div className="flex justify-center items-center w-full">
              <input
                id="images"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
              >
                Choose a file
              </label>
            </div>
            {/* Display error message */}
            {formik.touched.image && formik.errors.image && (
              <p className="text-sm text-red-400">{formik.errors.image}</p>
            )}
            {/* Error message */}
            {imageError && <p className="text-sm text-red-400">{imageError}</p>}

            {/* Preview image */}
            {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-full"
                />
                <button
                  onClick={removeImage}
                  className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-full p-1"
                >
                  <FaTimesCircle className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Upload Profile Picture
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProfilePic;
