import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SearchNormal1 } from "iconsax-react";

export default function SearchFilters() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="flex gap-4 items-center justify-between py-4  rounded-lg">
      {/* Search Bar */}
      <div>
      <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg w-96">
        <SearchNormal1 size="20" color="#14532D" />
        <input
          type="text"
          placeholder="Enter the case you want to help"
          className="bg-transparent outline-none px-2 text-gray-600 w-full"
        />
      </div>
      </div>
      {/* Filter Buttons with Dropdowns */}
      <div className="flex flex-row gap-4 ">
      <div className="relative">
        <button
          onClick={() => toggleDropdown("case")}
          className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-lg text-gray-700 text-sm"
        >
          Case <ChevronDown className="w-4 h-4" />
        </button>
        {openDropdown === "case" && (
          <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-40 z-10">
            <p className="p-2 hover:bg-gray-100 cursor-pointer">Case 1</p>
            <p className="p-2 hover:bg-gray-100 cursor-pointer">Case 2</p>
            <p className="p-2 hover:bg-gray-100 cursor-pointer">Case 3</p>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => toggleDropdown("ong")}
          className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-lg text-gray-700 text-sm"
        >
          ONG <ChevronDown className="w-4 h-4" />
        </button>
        {openDropdown === "ong" && (
          <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-40 z-10">
            <p className="p-2 hover:bg-gray-100 cursor-pointer">ONG 1</p>
            <p className="p-2 hover:bg-gray-100 cursor-pointer">ONG 2</p>
            <p className="p-2 hover:bg-gray-100 cursor-pointer">ONG 3</p>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => toggleDropdown("progress")}
          className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-lg text-gray-700 text-sm"
        >
          Progress Status <ChevronDown className="w-4 h-4" />
        </button>
        {openDropdown === "progress" && (
          <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-40 z-10">
            <p className="p-2 hover:bg-gray-100 cursor-pointer">Pending</p>
            <p className="p-2 hover:bg-gray-100 cursor-pointer">In Progress</p>
            <p className="p-2 hover:bg-gray-100 cursor-pointer">Completed</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
