import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTimesCircle } from "react-icons/fa";
import Select from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPostAPI,
  fetchPost,
  updatePostAPI,
} from "../../APIServices/posts/postsAPI";
import AlertMessage from "../Alert/AlertMessage";
import { fetchCategoriesAPI } from "../../APIServices/category/categoryAPI";
import { useParams } from "react-router-dom";

const CreatePost = () => {
  // Get the post id
  const { postId } = useParams();

  // Fetch the post details
  const { data: postDetails, refetch: refetchPost } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(postId),
  });
  console.log(postDetails);

  // State for WYSIWYG
  const [description, setDescription] = useState("");
  // File upload state
  const [imageError, setImageErr] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Post mutation
  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI,
  });

  const formik = useFormik({
    // Initial data
    initialValues: {
      description: postDetails?.postFound?.description || "",
      image: "",
      category: "",
    },
    enableReinitialize: true,
    // Validation
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      image: Yup.string().required("Image is required"),
      category: Yup.string().required("Category is required"),
    }),
    // Submit
    onSubmit: (values) => {
      // Form data
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", values.image);
      formData.append("category", values.category);
      postMutation.mutate({ formData, postId });
    },
  });

  // Fetch categories
  const { data } = useQuery({
    queryKey: ["category-lists"],
    queryFn: fetchCategoriesAPI,
  });

  // Handle file change
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file.size > 1048576) {
      setImageErr("File size exceeds 1MB");
      return;
    }
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageErr("Invalid file type");
      return;
    }
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Remove image
  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  // Get loading state
  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const errorMsg = postMutation?.error?.response?.data?.message;

  return (
    <div className="flex items-center justify-center bg-gray-900 min-h-screen">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Update New Post
        </h2>
        {/* Show alert */}
        {isLoading && (
          <AlertMessage type="loading" message="Updating, please wait" />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Post updated successfully" />
        )}
        {isError && <AlertMessage type="error" message={errorMsg} />}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Description Input - Using ReactQuill for rich text editing */}
          <div className="mb-10">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <ReactQuill
              value={formik.values.description}
              onChange={(value) => {
                setDescription(value);
                formik.setFieldValue("description", value);
              }}
              className="h-40 text-white"
            />
            {/* Display error message */}
            {formik.touched.description && formik.errors.description && (
              <span className="text-red-400">{formik.errors.description}</span>
            )}
          </div>

          {/* Category Input - Dropdown for selecting post category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300"
            >
              Category
            </label>
            <Select
              name="category"
              options={data?.categories?.map((category) => ({
                value: category._id,
                label: category.categoryName,
              }))}
              onChange={(option) => {
                formik.setFieldValue("category", option.value);
              }}
              value={data?.categories?.find(
                (option) => option.value === formik.values.category
              )}
              className="mt-1 block w-full"
            />
            {/* Display error */}
            {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-400">{formik.errors.category}</p>
            )}
          </div>

          {/* Image Upload Input - File input for uploading images */}
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
                  className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                >
                  <FaTimesCircle className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button - Button to submit the form */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
