import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { deletePostAPI, fetchAllPosts } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";
import NoDataFound from "../Alert/NoDataFound";
import AlertMessage from "../Alert/AlertMessage";
import PostCategory from "../Category/PostCategory";
import { fetchCategoriesAPI } from "../../APIServices/category/categoryAPI";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import truncateString from "../../utils/truncateString";

const PostsList = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["lists-posts", { ...filters, page }],
    queryFn: () =>
      fetchAllPosts({ ...filters, title: searchTerm, page, limit: 6 }),
  });

  const handleCategoryFilter = (categoryId) => {
    setFilters({ ...filters, category: categoryId });
    setPage(1);
    refetch();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...filters, title: searchTerm });
    setPage(1);
    refetch();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setPage(1);
    refetch();
  };

  const postMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });

  const { data: categories } = useQuery({
    queryKey: ["category-lists"],
    queryFn: fetchCategoriesAPI,
  });

  return (
    <section className="bg-gray-900 text-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6 mt-16">
          Business Insights
        </h1>
        <h2 className="text-4xl font-bold font-heading mb-10">
          Latest Investment Strategies
        </h2>

        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row items-center gap-2 mb-4"
        >
          <div className="flex-grow flex items-center border border-gray-700 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search investments..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow p-2 text-sm bg-gray-800 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 text-white bg-orange-500 hover:bg-blue-600 rounded-r-lg"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={clearFilters}
            className="p-2 text-sm text-orange-500 border border-blue-500 rounded-lg hover:bg-blue-700 flex items-center gap-1"
          >
            <MdClear className="h-4 w-4" />
            Clear Filters
          </button>
        </form>

        {data?.posts?.length <= 0 && (
          <NoDataFound text="No Investments Found" />
        )}
        {isError && (
          <AlertMessage type="error" message="Something went wrong" />
        )}
        {isLoading && (
          <AlertMessage type="loading" message="Loading, please wait" />
        )}

        <PostCategory
          categories={categories}
          onCategorySelect={handleCategoryFilter}
          onClearFilters={clearFilters}
        />

        <div className="flex flex-wrap mb-32 -mx-4">
          {data?.posts?.map((post) => (
            <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <Link to={`/posts/${post._id}`}>
                <div className="bg-gray-800 border border-gray-700 hover:border-orange-500 transition duration-200 rounded-2xl h-full p-3">
                  <div className="relative" style={{ height: 240 }}>
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      src={post?.image?.path}
                      alt={post?._id}
                    />
                  </div>
                  <div className="pt-6 pb-3 px-4">
                    <div
                      className="rendered-html-content mb-2"
                      dangerouslySetInnerHTML={{
                        __html: truncateString(post?.description, 200),
                      }}
                    />
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-gray-400 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={4}
                        height={4}
                        viewBox="0 0 4 4"
                        fill="none"
                      >
                        <circle cx={2} cy={2} r={2} fill="#B8B8B8" />
                      </svg>
                      <div className="py-1 px-2 rounded-md border border-gray-700 text-xs font-medium text-gray-300 inline-block">
                        {post?.category?.categoryName}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center my-8 space-x-4">
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Previous
          </button>
        )}

        <span className="text-sm font-semibold">
          Page {page} of {data?.totalPages}
        </span>

        {page < data?.totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default PostsList;
