import React from "react";
import logo from "../assets/logo.svg"; 
import ong from '../assets/baraka.jpg';

export default function ONGCard() {
    const name = "El-Baraka";
    const lorem = "El Baraka is an Algerian charity house dedicated to collecting donations for Palestine. Your support provides food, medical aid, and shelter to those in need.";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-8 max-w-lg border">
      {/* Logo */}
      <img src={ong} alt="El-Baraka" className="w-24 h-24 object-contain" />

      {/* Text Content */}
      <div className="flex-1">
        <h2 className="text-lg font-jakarta text-myblack font-semibold">{name}</h2>
        <p className="text-[#8A8A8A] font-jakarta text-sm line-clamp-3  overflow-hidden">
          {lorem}
        </p>

        {/* Buttons with Hover Effects */}
        <div className="mt-3 flex gap-2">
        <button className="bg-greeny text-white px-5 py-1.5 rounded-md font-jakarta text-sm font-medium transition duration-300 ease-in-out hover:bg-green-700 hover:scale-105">
         Follow
        </button>

          <button className="border border-greeny text-greeny px-4 py-1.5 font-jakarta rounded-md text-sm font-medium transition duration-300 ease-in-out hover:bg-greeny hover:text-white">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
