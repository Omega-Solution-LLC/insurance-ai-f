import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage (in a real app, you'd call an API here)
    if (userData.firstName && userData.lastName) {
      localStorage.setItem(
        "user",
        `${userData.firstName} ${userData.lastName}`
      );
    }

    // Display success message
    alert("Profile updated successfully!");
  };

  useEffect(() => {
    // Get user data from localStorage
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const email = localStorage.getItem("email") || "";

    // Extract first and last name from the "user" item if individual fields aren't available
    const userName = localStorage.getItem("user") || "";
    let extractedFirstName = firstName;
    let extractedLastName = lastName;

    if (!firstName && !lastName && userName && userName !== "User") {
      const nameParts = userName.split(" ");
      if (nameParts.length >= 2) {
        extractedFirstName = nameParts[0];
        extractedLastName = nameParts.slice(1).join(" ");
      } else {
        extractedFirstName = userName;
        extractedLastName = "";
      }
    }

    setUserData({
      firstName: extractedFirstName,
      lastName: extractedLastName,
      email,
    });
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link
            to="/profile"
            className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <FaArrowLeft className="h-5 w-5 mr-2" />
            Back to Profile
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Edit Profile
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Personal Information Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
                    <FaUser className="h-5 w-5 mr-2 text-indigo-500" />
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
                    <FaEnvelope className="h-5 w-5 mr-2 text-indigo-500" />
                    Contact Information
                  </h2>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      We'll never share your email with anyone else.
                    </p>
                  </div>
                </div>

                {/* Password Change Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
                    <FaKey className="h-5 w-5 mr-2 text-indigo-500" />
                    Password
                  </h2>

                  <Link
                    to="/settings/password"
                    className="inline-flex items-center px-4 py-2 border border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                    <FaEdit className="h-5 w-5 mr-2" />
                    Change Password
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r cursor-pointer from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-300">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
