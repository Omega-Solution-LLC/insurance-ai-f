import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileTextIcon } from "../Icons/Icons";
import StepIndicator from "./StepIndicator";

export default function Page2() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle the files
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // At least one file has been dropped
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    // Handle file upload logic here
    console.log(files);
    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1),
      type: file.type,
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  return (
    <div className="h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 -mt-20 -mr-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 rounded-full opacity-30 -mb-20 -ml-10" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-200 rounded-full opacity-20 transform -translate-y-1/2" />

      <div className="max-w-[600px] mx-auto ">
        <StepIndicator currentStep={2} />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl  p-6  mb-12">
          <div className="pt-3">
            <h1 className="text-center text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Upload Your Policy
            </h1>
            <p className="text-center text-gray-400 mb-8 max-w-lg mx-auto">
              We'll analyze your policy documents to provide personalized advice
              tailored to your coverage
            </p>
          </div>

          <div className="bg-white shadow-xl p-6 md:p-8 rounded-2xl border border-gray-100">
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="text-blue-500 bg-white p-2 rounded-full shadow-sm mt-1">
                  <FileTextIcon />
                </div>
                <div>
                  <h4 className="text-blue-700 font-medium">
                    Privacy Guarantee
                  </h4>
                  <p className="text-gray-600 mt-1 text-sm">
                    Your documents are analyzed using secure encryption and
                    won't be stored longer than needed to process your claim
                    assistance. We prioritize your privacy.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`border-3 border-dashed rounded-xl transition-all duration-300 ${
                dragActive
                  ? "border-indigo-500 bg-indigo-50 shadow-lg"
                  : "border-gray-300 hover:border-purple-300 hover:bg-purple-50/30"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}>
              <div className="flex flex-col items-center gap-5 p-8 md:p-10">
                <div
                  className={`p-5 rounded-full transition-all duration-300 ${
                    dragActive
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-purple-100 text-purple-500"
                  }`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-medium text-lg mb-2">
                    {dragActive
                      ? "Release to Upload"
                      : "Drag & Drop Your Policy"}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Or select files from your device
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                  />
                  <button
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                    className="bg-gradient-to-r from-blue-400 to-purple-300 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-8 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300">
                    Browse Files
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    PDF
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    JPG
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    JPEG
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    PNG
                  </span>
                  <span className="px-2">Max 10MB</span>
                </div>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">
                    Uploaded Files ({uploadedFiles.length})
                  </h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {uploadedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-600"
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
                        <div>
                          <p className="font-medium text-sm truncate w-48 md:w-64">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {file.size} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors">
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={() => navigate("/wizard/page1")}
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
                Back
              </button>
              <button
                onClick={() => navigate("/wizard/page3")}
                className="bg-gradient-to-r from-blue-400 to-purple-300 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group">
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
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
      </div>
    </div>
  );
}
