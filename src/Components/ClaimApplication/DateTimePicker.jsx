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

export default function DateTimePicker({ formData, setFormData }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selection, setSelection] = useState("");

  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (dateObj) => {
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

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
      date: date,
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

  const handleDateSelect = (selectedDate) => {
    const newDate = formatDate(selectedDate);
    setDate(newDate);
    updateSelection(newDate, time);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setShowTimePicker(false);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
    setShowCalendar(false);
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Generate calendar view
  const renderCalendar = () => {
    const monthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);

    const dateFormat = { month: "long", year: "numeric" };
    const monthYearString = currentMonth.toLocaleDateString(
      "en-US",
      dateFormat
    );

    // Adjust to start from Sunday
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const days = [];
    const rows = [];
    let day = new Date(startDate);

    // Generate days of the week header
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const daysHeader = daysOfWeek.map((dayName) => (
      <div
        key={dayName}
        className="w-8 h-8 flex items-center justify-center text-gray-500 font-medium">
        {dayName}
      </div>
    ));

    // Generate calendar days
    while (day <= endDate || days.length % 7 !== 0) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
        const isToday = day.toDateString() === new Date().toDateString();
        const isSelected = date === formatDate(day);

        days.push(
          <div
            key={day.toISOString()}
            className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded-full
              ${isCurrentMonth ? "text-gray-900" : "text-gray-400"} 
              ${isToday ? "bg-blue-100" : ""}
              ${isSelected ? "bg-blue-500 text-white" : ""}
              hover:bg-blue-200`}
            onClick={() => handleDateSelect(new Date(cloneDay))}>
            {day.getDate()}
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div key={day.toISOString()} className="grid grid-cols-7 gap-1">
          {days.slice(-7)}
        </div>
      );
    }

    return (
      <div className="bg-white shadow-lg rounded-lg p-4 absolute z-10 mt-1">
        <div className="flex justify-between items-center mb-4">
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={prevMonth}>
            &lt;
          </button>
          <div className="font-semibold">{monthYearString}</div>
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={nextMonth}>
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">{daysHeader}</div>
        {rows}
      </div>
    );
  };

  // Generate time selector with hours and minutes
  const renderTimePicker = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(
        <option key={i} value={String(i).padStart(2, "0")}>
          {String(i).padStart(2, "0")}
        </option>
      );
    }

    const minutes = [];
    for (let i = 0; i < 60; i += 5) {
      minutes.push(
        <option key={i} value={String(i).padStart(2, "0")}>
          {String(i).padStart(2, "0")}
        </option>
      );
    }

    const [timeHours, timeMinutes] = time.split(":");

    return (
      <div className="bg-white shadow-lg rounded-lg p-4 absolute z-10 mt-1">
        <div className="flex items-center">
          <select
            className="p-2 border rounded mr-2"
            value={timeHours}
            onChange={(e) => setTime(`${e.target.value}:${timeMinutes}`)}>
            {hours}
          </select>
          <span className="mx-1">:</span>
          <select
            className="p-2 border rounded ml-2"
            value={timeMinutes}
            onChange={(e) => setTime(`${timeHours}:${e.target.value}`)}>
            {minutes}
          </select>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              updateSelection(date, time);
              setShowTimePicker(false);
            }}>
            Set Time
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            onClick={() => setShowTimePicker(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Get current date as default
  useEffect(() => {
    const now = new Date();
    const formattedDate = formatDate(now);
    const formattedTime = formatTime(now);
    setDate(formattedDate);
    setTime(formattedTime);
    updateSelection(formattedDate, formattedTime);
  }, []);

  return (
    <div className=" ">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        When did the accident happen?
      </h3>

      {selection && (
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
              className="w-full p-2 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
            />
            <button
              className="absolute left-2 top-2 text-gray-500 hover:text-blue-500"
              onClick={toggleCalendar}>
              <CalendarIcon />
            </button>
            {showCalendar && renderCalendar()}
          </div>
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
              className="w-full p-2 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
            />
            <button
              className="absolute left-2 top-2 text-gray-500 hover:text-blue-500 flex"
              onClick={toggleTimePicker}>
              <ClockIcon />
            </button>
            {showTimePicker && renderTimePicker()}
          </div>
        </div>
      </div>
    </div>
  );
}
