import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../APIServices/users/usersAPI";
import AlertMessage from "../Alert/AlertMessage";

const Login = () => {
  // Navigate
  const navigate = useNavigate();
  // User mutation
  const userMutation = useMutation({
    mutationKey: ["user-login"],
    mutationFn: loginAPI,
  });
  // Formik config
  const formik = useFormik({
    // Initial data
    initialValues: {
      username: "himansu",
      password: "123456",
    },
    // Validation
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    // Submit
    onSubmit: (values) => {
      userMutation
        .mutateAsync(values)
        .then(() => {
          // Redirect
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="flex flex-wrap pb-24 bg-gray-900 min-h-screen">
      <div className="w-full p-4">
        <div className="flex flex-col justify-center py-24 max-w-md mx-auto h-full">
          <form onSubmit={formik.handleSubmit}>
            <Link
              to="/register"
              className="inline-block text-gray-400 hover:text-gray-300 transition duration-200 mb-8"
            >
              <span>Don't have an account?</span>{" "}
              <span className="font-bold">Register</span>
            </Link>

            {/* Show alert messages */}
            {userMutation.isPending && (
              <AlertMessage type="loading" message="Loading, please wait..." />
            )}
            {userMutation.isSuccess && (
              <AlertMessage type="success" message="Login successful!" />
            )}
            {userMutation.isError && (
              <AlertMessage
                type="error"
                message={userMutation.error.response.data.message}
              />
            )}

            <select
              name="role"
              className="border bg-gray-800 text-white p-2 rounded mb-4"
            >
              <option value="" label="Select your role" />
              <option value="User" label="User" />
              <option value="BusinessPeople" label="Business People" />
              <option value="Investor" label="Investor" />
              <option value="Banker" label="Banker" />
              <option value="BusinessAdvisor" label="Business Advisor" />
            </select>

            <label
              className="block text-sm text-gray-300 font-medium mb-2"
              htmlFor="textInput1"
            >
              Username
            </label>
            <input
              className="w-full rounded-full p-4 outline-none bg-gray-800 text-white border border-gray-700 placeholder-gray-500 focus:ring focus:ring-orange-500 transition duration-200 mb-4"
              type="text"
              placeholder="Enter username"
              {...formik.getFieldProps("username")}
            />
            {/* Error message for username */}
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 mt-1">{formik.errors.username}</div>
            )}

            <label
              className="block text-sm text-gray-300 font-medium mb-2"
              htmlFor="textInput2"
            >
              Password
            </label>
            <div className="flex items-center gap-1 w-full rounded-full mb-8">
              <input
                className="flex-1 rounded-full p-4 outline-none bg-gray-800 text-white border border-gray-700 placeholder-gray-500 focus:ring focus:ring-orange-500 transition duration-200"
                id="textInput2"
                type="password"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
              />
              {/* Password visibility icon can be added here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z"
                  fill="#A3A3A3"
                />
              </svg>
            </div>

            {/* Error message for password */}
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 mt-1">{formik.errors.password}</div>
            )}

            <button
              className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold rounded-full bg-orange-500 w-full text-center border border-orange-600 shadow hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200 mb-8"
              type="submit"
            >
              Login
            </button>

            {/* Login with Google */}
            <a
              href="http://localhost:5000/api/v1/users/auth/google"
              className="h-14 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-gray-800 text-white w-full text-center border border-gray-700 shadow hover:bg-gray-700 focus:ring focus:ring-orange-200 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={21}
                height={20}
                viewBox="0 0 21 20"
                fill="none"
              >
                {/* Google SVG Path */}
                <path
                  d="M10.5003 1.91667C12.5358 1.91667 14.3903 2.67493 15.8117 3.91839L13.8037 5.92643C12.9021 5.19326 11.7542 4.75001 10.5003 4.75001C7.601 4.75001 5.25033 7.10068 5.25033 10C5.25033 12.8993 7.601 15.25 10.5003 15.25C12.7863 15.25 14.7244 13.7867 15.4456 11.7501L15.5636 11.4167H15.2099H10.7503V8.58334H17.7503V8.61792H18.0003H18.4637C18.5415 9.06752 18.5837 9.52907 18.5837 10C18.5837 14.464 14.9643 18.0833 10.5003 18.0833C6.03631 18.0833 2.41699 14.464 2.41699 10C2.41699 5.53599 6.03631 1.91667 10.5003 1.91667Z"
                  fill="#FFC107"
                  stroke="#FFC107"
                  strokeWidth="0.5"
                />
              </svg>
              <span className="font-bold">Sign in with Google</span>
            </a>

            {/* Forgot password link */}
            <Link
              className="mt-10 text-indigo-400 hover:text-indigo-300"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
