import React from "react";

export default function BlogCard({ title, date, description, img }) {
  return (
    <div className="relative w-auto rounded-xl overflow-hidden bg-white transition-transform duration-300 hover:scale-105">
      {/* Background Image */}
      <div className="relative h-[150px]">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="px-4 py-3 text-myblack">
        <h3 className="text-lg font-semibold font-jakarta">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
