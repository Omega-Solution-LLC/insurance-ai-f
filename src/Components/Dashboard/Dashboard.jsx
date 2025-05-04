import { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { useGetCustomerQuery } from "../../Redux/features/customer/customerApi";
import { useGetDocumentQuery } from "../../Redux/features/documents/documentsApi";
import EmailTemplateDownloader from "../CommonUI/EmailTemplateDownloader";
import TableComponent from "../CommonUI/TableComponent";

const Dashboard = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const isLogged = localStorage.getItem("isLogged");
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: true,
  });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { data: documentData } = useGetDocumentQuery({ id, arg: pageConfig });
  const { data: userData } = useGetCustomerQuery(id, { skip: !isLogged });

  const columns = [
    {
      title: "Claim ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/profile/${id}`}>{id}</Link>,
    },
    {
      title: "Situation",
      dataIndex: "situation",
      key: "situation",
      render: (text) => (
        <span className="truncate block w-48" title={text}>
          {text}
        </span>
      ),
    },
    {
      title: "Application Template",
      key: "applicationTemplate",
      render: (file) => (
        <EmailTemplateDownloader htmlString={file?.applicationTemplate} />
      ),
    },
    {
      title: "Action",
      key: "profile",
      render: (item) => (
        <Link to={`/profile/${item?.id}`}>
          <button className="flex justify-center items-center gap-2 cursor-pointer px-3 py-2 hover:border hover:border-gray-300  rounded-full hover:bg-gray-50  transition-all duration-200">
            <IoMdEye size="20" /> View
          </button>
        </Link>
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {}, []);

  return (
    <div className=" relative overflow-hidden">
      <div className="p-6  pt-40  bg-white min-h-screen ">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-10 -mt-20 -mr-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full opacity-10 -mb-20 -ml-10" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-50 rounded-full opacity-20 transform -translate-y-1/2" />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto relative ">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-semibold text-gray-800 mb-1">
                Welcome, {userData?.username || "User"} 👋
              </h1>
              <p className="text-gray-600 text-sm">
                Here's what's happening with your insurance claims today.
              </p>
            </div>

            {/* Support Card */}
            <Link
              to="/application"
              className="flex items-center gap-2  rounded-full px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all">
              <svg
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Generate New
            </Link>
          </div>

          {/* Table Component */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-50 overflow-hidden mt-14">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-medium text-gray-800">
                    Recent Insurance Claims
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    A list of all insurance claims in your account.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <TableComponent
                columns={columns}
                list={documentData?.getAllInsurance}
                total={documentData?.totalInsurance}
                setPageConfig={setPageConfig}
                pageConfig={pageConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
