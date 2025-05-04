import { useUpdateCustomerMutation } from "@/Redux/features/customer/customerApi";
import { useEffect, useState } from "react";

const EditProfilePage = ({ userData, onCancel }) => {
  const [profile, setProfile] = useState({
    username: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const [updateProfile] = useUpdateCustomerMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await updateProfile({ id: userData.id, data: profile });
      if (resp?.data) {
        onCancel();
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (userData) {
      setProfile({
        username: userData.username || "",
        phone: userData.phone || "",
        email: userData.email || "",
        address: userData.address || "",
      });
    }
  }, [userData]);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg ">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Edit Profile</h2>
        <p className="text-gray-600">Update your personal information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Full username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={profile.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700">
              address
            </label>
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
