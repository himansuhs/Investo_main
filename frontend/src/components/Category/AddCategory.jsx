import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { addCategoryAPI } from "../../APIServices/category/categoryAPI";
import AlertMessage from "../Alert/AlertMessage";

const AddCategory = () => {
  // Category mutation
  const categoryMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: addCategoryAPI,
  });

  const formik = useFormik({
    // Initial data
    initialValues: {
      categoryName: "",
    },
    // Validation
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category name is required"),
    }),
    // Submit
    onSubmit: (values) => {
      categoryMutation.mutate(values);
    },
  });

  console.log(categoryMutation);

  return (
    <div className="flex flex-wrap bg-gray-900 min-h-screen p-4">
      <div className="w-full p-4">
        <div className="flex flex-col justify-center max-w-md mx-auto h-full py-12">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h1 className="text-3xl font-bold font-heading mb-4 text-white">
              Add Category
            </h1>

            {/* Show loading */}
            {categoryMutation.isPending && (
              <AlertMessage type="loading" message="Loading, please wait..." />
            )}
            {categoryMutation.isSuccess && (
              <AlertMessage
                type="success"
                message="Category created successfully"
              />
            )}
            {categoryMutation.isError && (
              <AlertMessage
                type="error"
                message={categoryMutation?.error?.response?.data?.message}
              />
            )}

            {/* Category Name */}
            <input
              type="text"
              {...formik.getFieldProps("categoryName")}
              className="w-full rounded-full p-4 outline-none border border-gray-700 bg-gray-900 text-white shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4"
              placeholder="Category Name"
            />
            {formik.touched.categoryName && formik.errors.categoryName && (
              <div className="text-red-500 mb-4 mt-1">
                {formik.errors.categoryName}
              </div>
            )}

            <button
              className="w-full py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              type="submit"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
