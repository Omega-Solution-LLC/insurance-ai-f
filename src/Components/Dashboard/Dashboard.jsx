import React, { useState } from "react";
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
  const { data: userData } = useGetCustomerQuery(id);

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

  return (
    <div className=" relative overflow-hidden">
      <header className="bg-white max-w-7xl mx-auto sticky top-0 z-10">
        <div className="flex justify-between items-center  py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
              AI Insurance
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 transition  py-2">
              Dashboard
            </Link>
            {isLogged && (
              <Link
                to="/application"
                className="text-gray-700 hover:text-indigo-600 transition  py-2">
                Generate New
              </Link>
            )}
          </div>

          {/* User Menu & Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-4">
                {isLogged ? (
                  <div className="relative profile-dropdown">
                    <button
                      onClick={() =>
                        setShowProfileDropdown(!showProfileDropdown)
                      }
                      className="flex items-center space-x-2 cursor-pointer rounded-full px-4 py-2 border border-indigo-600 text-indigo-600  hover:bg-indigo-50 transition text-sm ">
                      <span>{userData?.username}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform duration-200 ${
                          showProfileDropdown ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {showProfileDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-fadeIn">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                          onClick={() => setShowProfileDropdown(false)}>
                          <div className="flex items-center text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-indigo-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            My Profile
                          </div>
                        </Link>

                        <div className="border-t border-gray-100 my-1 "></div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowProfileDropdown(false);
                          }}
                          className="block cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                          <div className="flex items-center text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-indigo-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Logout
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white rounded-lg shadow-md transition font-medium">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="p-6  pt-14  bg-[#f7f8fa] min-h-screen ">
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
