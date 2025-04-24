import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import InfographicTimeline from "./InfographicTimeline";

export default function HomePage() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isLogged = localStorage.getItem("isLogged");
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 -mt-20 -mr-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 rounded-full opacity-30 -mb-20 -ml-10" />
      <div className="absolute top-1/2 -left-36 w-64 h-64 bg-indigo-200 rounded-full opacity-20 transform -translate-y-1/2" />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 md:pt-24 pb-20">
          <header className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-3 px-4 py-1 bg-indigo-50 rounded-full">
              <span className="text-indigo-600 font-medium text-sm">
                Simplify your insurance claims
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-500 text-transparent bg-clip-text">
                AI-Powered
              </span>{" "}
              Insurance Claim <span className="block">Assistant</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Get personalized advice, understand your coverage, and generate
              claim letters in minutes instead of days.
            </p>

            <button
              onClick={() => navigate(`${isLogged ? "/wizard" : "/login"}`)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="space-x-2 bg-gradient-to-r cursor-pointer from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out">
              <p className="font-medium flex items-center gap-2">
                Start My Claim{" "}
                <FiArrowRight
                  className={`transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </p>
            </button>
          </header>

          {/* Feature Showcase Card */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Card design elements */}
              <div className="absolute -right-10 top-0 w-40 h-40 bg-indigo-50 rounded-full"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-violet-50 rounded-full"></div>

              <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Left Side - Features */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                        <IoMdCheckmarkCircleOutline size={24} />
                      </div>
                      <div className="p-3 bg-violet-100 rounded-lg text-violet-600">
                        <LiaFileInvoiceSolid size={24} />
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      AI + Human Expertise
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mt-1 p-1 bg-green-100 rounded-full text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-600">
                          Analyze policy documents instantly
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="mt-1 p-1 bg-green-100 rounded-full text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-600">
                          Get personalized claim advice
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="mt-1 p-1 bg-green-100 rounded-full text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-600">
                          Generate professional claim letters
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Illustration */}
                  <div className="flex-1 flex justify-center">
                    <div className="relative w-64 h-64 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl flex items-center justify-center">
                      <div className="absolute inset-0 bg-white/50 rounded-2xl shadow-inner"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <p className="text-lg font-medium text-gray-800">
                          Secure & Confidential
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Your data is always protected
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1 bg-violet-50 rounded-full">
            <span className="text-violet-600 font-medium text-sm">
              Simple 3-step process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our AI-powered system simplifies the insurance claim process so you
            can get back to what matters most.
          </p>
        </div>

        <InfographicTimeline />
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-violet-900 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">93%</p>
              <p className="text-indigo-200 mt-2">Faster Claim Processing</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">12,000+</p>
              <p className="text-indigo-200 mt-2">Claims Processed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">$2.4M</p>
              <p className="text-indigo-200 mt-2">Saved for Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to simplify your insurance claim?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our AI assistant will guide you through every step of the process,
            making it faster and easier than ever.
          </p>
          <button
            onClick={() => navigate("/wizard/page1")}
            className="bg-gradient-to-r cursor-pointer from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out font-medium">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
