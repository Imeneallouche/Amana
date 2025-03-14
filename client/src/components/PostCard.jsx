import React from "react";
import logo from "../assets/logo.svg"; 

export default function CharityCard() {
    const name="El-Baraka";
    const lorem="El Baraka is an Algerian charity house dedicated to collecting donations for Palestine. Your support provides food, medical aid, and  shelter to those in need.";
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-4 max-w-lg border">
      {/* Logo */}
      <img src={logo} alt="El-Baraka" className="w-20 h-20 object-contain" />

      {/* Text Content */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600 text-sm">
        {lorem}
        </p>

        {/* Buttons */}
        <div className="mt-3 flex gap-2">
          <button className="bg-green-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">
            Follow
          </button>
          <button className="border border-green-600 text-green-600 px-4 py-1.5 rounded-md text-sm font-medium">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
