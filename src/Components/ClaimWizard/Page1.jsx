import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "./StepIndicator";

export default function Page1() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState("");

  const handleTextChange = (e) => {
    setFormData(e.target.value);
  };

  const handleContinue = () => {
    navigate("/wizard/page2");
  };

  return (
    <div className="h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 -mt-20 -mr-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full opacity-30 -mb-20 -ml-10" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-100 rounded-full opacity-20 transform -translate-y-1/2" />

      <div className="max-w-[600px] mx-auto ">
        <StepIndicator currentStep={1} />
      </div>
      <div className="max-w-3xl mx-auto ">
        <div className="rounded-3xl p-6  mb-12">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Describe Your Situation
            </h1>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Tell us what happened and what you need help with so we can guide
              you through the next steps
            </p>
          </div>

          <div className="bg-white shadow-xl p-6 md:p-8 rounded-2xl border border-gray-100 animate-fade-in-up">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-full mr-3">
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </span>
                  Your Situation
                </h2>
                <div className="relative">
                  <textarea
                    className="w-full h-48 p-5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-gray-50/50"
                    placeholder="For example: I was in a car accident last week. The other driver hit my car from behind while I was stopped at a red light. I've filed a police report and now need to make an insurance claim. I have comprehensive coverage with State Farm, policy #ABC123."
                    value={formData}
                    onChange={handleTextChange}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                    {formData.length > 0 ? `${formData.length} characters` : ""}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                <p className="text-gray-700 font-medium flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Be detailed and include:
                </p>
                <ul className="space-y-3 text-gray-600 ml-6">
                  {[
                    "What happened",
                    "When it happened",
                    "Your insurance provider",
                    "Policy number (if you have it handy)",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start animate-slide-in"
                      style={{ animationDelay: `${index * 150}ms` }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-purple-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end mt-10">
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-blue-400 to-purple-300 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group">
                  Continue
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
