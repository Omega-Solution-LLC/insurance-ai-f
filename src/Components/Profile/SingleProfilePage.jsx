import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiDollarSign,
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiMessageSquare,
  FiPaperclip,
  FiShield,
} from "react-icons/fi";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { useParams } from "react-router";
import {
  useGetDocumentInsuranceQuery,
  useUpdateDocumentInsuranceMutation,
} from "../../Redux/features/documents/documentsApi";
import QuillEditor from "../ClaimWizard/Steps/QuillEditor";
import EmailTemplateDownloader from "../CommonUI/EmailTemplateDownloader";

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getFileNameFromPath = (path) => {
  const parts = path.split("/");
  return parts[parts.length - 1];
};

// Component for rendering individual sections
const SectionCard = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">{icon}</div>
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        <div>
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>

      {isOpen && <div className="p-4 border-t border-gray-200">{children}</div>}
    </div>
  );
};

// Main component
export default function InsuranceDetailPage() {
  const { id } = useParams();
  const { data: insuranceData } = useGetDocumentInsuranceQuery(id);
  const [updateDocumentInsurance, { isLoading: isSaving }] =
    useUpdateDocumentInsuranceMutation();

  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [isTextChanged, setIsTextChanged] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);

  // Initialize text state when insuranceData is loaded
  useEffect(() => {
    if (insuranceData?.applicationTemplate) {
      setText(insuranceData.applicationTemplate);
      setOriginalText(insuranceData.applicationTemplate);
    }
  }, [insuranceData]);

  // Check if text has changed from original
  useEffect(() => {
    if (originalText && text) {
      setIsTextChanged(originalText !== text);
    }
  }, [text, originalText]);

  // Handle text change from QuillEditor
  const handleTextChange = (newText) => {
    setText(newText);
  };

  // Handle save button click

  // Extract application template content for iframe preview
  const applicationTemplateContent = insuranceData?.applicationTemplate;

  const getHtmlContent = (text) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Auto Accident Claim Letter</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
          }
          .container {
            max-width: 700px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
          }
          h2 {
            font-size: 20px;
            margin-bottom: 10px;
          }
          p {
            margin: 10px 0;
          }
          .signature {
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          
          ${text}
          
        </div>
      </body>
      </html>
    `;
  };

  const applicationTemplatePreview = getHtmlContent(text);

  const handleSave = async () => {
    try {
      await updateDocumentInsurance({
        id: id,
        data: {
          applicationTemplate: applicationTemplatePreview,
        },
      });
      setOriginalText(text);
      setIsTextChanged(false);
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  console.log("text", getHtmlContent(text));

  return (
    <div className="min-h-screen bg-gray-100 py-6 pt-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Insurance Claim Details
            </h1>
            <p className="text-gray-500">Claim ID: {insuranceData?.id}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "details"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("details")}>
              Details
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "template"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("template")}>
              Application Template
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === "details" && (
          <div>
            {/* Basic Info Card */}
            <SectionCard
              defaultOpen={true}
              icon={<MdOutlineHistoryEdu className="text-blue-600" size={18} />}
              title="Situation"
              className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex justify-between">
                <div>
                  <p className="flex items-center text-gray-600 mb-2">
                    {insuranceData?.situation}
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Attachments Section */}
            <SectionCard
              title="Attachments"
              icon={<FiPaperclip className="text-blue-600" size={18} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insuranceData?.insuranceAttachment?.map((attachment) => (
                  <div
                    key={attachment?.id}
                    className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                    <div className="flex items-center">
                      <FiFileText size={18} className="text-blue-600 mr-3" />
                      <div className="truncate max-w-xs">
                        <p className="font-medium">
                          {getFileNameFromPath(attachment?.attachmentPath)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Added: {formatDate(attachment?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={attachment?.attachmentPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                        <FiExternalLink size={18} />
                      </a>
                      <a
                        href={attachment?.attachmentPath}
                        download
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                        <FiDownload size={18} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Out of Pocket Estimates */}
            <SectionCard
              title="Financial Estimates"
              icon={<FiDollarSign className="text-blue-600" size={18} />}>
              {insuranceData?.insuranceOutOfPocketEstimate.map(
                (estimate, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-3">Out of Pocket Estimate</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <p className="text-gray-500 text-sm">Deductible</p>
                        <p className="text-xl font-bold text-blue-600">
                          ${estimate?.deductible}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <p className="text-gray-500 text-sm">
                          Expected Coverage
                        </p>
                        <p className="text-xl font-bold text-green-600">
                          {estimate?.expectedCoverage}%
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <p className="text-gray-500 text-sm">
                          Your Responsibility
                        </p>
                        <p className="text-xl font-bold text-red-600">
                          ${estimate?.estimateResponsibility}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </SectionCard>

            {/* Policy Coverage */}
            <SectionCard
              title="Policy Coverage"
              icon={<FiShield className="text-blue-600" size={18} />}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coverage Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {insuranceData?.insuranceKeyPolicyCoverage?.map(
                      (coverage) => (
                        <tr key={coverage?.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {coverage?.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {coverage?.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${coverage?.coverageAmount}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* AI Advice */}
            <SectionCard
              title="AI Recommendations"
              icon={<FiMessageSquare className="text-blue-600" size={18} />}>
              <div className="space-y-4">
                {insuranceData?.insuranceAiAdvice?.map((advice) => (
                  <div
                    key={advice.id}
                    className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <p className="text-gray-700">{advice?.advice}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* Application Template Tab */}
        {activeTab === "template" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium">Application Template</h2>
              <div className="flex gap-3 items-center">
                <button
                  onClick={handleSave}
                  disabled={!isTextChanged || isSaving}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    isTextChanged
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <EmailTemplateDownloader htmlString={text} />
              </div>
            </div>

            <div className="p-0">
              <div className="h-screen max-h-screen">
                <QuillEditor
                  text={text}
                  setText={handleTextChange}
                  minHeight="350px"
                  className="h-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
