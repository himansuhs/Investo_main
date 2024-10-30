import React from "react";
import Features from "./Features";
import CallToAction from "./CallToAction";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="overflow-hidden pb-24 bg-gray-900 text-white">
      <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80" />
      </div>
      <div className="container px-4 mx-auto relative">
        <div className="relative z-20">
          <h1 className="text-center text-5xl lg:text-7xl font-bold font-heading mb-6 mt-14 max-w-2xl mx-auto">
            <span>Connect with Investors & Entrepreneurs</span>
            <span className="block text-orange-500">
              Join Our Social Platform
            </span>
          </h1>
          <p className="text-center text-lg mb-10 max-w-lg mx-auto">
            Collaborate with like-minded individuals, share insights, and
            explore opportunities in the business world. Network, learn, and
            grow your financial portfolio with our community of investors and
            entrepreneurs.
          </p>
          <div className="flex justify-center lg:pb-56">
            <Link
              to="/register"
              className="w-full sm:w-auto h-16 inline-flex items-center justify-center text-center py-4 px-6 rounded-full bg-orange-500 border border-orange-600 shadow font-bold font-heading text-white hover:bg-orange-600 focus:ring focus:ring-blue-200 transition duration-200"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {/* <FeaturedPost post={featuredPost} /> */}
      {/* Features */}
      <Features />
      {/* Call to action */}
      <CallToAction />
    </section>
  );
};

export default Home;
