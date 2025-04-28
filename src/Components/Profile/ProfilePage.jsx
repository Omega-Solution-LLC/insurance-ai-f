import React, { useState } from "react";
import { LiaEyeSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useGetCustomerQuery } from "../../Redux/features/customer/customerApi";
import { useGetDocumentQuery } from "../../Redux/features/documents/documentsApi";
import EmailTemplateDownloader from "../CommonUI/EmailTemplateDownloader";
import TableComponent from "../CommonUI/TableComponent";

const ProfilePage = () => {
  const id = localStorage.getItem("id");
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: true,
  });
  // const [updateInsurance] = useUpdateInsuranceMutation();
  const { data: userData, isLoading } = useGetCustomerQuery(id);
  const { data: documentData } = useGetDocumentQuery({ id, arg: pageConfig });
  const columns = [
    {
      title: "id",
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
          {" "}
          <button className="flex justify-center items-center gap-2 cursor-pointer px-3 py-2 bg-white border border-gray-500 rounded-full text-gray-600 transition-colors duration-200">
            <LiaEyeSolid /> View
          </button>
        </Link>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden pt-24 pb-12 ">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 -mt-20 -mr-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full opacity-30 -mb-20 -ml-10" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-100 rounded-full opacity-20 transform -translate-y-1/2" />
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="h-36 bg-gradient-to-r from-indigo-600 to-violet-600"></div>
          <div className="relative px-6 -mt-16 pb-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="h-32 w-32 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
                {userData?.username.charAt(0).toUpperCase()}
              </div>
              <div className="sm:ml-6  sm:mt-0 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-50 -mt-2">
                  {userData?.username.toUpperCase()}
                </h1>
                <p className="text-gray-600">
                  {userData?.email || "No email available"}
                </p>
              </div>
              {/* <div className="sm:ml-auto mt-4 sm:mt-0">
                <Link
                  to="/settings"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 inline-flex items-center">
                  <FaEdit className="h-5 w-5 mr-2" />
                  Edit Profile
                </Link>
              </div> */}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - User Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center border-b pb-3">
                Personal Information
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-500 mb-1">First Name</p>
                  <p className="font-medium text-gray-800">
                    {userData?.firstName || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Name</p>
                  <p className="font-medium text-gray-800">
                    {userData?.lastName || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium text-gray-800">
                    {userData?.email || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Claims History */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center border-b pb-3">
                Claims History
              </h2>

              <div className="overflow-hidden">
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
    </div>
  );
};

export default ProfilePage;
