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
        className="px-4 py-2 text-sm font-medium rounded-md cursor-pointer bg-white border text-black border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default EmailTemplateDownloader;
