import React, { useState } from "react";
import pfp from "../assets/pfp.jpg";
function Header() {
  return (
    <div className="flex justify-end items-center p-2 mr-16">
      <div className="flex items-center gap-5">
      <img
          src={pfp}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
        <span className="text-myblack font-jakarta">Remil Maha</span>

      </div>
    </div>
  );
}

export default Header;