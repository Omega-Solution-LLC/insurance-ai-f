import html2pdf from "html2pdf.js"; // Correct import syntax for ES module
import { MdOutlineFileDownload } from "react-icons/md";

const EmailTemplateDownloader = ({ htmlString }) => {
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
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full cursor-pointer bg-gradient-to-r from-blue-400 to-purple-300 hover:from-blue-500 hover:to-purple-400 text-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleDownload}>
        <MdOutlineFileDownload size="20" /> Download PDF
      </button>
    </div>
  );
};

export default EmailTemplateDownloader;
