import { useState } from "react";
import DateTimePicker from "../DateTimePicker";

const Step1Content = ({
  description,
  handleTextChange,
  handleContinue,
  formData,
  setFormData,
}) => {
  const [validationError, setValidationError] = useState(false);
  const [validateDate, setValidateDate] = useState(false);
  const [validateTime, setValidateTime] = useState(false);

  const validateAndContinue = () => {
    if (!description || description.trim() === "") {
      setValidationError(true);
      return;
    }
    if (formData.date === "") {
      setValidateDate(true);
      return;
    }
    if (formData.time === "") {
      setValidateTime(true);
      return;
    }
    setValidationError(false);
    handleContinue();
  };

  return (
    <div className="rounded-3xl p-6 mb-12">
      <div className="text-center animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Describe Your Situation
        </h1>
        <p className="text-gray-400 mb-10 max-w-3xl mx-auto text-sm">
          Tell us what happened and what you need help with so we can guide you
          through the next steps
        </p>
      </div>

      <div className="bg-white shadow-xl p-6 md:p-8 rounded-2xl border border-gray-100 animate-fade-in-up ">
        <div className="space-y-8">
          <DateTimePicker
            formData={formData}
            setFormData={setFormData}
            validateDate={validateDate}
            validateTime={validateTime}
          />

          {/* situation */}
          <div className="pt-4">
            <h2 className="text-xl font-medium mb-4 flex items-center">
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
                required
                className={`w-full text-sm h-48 p-5 border ${validationError ? "border-red-500 ring-2 ring-red-100" : "border-gray-200"} rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-none focus:border-purple-400 transition-all duration-300 bg-gray-50/50`}
                placeholder="For example: I was in a car accident last week. The other driver hit my car from behind while I was stopped at a red light. I've filed a police report and now need to make an insurance claim. I have comprehensive coverage with State Farm, policy #ABC123."
                value={description}
                onChange={(e) => {
                  handleTextChange(e);
                  if (validationError) setValidationError(false);
                }}
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                {description.length > 0
                  ? `${description.length} characters`
                  : ""}
              </div>
              {validationError && (
                <p className="text-red-500 text-sm mt-2">
                  Please Select Date and Time and also describe your situation
                  before continuing
                </p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
            <p className="text-gray-700  flex items-center mb-4">
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
            <ul className="space-y-3 text-gray-600 ml-6 text-sm">
              {[
                "Police report number",
                "Any relevant information",
                "Your insurance provider",
                "Other party insurance information",
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
              onClick={validateAndContinue}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 cursor-pointer text-white py-2 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group">
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
  );
};

export default Step1Content;
