import React from "react";
import {
  FaBriefcase,
  FaUsersCog,
  FaChartBar,
  FaHandHoldingUsd,
  FaTrophy,
  FaComments,
} from "react-icons/fa";

const Features = () => {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <p className="uppercase text-blue-500 text-center text-sm font-bold mb-4">
          UNIQUE FEATURES
        </p>
        <h1 className="text-center text-4xl lg:text-5xl font-bold mb-24">
          Connect, Collaborate, and Capitalize
        </h1>
        <div className="flex flex-wrap -mx-4">
          {/* Feature 1: Networking Opportunities */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-blue-600 ml-4">
                  <FaUsersCog className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-700 flex-1">
                <div className="absolute top-0 -left-px bg-blue-600 w-0.5 h-6" />
                <h2 className="text-2xl font-bold mb-4">Expand Your Network</h2>
                <p className="text-gray-400">
                  Connect with like-minded entrepreneurs and investors to foster
                  meaningful partnerships and opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Investment Insights */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4 border-l border-dashed border-gray-700 lg:border-transparent">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-green-500 ml-4">
                  <FaChartBar className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-700 flex-1">
                <div className="absolute top-0 -left-px bg-green-500 w-0.5 h-6" />
                <h2 className="text-2xl font-bold mb-4">
                  Gain Investment Insights
                </h2>
                <p className="text-gray-400">
                  Access real-time data and analytics to make informed
                  investment decisions and maximize your returns.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Secure Transactions */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-purple-600 ml-4">
                  <FaHandHoldingUsd className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-700 flex-1">
                <div className="absolute top-0 -left-px bg-purple-600 w-0.5 h-6" />
                <h2 className="text-2xl font-bold mb-4">
                  Secure Your Transactions
                </h2>
                <p className="text-gray-400">
                  Experience peace of mind with secure payment methods and
                  transaction tracking for all your investments.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4: Collaborative Projects */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-yellow-500 ml-4">
                  <FaTrophy className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-700 flex-1">
                <div className="absolute top-0 -left-px bg-yellow-500 w-0.5 h-6" />
                <h2 className="text-2xl font-bold mb-4">
                  Collaborate on Projects
                </h2>
                <p className="text-gray-400">
                  Work together with investors and entrepreneurs on exciting
                  projects to bring innovative ideas to life.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 5: Feedback and Support */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-red-600 ml-4">
                  <FaComments className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-700 flex-1">
                <div className="absolute top-0 -left-px bg-red-600 w-0.5 h-6" />
                <h2 className="text-2xl font-bold mb-4">
                  Get Feedback and Support
                </h2>
                <p className="text-gray-400">
                  Engage with experts and peers to receive feedback on your
                  ideas and gain valuable support on your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
