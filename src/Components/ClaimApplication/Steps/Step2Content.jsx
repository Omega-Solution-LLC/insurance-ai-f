import { useState } from "react";
import { useAddDocumentMutation } from "../../../Redux/features/documents/documentsApi";
import { FileTextIcon } from "../../Icons/Icons";

const Step2Content = ({
  uploadedFiles,
  handleFiles,
  removeFile,
  handleContinue,
  handleBack,
  formData,
  setFormData,
  setAiData,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileSelected, setFileSelected] = useState([]);
  const [error, setError] = useState("");
  const customerId = localStorage.getItem("id");

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
      // Check if user is trying to upload more than one file
      if (e.dataTransfer.files.length > 1 || uploadedFiles.length >= 1) {
        setError("Only one file can be uploaded");
        return;
      }

      // Check if all files are PDFs
      const files = Array.from(e.dataTransfer.files);
      const nonPdfFiles = files.filter(
        (file) => file.type !== "application/pdf"
      );

      if (nonPdfFiles.length > 0) {
        setError("Only PDF files are allowed");
        return;
      }

      setFileSelected((prev) => [...prev, files[0]]);
      handleFiles(
        files.map((file) => ({
          name: file.name,
          size: (file.size / 1024).toFixed(1),
          type: file.type,
          // Add a unique identifier to each file for drag and drop as well
          id: Date.now() + "-" + Math.random().toString(36).substr(2, 9),
        }))
      );
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Check if user is trying to upload more than one file
      if (e.target.files.length > 1 || uploadedFiles.length >= 1) {
        setError("Only one file can be uploaded");
        return;
      }

      // Check if the file is a PDF
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }

      setFileSelected((prev) => [...prev, file]);
      handleFiles(
        Array.from(e.target.files).map((file) => ({
          name: file.name,
          size: (file.size / 1024).toFixed(1),
          type: file.type,
          // Add a unique identifier to each file
          id: Date.now() + "-" + Math.random().toString(36).substr(2, 9),
        }))
      );
    }
  };

  const [addDocuments, { isLoading }] = useAddDocumentMutation();
  const handleSubmit = async () => {
    // Validate if files are attached
    if (fileSelected.length === 0 || uploadedFiles.length === 0) {
      setError("Please upload at least one document to continue");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      setIsSubmitting(true);
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("situation", formData?.description || "");
      formDataToSubmit.append("date", formData?.date || "");
      formDataToSubmit.append("time", formData?.time || "");
      {
        customerId && formDataToSubmit.append("customerId", customerId);
      }

      fileSelected.forEach((file) => {
        formDataToSubmit.append("files[]", file);
      });

      const response = await addDocuments(formDataToSubmit);
      if (response?.data) {
        handleContinue();
      }
      setAiData(response?.data);
    } catch (error) {
      console.error("Error submitting files:", error);
      // setFormData({
      //   ...formData,
      //   uploadedFiles: [],
      // });
      console.log("Error:", error);
      setFileSelected([]);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl p-6 mb-12">
      <div className="pt-3">
        <h1 className="text-center text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Upload Your Policy
        </h1>
        <p className="text-center text-gray-400 mb-8 max-w-lg mx-auto text-sm">
          We'll analyze your policy documents to provide personalized advice
          tailored to your coverage
        </p>
      </div>

      <div className=" shadow-xl p-6 md:p-8 rounded-2xl ">
        <div className="mb-8 rounded-xl p-5 bg-gray-50 ">
          <div className="flex items-start gap-3">
            <div className="text-purple-500 bg-white p-2 rounded-full shadow-sm mt-1">
              <FileTextIcon />
            </div>
            <div>
              <h4 className="text-gray-700 ">Privacy Guarantee</h4>
              <p className="text-gray-600 mt-1 text-sm">
                Your documents are analyzed using secure encryption and won't be
                stored longer than needed to process your claim assistance. We
                prioritize your privacy.
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
                {dragActive ? "Release to Upload" : "Drag & Drop Your Policy"}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Or select files from your device
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileInput}
                accept=".pdf"
                multiple
              />
              <button
                onClick={() => document.getElementById("file-upload").click()}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-2 px-8 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                Browse Files
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 mt-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full">PDF</span>

              <span className="px-2">Max 20MB</span>
            </div>
          </div>
        </div>

        {uploadedFiles?.length > 0 && (
          <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-700">
                Uploaded Files ({uploadedFiles?.length})
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {uploadedFiles?.map((file, index) => (
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
                        {file?.name}
                      </p>
                      <p className="text-xs text-gray-500">{file?.size} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors cursor-pointer">
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

        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="py-2 px-8 cursor-pointer rounded-full font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center">
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-2 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group cursor-pointer ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}>
            {isSubmitting ? "Submitting..." : "Continue"}
            {!isSubmitting && (
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
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2Content;
