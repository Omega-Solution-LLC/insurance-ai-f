import html2pdf from "html2pdf.js"; // Correct import syntax for ES module
import { MdOutlineFileDownload } from "react-icons/md";

const EmailTemplateDownloader = ({ htmlString, isSinglePage }) => {
  const handleDownload = () => {
    const container = document.createElement("div");
    container.innerHTML = htmlString;
    document.body.appendChild(container);

    html2pdf()
      .from(container)
      .set({
        margin: 0.5,
        filename: "email_template.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save()
      .then(() => {
        document.body.removeChild(container);
      });
  };

  return (
    <div>
      <button
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full cursor-pointer hover:border hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSinglePage ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white" : ""} `}
        onClick={handleDownload}>
        <MdOutlineFileDownload size="20" /> Download PDF
      </button>
    </div>
  );
};

export default EmailTemplateDownloader;
