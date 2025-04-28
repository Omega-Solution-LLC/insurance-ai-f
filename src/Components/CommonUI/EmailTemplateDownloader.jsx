import { MdOutlineFileDownload } from "react-icons/md";

const EmailTemplateDownloader = ({ htmlString }) => {
  const handleDownload = () => {
    const blob = new Blob([htmlString], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "email_template.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <button
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full cursor-pointer bg-gradient-to-r from-blue-400 to-purple-300 hover:from-blue-500 hover:to-purple-400 text-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleDownload}>
        <MdOutlineFileDownload size="20" /> Download
      </button>
    </div>
  );
};

export default EmailTemplateDownloader;
