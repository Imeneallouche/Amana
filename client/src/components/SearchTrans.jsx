import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SearchNormal1 } from "iconsax-react";

export default function SearchFilters2() {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    return (
        <div className="flex flex-col mx-6 md:mx-12 md:flex-row gap-6 items-center justify-between p-2 rounded-xl ">


            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4">

                <Dropdown
                    label="All missions"
                    isOpen={openDropdown === "mission"}
                    onToggle={() => toggleDropdown("mission")}
                    options={["Medical Aid", "Food Donation", "Clean Water Project"]}
                />


                <Dropdown
                    label="Last 30 days"
                    isOpen={openDropdown === "date"}
                    onToggle={() => toggleDropdown("date")}
                    options={["Last year", "Last week"]}
                />



            </div>
            {/* Search Bar */}
            <div className="flex items-center bg-[#E5E5E5] px-4 py-2 rounded-lg w-full md:w-72">
                <SearchNormal1 size="20" color="#14532D" />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="bg-transparent outline-none px-3 text-gray-700 w-full"
                />
            </div>
        </div>
    );
}

function Dropdown({ label, isOpen, onToggle, options }) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="flex items-center gap-2 bg-[#E5E5E5] px-4 py-2 rounded-lg text-gray-700 text-sm shadow-sm hover:bg-gray-200"
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
