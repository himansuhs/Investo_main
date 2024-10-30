import React from "react";
import { FaLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 border border-gray-700 rounded-4xl py-20 px-8">
          <div className="flex justify-center mb-6">
            <FaLightbulb className="text-yellow-400" size="68" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6 text-center max-w-lg lg:max-w-2xl mx-auto text-white">
            Connect with Investors and Entrepreneurs
          </h1>
          <p className="text-gray-300 text-center mb-10">
            Join our platform to bridge the gap between visionaries and
            investors. Share your ideas, find funding, and grow your business!
          </p>
          <div className="flex justify-center">
            <Link
              className="w-full sm:w-auto text-center py-5 px-8 mb-8 h-16 inline-flex items-center justify-center rounded-full bg-yellow-500 border border-yellow-600 shadow font-bold font-heading text-white hover:bg-yellow-600 focus:ring focus:ring-yellow-200 transition duration-200"
              to="/register"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
