import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetCustomerQuery } from "../../Redux/features/customer/customerApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const isLogged = localStorage.getItem("isLogged");
  const id = localStorage.getItem("id");

  const { data: userData, isLoading } = useGetCustomerQuery(id, { skip: !id });

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

  // const handleGenerateNewClick = (e) => {
  //   // e.preventDefault();
  //   // localStorage.removeItem("applicationId");
  //   window.location.href = "/application";
  // };

  // Custom active link style for NavLink
  const activeNavLinkStyle = ({ isActive }) => {
    return isActive
      ? "text-indigo-600 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 px-3 py-2 transition-all"
      : "text-gray-700 hover:text-indigo-600 hover:bg-purple-50 px-3 py-2 rounded-full transition font-medium";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 px-3 ${
        scrolled ? "bg-white/95 shadow-md" : "bg-white/90"
      } backdrop-blur-md border-b border-gray-200 py-2`}>
      <header className="max-w-7xl mx-auto sticky top-0 z-10">
        <div className="flex justify-between gap-16 items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center group-hover:shadow-md transition-all duration-300">
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
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text group-hover:from-indigo-700 group-hover:to-violet-700 transition-all duration-300">
              AI Insurance
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isLogged && (
              <NavLink to="/dashboard" className={activeNavLinkStyle}>
                Dashboard
              </NavLink>
            )}

            {isLogged && (
              <NavLink
                to="/application?step=1"
                // onClick={handleGenerateNewClick}
                className={activeNavLinkStyle}>
                Create New Claim
              </NavLink>
            )}
          </div>

          {/* User Menu & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLogged ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 cursor-pointer rounded-full px-3 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition font-medium text-xs">
                  <span>{userData?.username || "User"}</span>
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
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

                    <div className="border-t border-gray-100 my-1"></div>
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
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white rounded-lg shadow-md hover:shadow-lg transition font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-fadeIn">
            <div className="flex flex-col space-y-3 px-4">
              {isLogged ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-600 font-medium border-l-4 border-indigo-600 pl-3"
                        : "text-gray-700 pl-4"
                    }>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/application?step=1"
                    onClick={(e) => {
                      handleGenerateNewClick(e);
                      setIsOpen(false);
                    }}
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-600 font-medium border-l-4 border-indigo-600 pl-3"
                        : "text-gray-700 pl-4"
                    }>
                    Generate New
                  </NavLink>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 pl-4">
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-left text-gray-700 pl-4">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-indigo-600 font-medium">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-2 px-4 rounded-lg text-center font-medium">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </nav>
  );
};

export default Navbar;
