import React from "react";
import logo from "../assets/logo.svg";
import bg from "../assets/LogInbg.png";
import { PasswordCheck, DirectboxNotif } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import amana from '../assets/AMANA.svg';
export default function Landingpage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/homeVolunteer");
  };

  return (
    <div
      className="h-screen w-full px-2 md:px-12 flex flex-col items-center justify-around bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="hidden sm:flex sm:flex-col sm:h-screen sm:justify-center sm:items-center text-white">
        {/*I want to put my logo here */}
        <img src={amana} alt="AMANA Logo" className="w-64 h-auto mb-10" />

        <div className="bg-black bg-opacity-40 p-1 font-jakarta rounded-md inline-block place-self-center mb-8">
          Welcome to <strong>AMANA</strong> 👋!
        </div>
        <p className="text-xl md:text-3xl  font-bold text-cente font-jakarta leading-tight">
          Your Donation Will Make A Big Difference
        </p>
        <p className="text-lg md:text-lg text-center  font-bold font-jakarta leading-tight w-[50%]">
          AMANA is a secure and transparent donation platform leveraging blockchain and AI to ensure every contribution reaches those in need, maximizing impact and trust in charitable giving.
        </p>
        <div className="flex gap-4 mt-8">
          <button
                      onClick={() => navigate("/homeVolunteer")}
                      className="border border-white text-white font-jakarta py-3 r px-6 rounded-lg">
            Volunteer
          </button>
          <button
                      onClick={() => navigate("/homeONG")}
                      className="border border-white text-white font-jakarta py-3 px-6 rounded-lg">
            Organization
          </button>
          <button
                      onClick={() => navigate("/homeInNeed")}
                      className="border border-white text-white font-jakarta py-3 px-6 rounded-lg">
            In Need
          </button>
        </div>
      </div>
    </div>
  );
}
