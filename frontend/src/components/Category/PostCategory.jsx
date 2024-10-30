import React from "react";

const PostCategory = ({ categories, onCategorySelect, onClearFilters }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {/* All Articles Category */}
      <button
        className="h-10 inline-flex items-center justify-center w-full sm:w-auto text-center py-3 px-4 rounded-full bg-gray-800 border border-gray-700 text-sm font-semibold text-white hover:bg-gray-700 focus:ring focus:ring-orange-200 transition duration-200"
        onClick={onClearFilters}
      >
        All Investments
      </button>
      {/* Dynamic Categories */}
      {categories?.categories?.map((category) => (
        <button
          key={category._id}
          className="h-10 inline-flex items-center justify-center w-full sm:w-auto text-center py-3 px-4 rounded-full bg-gray-800 border border-gray-700 text-sm font-semibold text-white hover:bg-gray-700 focus:ring focus:ring-orange-200 transition duration-200"
          onClick={() => onCategorySelect(category._id)}
        >
          {category.categoryName} ({category.posts?.length})
        </button>
      ))}
    </div>
  );
};

export default PostCategory;
