import React from "react";
import { CheckCircle, XCircle, Phone, Mail, MapPin } from "lucide-react";

export default function CareRequestCard({ name, caseId, phone, email, location, status, images, needs }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg max-w-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-600">Case #{caseId}</p>
        </div>
        <span className="bg-[#FFD599] bg-opacity-50 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
          {status}
        </span>
      </div>

      {/* Contact Info */}
      <div className="mt-4 space-y-2 text-gray-700 text-sm">
        <div className="flex items-center gap-2"><Phone size={16} /> {phone}</div>
        <div className="flex items-center gap-2"><Mail size={16} /> {email}</div>
        <div className="flex items-center gap-2"><MapPin size={16} /> {location}</div>
      </div>

      {/* Situation Images */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900">Situation Images</h3>
        <div className="flex gap-2 mt-2">
          {images.map((img, index) => (
            <img key={index} src={img} alt="Situation" className="w-20 h-16 rounded-lg object-cover" />
          ))}
        </div>
      </div>

      {/* Needs List */}
      <div className="mt-4 h-[94px]">
        <h3 className="text-sm font-semibold text-gray-900">Needs List</h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {needs.map((need, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" /> {need}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button className="bg-green-800 text-white w-1/2 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-green-700">
          Approve
        </button>
        <button className="bg-gray-200 text-gray-800 w-1/2 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-gray-300">
          Decline
        </button>
      </div>
    </div>
  );
}