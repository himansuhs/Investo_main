import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

import { MdOutlineDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { logoutAPI } from "../../APIServices/users/usersAPI";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlices";
import NotificationCounts from "../Notification/NotificationCounts";

// Utility function for combining classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  // Dispatch hook
  const dispatch = useDispatch();
  // Logout mutation
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutAPI,
  });

  // Logout handler
  const logoutHandler = async () => {
    logoutMutation
      .mutateAsync()
      .then(() => {
        // Dispatch action to logout
        dispatch(logout(null));
      })
      .catch((e) => console.log(e));
  };

  return (
    <Disclosure as="nav" className="bg-gray-900 text-white shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-start items-center">
              <div className="flex justify-center flex-row w-full">
                <div className="-ml-2 mr-2 flex items-left md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Nav links */}
                  <Link
                    to="/posts"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-300 hover:border-gray-600 hover:text-white"
                  >
                    Latest Posts
                  </Link>
                  <Link
                    to="/ranking"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-300 hover:border-gray-600 hover:text-white"
                  >
                    Creators Ranking
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* Logout and Dashboard buttons */}
                  <button
                    onClick={logoutHandler}
                    type="button"
                    className="relative m-2 inline-flex items-center gap-x-1.5 rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <Link to="/dashboard">
                    <button
                      type="button"
                      className="relative mr-1 inline-flex items-center gap-x-1.5 rounded-md bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <MdOutlineDashboard />
                      Dashboard
                    </button>
                  </Link>
                  {/* Notification */}
                  <NotificationCounts />
                </div>
                <div className="hidden md:ml-1 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-1">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard/settings"
                              className={classNames(
                                active ? "bg-gray-700" : "",
                                "block px-4 py-2 text-sm text-gray-300 hover:text-white"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-gray-700" : "",
                                "block px-4 py-2 text-sm text-gray-300 hover:text-white"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navs private links */}
          <Disclosure.Panel className="md:hidden bg-gray-900 text-white">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-300 hover:border-gray-600 hover:bg-gray-800 hover:text-white sm:pl-5 sm:pr-6"
                >
                  Home
                </Disclosure.Button>
              </Link>
              <Link to="/posts">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-300 hover:border-gray-600 hover:bg-gray-800 hover:text-white sm:pl-5 sm:pr-6"
                >
                  Latest Posts
                </Disclosure.Button>
              </Link>
              <Link to="/rankings">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-300 hover:border-gray-600 hover:bg-gray-800 hover:text-white sm:pl-5 sm:pr-6"
                >
                  Creators Ranking
                </Disclosure.Button>
              </Link>
            </div>
            {/* Profile links */}
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-orange-500">
                    <BellIcon
                      className="h-5 w-5 text-orange-200"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link to="/dashboard/settings">
                  <Disclosure.Button
                    as="button"
                    className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white sm:px-6"
                  >
                    Settings
                  </Disclosure.Button>
                </Link>
                <Disclosure.Button
                  as="button"
                  className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white sm:px-6"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
