import React, { useState } from "react";
import { FiCheck, FiMail, FiPrinter } from "react-icons/fi";
import { RiDraftLine } from "react-icons/ri";
import StepIndicator from "./StepIndicator";

export default function Page4() {
  const [activeAction, setActiveAction] = useState(null);

  const handleAction = (action) => {
    setActiveAction(action);
    // Logic for each action would go here
    setTimeout(() => setActiveAction(null), 2000); // Reset after 2 seconds
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 -mt-20 -mr-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 rounded-full opacity-30 -mb-20 -ml-10" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-200 rounded-full opacity-20 transform -translate-y-1/2" />
      <div className="max-w-[600px] mx-auto mt-5">
        <StepIndicator currentStep={4} />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl  p-6 md:p-10 mb-12">
          <div className="pt-3">
            <h2 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Your Claim Letter
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Use this professional letter when contacting your insurance
              company
            </p>
          </div>
          <div className="bg-white shadow-xl p-6 md:p-8 rounded-2xl border border-gray-100">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl border border-gray-200 mb-8 shadow-inner">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <p className="text-gray-500 text-sm mb-1">To:</p>
                    <p className="font-medium text-gray-800">
                      Claims Department - State Farm Insurance
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-4">
                    <p className="text-gray-500 text-sm mb-1">Subject:</p>
                    <p className="font-medium text-gray-800">
                      Claim for Auto Accident on April 10, 2025 - Policy #ABC123
                    </p>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="mb-4">Dear Claims Representative,</p>

                    <p className="mb-4">
                      I am writing to file a claim regarding an auto accident
                      that occurred on April 10, 2025, at approximately 2:30 PM
                      at the intersection of Main Street and Oak Avenue. I was
                      stopped at a red light when my vehicle was struck from
                      behind by another driver.
                    </p>

                    <p className="mb-4">
                      I have filed a police report (Report #2025-0410-287) with
                      the [City] Police Department, and the responding officer
                      determined that the other driver was at fault. The other
                      driver has been identified as John Doe, with insurance
                      through Acme Insurance (Policy #XYZ789).
                    </p>

                    <p className="mb-4">
                      Based on my policy coverage, I understand that I have:
                    </p>
                    <ul className="mb-4 space-y-2 list-inside pl-0">
                      {[
                        "Collision coverage with a $500 deductible",
                        "Rental car reimbursement up to $30/day for 30 days",
                        "Medical payments coverage of $5,000 per person",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="inline-block rounded-full bg-green-100 p-1 text-green-600 mt-0.5 flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mb-4">
                      Please advise on next steps for processing this claim. I
                      can be reached at [Your Phone Number] or [Your Email] for
                      any additional information you may require.
                    </p>

                    <p className="mb-6">
                      Thank you for your prompt attention to this matter.
                    </p>

                    <div className="border-t border-gray-100 pt-4 mt-6">
                      <p className="mb-1">Sincerely,</p>
                      <p className="font-medium">[Your Full Name]</p>
                      <p className="text-gray-600">Policy #ABC123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex items-start">
              <div className="text-blue-500 p-2 bg-white rounded-full shadow-sm mr-4 flex-shrink-0">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-blue-700 mb-1">
                  Customize Before Sending
                </h4>
                <p className="text-blue-600 text-sm">
                  Make sure to replace [Your Phone Number], [Your Email],
                  [City], and [Your Full Name] with your actual information
                  before sending.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => handleAction("draft")}
            className={`flex items-center justify-center gap-2 py-2 px-8 rounded-full text-sm font-medium ${
              activeAction === "draft"
                ? "bg-gray-700 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            } transition-all duration-300 shadow-sm hover:shadow`}>
            {activeAction === "draft" ? (
              <FiCheck className="text-green-400" />
            ) : (
              <RiDraftLine className="text-gray-500" />
            )}
            {activeAction === "draft" ? "Saved" : "Save as Draft"}
          </button>

          <button
            onClick={() => handleAction("print")}
            className={`flex items-center justify-center gap-2 py-2 px-8 rounded-full text-sm font-medium ${
              activeAction === "print"
                ? "bg-gray-700 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            } transition-all duration-300 shadow-sm hover:shadow`}>
            {activeAction === "print" ? (
              <FiCheck className="text-green-400" />
            ) : (
              <FiPrinter className="text-gray-500" />
            )}
            {activeAction === "print" ? "Printing..." : "Print Letter"}
          </button>

          <button
            onClick={() => handleAction("email")}
            className={`flex items-center justify-center gap-2 py-2 px-8 rounded-full text-sm font-medium ${
              activeAction === "email"
                ? "bg-gradient-to-r from-green-600 to-green-500 text-white"
                : "bg-gradient-to-r from-blue-400 to-purple-300 hover:from-blue-500 hover:to-purple-400 text-white"
            } transition-all duration-300 shadow-lg hover:shadow-xl`}>
            {activeAction === "email" ? <FiCheck /> : <FiMail />}
            {activeAction === "email" ? "Email Sent!" : "Send Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
