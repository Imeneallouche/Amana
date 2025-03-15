import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SearchNormal1 } from "iconsax-react";

export default function SearchFilters() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [progress, setProgress] = useState(0);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className=" flex flex-col md:flex-row  items-center justify-between p-2 rounded-xl mx-6 md:mx-8 ">
      {/* Search Bar */}
      <div className="flex items-center bg-[#E5E5E5] px-4 py-3 rounded-lg w-full md:w-96  ">
        <SearchNormal1 size="20" color="#14532D" />
        <input
          type="text"
          placeholder="Search for a case to support..."
          className="bg-transparent outline-none px-3 text-gray-700 w-full"
        />
      </div>

      {/* Filter Buttons */}
      <div className="hidden md:flex md:flex-wrap md:gap-4">
        {/* Case Dropdown */}
        <Dropdown
          label="Case"
          isOpen={openDropdown === "case"}
          onToggle={() => toggleDropdown("case")}
          options={["Case 1", "Case 2", "Case 3"]}
        />

        {/* ONG Dropdown */}
        <Dropdown
          label="ONG"
          isOpen={openDropdown === "ong"}
          onToggle={() => toggleDropdown("ong")}
          options={["ONG 1", "ONG 2", "ONG 3"]}
        />

        {/* Progress Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("progress")}
            className="flex items-center gap-2 bg-[#E5E5E5] px-4 py-3 rounded-lg text-gray-700 text-sm shadow-sm hover:bg-gray-200"
          >
            Progress Status <ChevronDown className="w-4 h-4" />
          </button>
          {openDropdown === "progress" && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-56 z-10 border border-gray-200">
              <label className="text-gray-700 text-sm font-medium block mb-2">
                Select Progress
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">0%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  className="w-full cursor-pointer appearance-none bg-gray-300 h-1 rounded-lg 
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-4 
                  [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:bg-green-600 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:hover:bg-green-700
                  [&::-moz-range-thumb]:w-4 
                  [&::-moz-range-thumb]:h-4 
                  [&::-moz-range-thumb]:bg-green-600 
                  [&::-moz-range-thumb]:rounded-full 
                  [&::-moz-range-thumb]:hover:bg-green-700"
                />
                <span className="text-xs text-gray-600">100%</span>
              </div>
              <span className="text-sm font-semibold text-gray-700 block text-center mt-2">
                {progress}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Dropdown({ label, isOpen, onToggle, options }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 bg-[#E5E5E5] px-4 py-3 rounded-lg text-gray-700 text-sm shadow-sm hover:bg-gray-200"
      >
        {label} <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-40 z-10 border border-gray-200">
          {options.map((option, index) => (
            <p
              key={index}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
