import React from "react";

const StepIndicator = ({ currentStep }) => {
  const steps = ["Describe", "Upload", "Results", "Letter"];

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between relative">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index + 1 <= currentStep
                  ? "bg-gradient-to-r from-blue-400 to-purple-300 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}>
              {index + 1}
            </div>
            <div className="mt-2 text-sm text-center">{step}</div>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 -right-1/2 h-[2px] w-[100%] -z-10 `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
