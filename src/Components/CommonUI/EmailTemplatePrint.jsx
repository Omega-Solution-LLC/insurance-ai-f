import { FiPrinter } from "react-icons/fi";

const EmailTemplatePrint = ({ htmlString }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Preview</title>
          </head>
          <body>
            ${htmlString}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() { window.close(); }
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      alert("Pop-up blocked! Please allow pop-ups for this site.");
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className={`flex items-center justify-center gap-2 py-2 px-8 rounded-full text-sm font-medium border border-gray-300 transition-all duration-300 shadow-sm hover:shadow cursor-pointer`}
        onClick={handlePrint}>
        <FiPrinter size="15" className="text-gray-500" /> Print
      </button>
    </div>
  );
};

export default EmailTemplatePrint;
