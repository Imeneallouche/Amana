import React from "react";
import orphanImage from "../assets/bg.avif";

export  function DonationCard({location , urgency , title , total , raised , image}) {
    //Calculate progress percentage
    const progress = (raised / total) * 100;

    return (
    <div className="bg-white p-4 rounded-2xl shadow-lg max-w-md border">
      {/* Image */}
      <img src={image} alt="Orphan Donation" className="w-full h-48 object-cover rounded-xl" />

      {/* Content */}
      <div className="mt-4">
        <div className=" flex h-[30px] mb-3 line-clamp-2  overflow-hidden">
        <h2 className="text-lg font-semibold font-jakarta  text-gray-900">{title}</h2>
        </div>
        {/* Location & Urgency */}
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium font-jakarta text-gray-800">Location :</span> {location}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium font-jakarta text-gray-800">Urgency :</span> {urgency}
        </p>

        {/* Donation Progress */}
        <div className="flex justify-between text-sm font-jakarta font-medium text-gray-700 mt-3">
          <span>${raised.toLocaleString()}</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
          <div className="bg-green-600 h-2 rounded-full transition-all duration-500" 
               style={{ width: `${progress}%` }}>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => window.open("/paymentVolunteer", "_blank")} 
            className="bg-green-800 text-white w-1/2 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-green-700 hover:scale-105">
            Donate now
          </button>
          <button className="text-green-800 w-1/2 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-gray-100">
            See detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonationCard;