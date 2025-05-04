import Button from "@/UI/Button";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { FaEnvelope, FaGlobe, FaPhone, FaRegEdit } from "react-icons/fa";
import { useGetCustomerQuery } from "../../Redux/features/customer/customerApi";
import EditProfilePage from "./EditProfilePage";

const ProfilePage = () => {
  const id = localStorage.getItem("id");
  const { data: userData, isLoading } = useGetCustomerQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-44 pb-12 ">
      <div className="max-w-3xl mx-auto px-4">
        {/* Customer Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 relative">
            <h1 className="text-2xl font-semibold text-white">
              {userData?.username}
            </h1>

            <div className="absolute right-4 top-4 flex gap-2 z-10">
              <Tooltip title="Edit Profile">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white backdrop-blur-sm  border-none text-white p-2 rounded-full"
                  icon={<FaRegEdit size={20} className="text-gray-500" />}
                />
              </Tooltip>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {/* Phone */}
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 p-4 rounded-full mb-3">
                <FaPhone className="text-blue-500" />
              </div>
              <p className="text-gray-600 text-sm">Phone</p>
              <p className="font-medium text-gray-800">
                {userData?.phone || "1234567890"}
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center p-4">
              <div className="bg-purple-100 p-4 rounded-full mb-3">
                <FaEnvelope className="text-purple-500" />
              </div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="font-medium text-gray-800">
                {userData?.email || "dev@omega.ac"}
              </p>
            </div>

            {/* Country */}
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-100 p-4 rounded-full mb-3">
                <FaGlobe className="text-green-500" />
              </div>
              <p className="text-gray-600 text-sm">Address</p>
              <p className="font-medium text-gray-800">
                {userData?.address || "Dhaka, Bangladesh"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
        title="Edit Profile"
        centered
        className="password-modal bg-white rounded-xl dark:text-white">
        {/* <ChangePassword /> */}
        <EditProfilePage
          userData={userData}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProfilePage;
