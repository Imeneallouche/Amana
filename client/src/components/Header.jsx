import React, { useState } from "react";
import pfp from "../assets/pfp.jpg";
function Header() {
  return (
    <div className="flex justify-end  items-center px-2 py-4 ">
      <div className="mr-24 flex items-center gap-5">
      <img
          src={pfp}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2  border-gray-300"
        />
        <span className="text-myblack font-jakarta">Remil Maha</span>

      </div>
    </div>
  );
}

export default Header;