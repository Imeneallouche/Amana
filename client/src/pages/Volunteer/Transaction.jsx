import React from "react";
import SideBar from "../../components/SideBar";
function Transactions() {


return (
    <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
      {/* Sidebar with fixed width */}
      <SideBar className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />

      {/* Main content area */}
      
      <h1 className="text-4xl font-jakarta text-myblack font-semibold ">Achievements</h1>
      <p className="text-lg font-jakarta text-[#4B5563]">Track your contributions and their impact</p>

    </div>
  );
};
  export default Transactions;
