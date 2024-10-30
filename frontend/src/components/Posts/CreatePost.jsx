import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTimesCircle } from "react-icons/fa";
import Select from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPostAPI } from "../../APIServices/posts/postsAPI";
import AlertMessage from "../Alert/AlertMessage";
import { fetchCategoriesAPI } from "../../APIServices/category/categoryAPI";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [imageError, setImageErr] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const postMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPostAPI,
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      image: "",
      category: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      image: Yup.string().required("Image is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", values.image);
      formData.append("category", values.category);
      postMutation.mutate(formData);
    },
  });

  const { data } = useQuery({
    queryKey: ["category-lists"],
    queryFn: fetchCategoriesAPI,
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file.size > 1048576) {
      setImageErr("File size exceed 1MB");
      return;
    }
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageErr("Invalid file type");
    }
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const errorMsg = postMutation?.error?.response?.data?.message;

  return (
    <div className="flex items-center justify-center bg-gray-900 min-h-screen">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-8">
          Add New Post
        </h2>

        {isLoading && (
          <AlertMessage type="loading" message="Loading please wait" />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Post created successfully" />
        )}
        {isError && <AlertMessage type="error" message={errorMsg} />}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
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
            {formik.touched.description && formik.errors.description && (
              <span className="text-red-400">{formik.errors.description}</span>
            )}
          </div>

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
              onChange={(option) =>
                formik.setFieldValue("category", option.value)
              }
              value={data?.categories?.find(
                (option) => option.value === formik.values.category
              )}
              className="mt-1 block w-full"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#1F2937", // Dark background
                  color: "white", // Text color
                  borderColor: "#4B5563", // Border color
                }),
                option: (provided) => ({
                  ...provided,
                  backgroundColor: "#1F2937", // Dark background
                  color: "white", // Text color
                }),
              }}
            />
            {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-400">{formik.errors.category}</p>
            )}
          </div>

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
            {formik.touched.image && formik.errors.image && (
              <p className="text-sm text-red-400">{formik.errors.image}</p>
            )}
            {imageError && <p className="text-sm text-red-400">{imageError}</p>}
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

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
