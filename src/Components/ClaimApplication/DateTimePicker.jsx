import { useEffect, useState } from "react";

// Custom Calendar Icon Component
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// Custom Clock Icon Component
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default function DateTimePicker({
  formData,
  setFormData,
  validateTime,
  validateDate,
}) {
  const [date, setDate] = useState(formData.date || "");
  const [time, setTime] = useState(formData.time || "");

  const [selection, setSelection] = useState("");

  const updateSelection = (newDate, newTime) => {
    if (newDate && newTime) {
      const dateObj = new Date(`${newDate}T${newTime}`);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setSelection(dateObj.toLocaleDateString("en-US", options));
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    setFormData((prev) => ({
      ...prev,
      date: newDate,
    }));
    updateSelection(newDate, time);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setTime(newTime);
    setFormData((prev) => ({
      ...prev,
      time: newTime,
    }));
    updateSelection(date, newTime);
  };

  useEffect(() => {
    setDate(formData?.date || "");
    setTime(formData?.time || "");
  }, [formData.date, formData.time]);

  return (
    <div className=" ">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        When did the accident happen?
      </h3>

      {selection && date && time && (
        <div className="bg-purple-50 p-4 rounded-full mb-4">
          <p className="text-purple-800 font-medium">{selection}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => handleDateChange(e)}
              className={`w-full p-2 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validateDate ? "border-red-500" : ""
              } `}
            />
            <button className="absolute left-2 top-2 text-gray-500 hover:text-blue-500">
              <CalendarIcon />
            </button>
          </div>
          {validateDate && (
            <p className="text-red-500 text-sm mt-2">
              Please select a valid date and time
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <div className="relative">
            <input
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(e)}
              className={`w-full p-2 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validateTime ? "border-red-500" : ""
              }`}
            />
            <button className="absolute left-2 top-2 text-gray-500 hover:text-blue-500 flex">
              <ClockIcon />
            </button>
          </div>
          {validateTime && (
            <p className="text-red-500 text-sm mt-2">
              Please select a valid date and time
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
