const StepIndicator = ({ currentStep, maxStepReached, handleToggle }) => {
  const steps = ["Describe", "Upload", "Results", "Letter"];

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          // A step is clickable if it's less than or equal to the max step reached
          const isClickable = stepNumber <= maxStepReached;

          return (
            <div
              onClick={() => isClickable && handleToggle(index)}
              key={index}
              className={`relative flex flex-col items-center ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  stepNumber <= currentStep
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}>
                {stepNumber}
              </div>
              <div className="mt-2 text-sm text-center">{step}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
