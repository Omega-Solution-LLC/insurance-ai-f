import { useEffect, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";

export default function InfographicTimeline() {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {isLargeScreen ? (
        // Desktop/tablet version - cards with perfect path alignment
        <div className="relative h-120" style={{ height: "600px" }}>
          {/* Step 1 - Describe - at top left */}
          <div className="absolute top-0 left-0 w-72 z-10">
            {/* Icon Circle */}
            <div className="relative flex justify-center mb-4">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg z-20 transform rotate-12">
                <div className="transform -rotate-12">
                  <IoMdCheckmarkCircleOutline
                    size={36}
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-50 hover:scale-105 transition-transform duration-500">
              <div className="inline-block px-3 py-1 bg-indigo-50 rounded-full mb-3">
                <span className="text-indigo-600 font-medium text-sm">
                  STEP 01
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Describe Your Accident
              </h3>
              <p className="text-gray-600">
                Tell us about your situation in detail. The more we know, the
                better we can help you navigate your claim.
              </p>
            </div>
          </div>

          {/* Step 2 - Upload - positioned lower in the middle */}
          <div className="absolute top-64 left-1/3 w-72 z-20">
            {/* Icon Circle */}
            <div className="relative flex justify-center mb-4">
              <div className="bg-gradient-to-br from-violet-500 to-violet-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg z-20 transform -rotate-6">
                <div className="transform rotate-6">
                  <CiSaveUp2 size={36} className="text-white" />
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-50 hover:scale-105 transition-transform duration-500">
              <div className="inline-block px-3 py-1 bg-violet-50 rounded-full mb-3">
                <span className="text-violet-600 font-medium text-sm">
                  STEP 02
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Upload Policy
              </h3>
              <p className="text-gray-600">
                Upload your insurance policy documents so our AI can analyze
                coverage details and identify opportunities.
              </p>
            </div>
          </div>

          {/* Step 3 - Get Help - positioned higher on the right */}
          <div className="absolute top-32 right-0 w-72 z-30">
            {/* Icon Circle */}
            <div className="relative flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg z-20 transform rotate-6">
                <div className="transform -rotate-6">
                  <LiaFileInvoiceSolid size={36} className="text-white" />
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-50 hover:scale-105 transition-transform duration-500">
              <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-3">
                <span className="text-blue-600 font-medium text-sm">
                  STEP 03
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Get Expert Guidance
              </h3>
              <p className="text-gray-600">
                Receive personalized advice, coverage insights, and a
                professional claim letter in minutes.
              </p>
            </div>
          </div>

          {/* SVG paths connecting the steps */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none">
            {/* Gradient definitions */}
            <defs>
              <linearGradient
                id="pathGradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient
                id="pathGradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* Path from step 1 to step 2 */}
            <path
              d="M170,10 C270,-50 280,200 400,280"
              fill="none"
              stroke="url(#pathGradient1)"
              strokeWidth="4"
              strokeDasharray="10,12"
              strokeLinecap="round"
            />

            {/* Path from step 2 to step 3 */}
            <path
              d="M450,280 C550,400 650,100 750,150"
              fill="none"
              stroke="url(#pathGradient2)"
              strokeWidth="4"
              strokeDasharray="10,12"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : (
        // Mobile version - vertical timeline with perfect alignment
        <div className="relative space-y-16 pl-16 py-4 mb-16">
          {/* Vertical dotted line with gradient */}
          <div
            className="absolute left-6 top-6 bottom-6 w-1"
            style={{
              background:
                "linear-gradient(to bottom, #6366f1, #8b5cf6, #3b82f6)",
              backgroundSize: "1px 20px",
              backgroundRepeat: "repeat-y",
              boxShadow: "0 0 10px rgba(99, 102, 241, 0.2)",
            }}></div>

          <div className="absolute left-2 top-0">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <path
                d="M0,0 L30,15 L0,30 L7,15 Z"
                fill="url(#paperAirplaneMobileGradient)"
              />
              <defs>
                <linearGradient
                  id="paperAirplaneMobileGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Step 1 - Describe */}
          <div className="relative">
            {/* Icon Circle */}
            <div className="absolute -left-10 -top-4">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg z-20 transform rotate-12">
                <div className="transform -rotate-12">
                  <IoMdCheckmarkCircleOutline
                    size={24}
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-50">
              <div className="inline-block px-3 py-1 bg-indigo-50 rounded-full mb-2">
                <span className="text-indigo-600 font-medium text-xs">
                  STEP 01
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Describe Your Accident
              </h3>
              <p className="text-gray-600 text-sm">
                Tell us about your situation in detail. The more we know, the
                better we can help.
              </p>
            </div>
          </div>

          {/* Step 2 - Upload */}
          <div className="relative">
            {/* Icon Circle */}
            <div className="absolute -left-10 -top-4">
              <div className="bg-gradient-to-br from-violet-500 to-violet-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg z-20 transform -rotate-6">
                <div className="transform rotate-6">
                  <CiSaveUp2 size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-50">
              <div className="inline-block px-3 py-1 bg-violet-50 rounded-full mb-2">
                <span className="text-violet-600 font-medium text-xs">
                  STEP 02
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Upload Policy
              </h3>
              <p className="text-gray-600 text-sm">
                Upload your insurance policy documents so our AI can analyze
                coverage details.
              </p>
            </div>
          </div>

          {/* Step 3 - Get Help */}
          <div className="relative">
            {/* Icon Circle */}
            <div className="absolute -left-10 -top-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg z-20 transform rotate-6">
                <div className="transform -rotate-6">
                  <LiaFileInvoiceSolid size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-50">
              <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-2">
                <span className="text-blue-600 font-medium text-xs">
                  STEP 03
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Get Expert Guidance
              </h3>
              <p className="text-gray-600 text-sm">
                Receive personalized advice, coverage insights, and a claim
                letter in minutes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
