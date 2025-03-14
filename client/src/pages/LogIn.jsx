import React from "react";
import logo from '../assets/logo.svg';
import bg from '../assets/LogInbg.png';
import { PasswordCheck , DirectboxNotif } from "iconsax-react"; 

export default function LogIn() {
  return (
    <div 
      className="h-screen w-full flex items-center justify-start bg-cover bg-center relative pl-20 pr-40" 
      style={{ backgroundImage: `url(${bg})` }} 
    >
      {/* Login Card */}
      <div className="relative ml-28 bg-[#032B20] bg-opacity-90 p-12 rounded-3xl px-12 shadow-lg w-[40%] text-white mr-24">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Amanah" className="h-28 mb-8" />
          <h1 className="text-xl font-semibold font-jakarta mt-2">Welcome back!</h1>
        </div>
        
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-jakarta mb-1">Email</label>
          <div className="flex items-center bg-white text-black font-jakarta px-3 py-2 rounded-md">
            <DirectboxNotif size={20} color="#000000" className="mr-2" /> 
            <input type="email" className="w-full outline-none bg-transparent" placeholder="ld-hennane@esi.dz" />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-jakarta mb-1">Password</label>
          <div className="flex items-center bg-white text-black px-3 py-2 rounded-md">
            <PasswordCheck size={20} color="#000000" className="mr-2" /> 
            <input type="password" className="w-full outline-none bg-transparent" placeholder="password*" />
          </div>
        </div>
        
        {/* Forgot Password */}
        <div className="text-right text-sm mb-4">
          <a href="#" className="text-[#C1B49A] font-jakarta hover:underline">Forgot password?</a>
        </div>
        
        {/* Login Button */}
        <button className="w-full bg-[#FFC978] text-black font-jakarta py-2 rounded-md font-semibold hover:bg-[#E6B865]">
          Login
        </button>
      </div>
      
      {/* Right Side Text */}
      <div className=" text-white max-w-md">
        <div className="bg-black bg-opacity-40 px-3 py-1  rounded-md inline-block mb-8">
          We're happy to see you! 👋
        </div>
        <p className="text-[48px] font-bold font-jakarta leading-tight">
          Your <span className="text-[#C1B49A]">Secure</span> and <br />
          Trustworthy Giving <br /> Solution.
        </p>
      </div>
    </div>
  );
}
