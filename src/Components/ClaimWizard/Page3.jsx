import React from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "./StepIndicator";

export default function Page3() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 -mt-20 -mr-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 rounded-full opacity-30 -mb-20 -ml-10" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-200 rounded-full opacity-20 transform -translate-y-1/2" />

      <div className="max-w-[600px] mx-auto ">
        <StepIndicator currentStep={3} />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl  p-6  mb-12">
          <div className="pt-3">
            <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Here's What We Found
            </h2>
            <p className="text-gray-400 text-center mb-10">
              Based on your situation and policy details, we've analyzed your
              coverage
            </p>
          </div>

          <div className="bg-white shadow-xl p-6 md:p-8 rounded-2xl border border-gray-100">
            {/* Out-of-Pocket Estimate Section */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-5 flex items-center">
                <span className="bg-green-100 p-2 rounded-full text-green-600 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                Out-of-Pocket Estimate
              </h3>
              <div className="space-y-4 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-700">Deductible</span>
                  <span className="font-semibold text-gray-900 bg-white px-4 py-1 rounded-full shadow-sm">
                    $500
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Expected Coverage</span>
                  <span className="font-semibold text-gray-900 bg-white px-4 py-1 rounded-full shadow-sm">
                    80%
                  </span>
                </div>
                <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100 mt-2">
                  <span className="font-medium text-gray-800">
                    Estimated Responsibility
                  </span>
                  <span className="font-bold text-emerald-700 bg-white px-4 py-1 rounded-full shadow-sm">
                    $700 - $1,200
                  </span>
                </div>
              </div>
            </div>

            {/* Key Policy Coverage Section */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-5 flex items-center">
                <span className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                </span>
                Key Policy Coverage
              </h3>
              <div className="space-y-5">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">
                      Collision Coverage
                    </span>
                    <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                      Included
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Covers damage to your vehicle in an accident regardless of
                    fault
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">
                      Rental Car Coverage
                    </span>
                    <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                      Included
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Up to $30/day for 30 days maximum while your vehicle is
                    being repaired
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">
                      Medical Payments
                    </span>
                    <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                      $5,000
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Per person for accident-related medical expenses, regardless
                    of fault
                  </p>
                </div>
              </div>
            </div>

            {/* AI Advice Section */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-5 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full text-purple-600 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </span>
                AI Advice
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Based on your situation, you should file a third-party claim
                    with the at-fault driver's insurance company since they hit
                    you from behind.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Be sure to document all expenses related to the accident,
                    including medical bills and transportation costs.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Your policy includes rental car coverage, which you should
                    take advantage of while your car is being repaired.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-10">
          <button
            onClick={() => navigate("/wizard/page4")}
            className="bg-gradient-to-r from-blue-400 to-purple-300 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Generate Claim Letter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
