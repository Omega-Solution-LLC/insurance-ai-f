import React, { useState } from "react";
import { FiCheck, FiMail, FiPrinter } from "react-icons/fi";
import { RiDraftLine } from "react-icons/ri";
import QuillEditor from "./QuillEditor";

const Step4Content = ({ handleBack, aiData }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [text, setText] = useState("");

  const handleAction = (action) => {
    setActiveAction(action);
    // Logic for each action would go here
    setTimeout(() => setActiveAction(null), 2000); // Reset after 2 seconds
  };

  return (
    <div className="rounded-3xl p-6 mb-12">
      <div className="pt-3">
        <h2 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Your Claim Letter
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Use this professional letter when contacting your insurance company
        </p>
      </div>
      <div className="bg-white shadow-xl p-6 md:p-8 rounded-2xl border border-gray-100">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl border border-gray-200 mb-8 shadow-inner">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 min-h-[400px] md:min-h-[500px]">
            <QuillEditor
              text={aiData?.applicationTemplate}
              setText={setText}
              minHeight="350px"
              className="h-full"
            />
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
              Make sure to replace [Your Phone Number], [Your Email], [City],
              and [Your Full Name] with your actual information before sending.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8 mb-6">
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

      <div className="flex justify-center">
        <button
          onClick={handleBack}
          className="py-2 px-8 rounded-full font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center">
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Results
        </button>
      </div>
    </div>
  );
};

export default Step4Content;
