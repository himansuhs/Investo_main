import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../APIServices/users/usersAPI";
import AlertMessage from "../Alert/AlertMessage";

const Register = () => {
  const navigate = useNavigate();
  const userMutation = useMutation({
    mutationKey: ["user-registration"],
    mutationFn: registerAPI,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      userMutation
        .mutateAsync(values)
        .then(() => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="flex flex-wrap pb-24 bg-gray-900 text-white">
      <div className="w-full p-4">
        <div className="flex flex-col justify-center py-24 max-w-md mx-auto h-full">
          <form onSubmit={formik.handleSubmit}>
            <Link
              to="/login"
              className="inline-block text-gray-400 hover:text-gray-300 transition duration-200 mb-8"
            >
              <span>Already have an account?</span>
              <span className="font-bold"> Login</span>
            </Link>

            {userMutation.isPending && (
              <AlertMessage type="loading" message="Loading please wait..." />
            )}
            {userMutation.isSuccess && (
              <AlertMessage type="success" message="Registration success" />
            )}
            {userMutation.isError && (
              <AlertMessage
                type="error"
                message={userMutation.error.response.data.message}
              />
            )}

            <select
              name="role"
              className="bg-gray-800 border border-gray-600 p-2 rounded mb-4 text-white"
            >
              <option value="" label="Select your role" />
              <option value="User" label="User" />
              <option value="BusinessPeople" label="BusinessPeople" />
              <option value="Investor" label="Investor" />
              <option value="Banker" label="Banker" />
              <option value="BusinessAdvisor" label="BusinessAdvisor" />
            </select>

            <label
              className="block text-sm font-medium mb-2"
              htmlFor="textInput1"
            >
              Username
            </label>
            <input
              className="w-full bg-gray-800 text-white rounded-full p-4 outline-none border border-gray-600 placeholder-gray-500 focus:ring focus:ring-orange-500 transition duration-200 mb-4"
              type="text"
              placeholder="Enter username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 mt-1">{formik.errors.username}</div>
            )}

            <label
              className="block text-sm font-medium mb-2"
              htmlFor="textInput1"
            >
              Email
            </label>
            <input
              className="w-full bg-gray-800 text-white rounded-full p-4 outline-none border border-gray-600 placeholder-gray-500 focus:ring focus:ring-orange-500 transition duration-200 mb-4"
              type="text"
              placeholder="john@email.com"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            )}

            <label
              className="block text-sm font-medium mb-2"
              htmlFor="textInput2"
            >
              Password
            </label>
            <div className="flex items-center gap-1 w-full bg-gray-800 rounded-full p-4 border border-gray-600 mb-8">
              <input
                className="outline-none flex-1 placeholder-gray-500 bg-gray-800 text-white"
                id="textInput2"
                type="password"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-500"
              >
                <path
                  d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z"
                  fill="#A3A3A3"
                />
                <path
                  d="M12.0004 9.14C10.4304 9.14 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14 12.0004 9.14Z"
                  fill="#A3A3A3"
                />
              </svg>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 mt-1">{formik.errors.password}</div>
            )}

            <button
              className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-orange-500 w-full text-center border border-orange-600 shadow hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200 mb-8"
              type="submit"
            >
              Sign Up
            </button>

            <a
              href="http://localhost:5000/api/v1/users/auth/google"
              className="h-14 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-gray-800 w-full text-center border border-gray-600 shadow hover:bg-gray-700 focus:ring focus:ring-orange-200 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={21}
                height={20}
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M10.5003 1.91667C12.5358 1.91667 14.3903 2.67493 15.8117 3.91839L13.8037 5.92643C12.9021 5.19326 11.7542 4.75001 10.5003 4.75001C7.601 4.75001 5.25033 7.10068 5.25033 10C5.25033 12.8993 7.601 15.25 10.5003 15.25C12.7863 15.25 14.7244 13.7867 15.4456 11.7501L15.5636 11.4167H15.2099H10.7503V8.58334H17.7503V8.61792H18.0003H18.4637C18.5415 9.06752 18.5837 9.52907 18.5837 10C18.5837 14.464 14.9643 18.0833 10.5003 18.0833C6.03631 18.0833 2.41667 14.464 2.41667 10C2.41667 5.536 6.03631 1.91667 10.5003 1.91667Z"
                  fill="white"
                />
              </svg>
              <span className="text-gray-400">Sign up with Google</span>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
