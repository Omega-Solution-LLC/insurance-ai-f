import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../Redux/features/register/registerApi";
import StepIndicator from "./StepIndicator";
import Page1Content from "./Steps/Step1Content";
import Page2Content from "./Steps/Step2Content";
import Page3Content from "./Steps/Step3Content";
import Page4Content from "./Steps/Step4Content";

export default function ClaimApplication() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    description: "",
    uploadedFiles: [],
  });

  const [aiData, setAiData] = useState({});
  useEffect(() => {
    if (aiData?.id) {
      localStorage.setItem("applicationId", aiData.id);
    }
  }, [aiData?.id]);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  const handleFileUpload = (files) => {
    setFormData({
      ...formData,
      uploadedFiles: [...formData.uploadedFiles, ...files],
    });
  };

  const removeFile = (index) => {
    const newFiles = [...formData.uploadedFiles];
    newFiles.splice(index, 1);
    setFormData({
      ...formData,
      uploadedFiles: newFiles,
    });

    // Reset the file input to allow the same file to be selected again
    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 -mt-20 -mr-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full opacity-30 -mb-20 -ml-10" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-100 rounded-full opacity-20 transform -translate-y-1/2" />

      <div className="max-w-[600px] mx-auto mt-20">
        <StepIndicator currentStep={currentStep} />
      </div>

      <div className="max-w-3xl mx-auto">
        {currentStep === 1 && (
          <Page1Content
            formData={formData.description}
            handleTextChange={handleTextChange}
            handleContinue={nextStep}
          />
        )}

        {currentStep === 2 && (
          <Page2Content
            uploadedFiles={formData.uploadedFiles}
            handleFiles={handleFileUpload}
            removeFile={removeFile}
            handleContinue={nextStep}
            handleBack={prevStep}
            formData={formData}
            setAiData={setAiData}
          />
        )}

        {currentStep === 3 && (
          <Page3Content
            handleContinue={nextStep}
            handleBack={prevStep}
            aiData={aiData}
          />
        )}

        {currentStep === 4 && (
          <Page4Content handleBack={prevStep} aiData={aiData} />
        )}
      </div>
    </div>
  );
}
