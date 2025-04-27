import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useGetCustomerQuery } from "../../Redux/features/customer/customerApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const isLogged = localStorage.getItem("isLogged");
  const id = localStorage.getItem("id");

  const { data: userData, isLoading } = useGetCustomerQuery(id);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 text-transparent bg-clip-text">
              AssistAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition font-semibold py-2">
              Home
            </Link>
            {isLogged && (
              <Link
                to="/wizard"
                className="text-gray-700 hover:text-indigo-600 transition font-semibold py-2">
                Verify
              </Link>
            )}
          </div>

          {/* Auth Buttons or Profile - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLogged ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium">
                  <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {userData?.username.charAt(0).toUpperCase()}
                  </div>
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
                      <div className="flex items-center">
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
                    {/* <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      onClick={() => setShowProfileDropdown(false)}>
                      <div className="flex items-center">
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
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Settings
                      </div>
                    </Link> */}
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowProfileDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                      <div className="flex items-center">
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none">
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiOutlineMenuAlt3 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-4 py-4 animate-fadeIn">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 transition font-medium py-2"
                onClick={() => setIsOpen(false)}>
                Home
              </Link>
              {isLogged && (
                <Link
                  to="/wizard"
                  className="text-gray-700 hover:text-indigo-600 transition font-medium py-2"
                  onClick={() => setIsOpen(false)}>
                  Claim Wizard
                </Link>
              )}
              <Link
                to="#"
                className="text-gray-700 hover:text-indigo-600 transition font-medium py-2"
                onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-indigo-600 transition font-medium py-2"
                onClick={() => setIsOpen(false)}>
                Contact
              </Link>

              <div className="pt-2 border-t border-gray-200">
                {isLogged ? (
                  <div className="space-y-3">
                    {/* User profile in mobile menu */}
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {userName}
                        </div>
                        <div className="text-sm text-gray-500">Logged in</div>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-indigo-600 transition"
                      onClick={() => setIsOpen(false)}>
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
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-indigo-600 transition"
                      onClick={() => setIsOpen(false)}>
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
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
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
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      to="/login"
                      className="w-full px-4 py-2 text-center border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium"
                      onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="w-full px-4 py-2 text-center bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white rounded-lg shadow-md transition font-medium"
                      onClick={() => setIsOpen(false)}>
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
