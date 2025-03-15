import React from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import TransactionTable from "../../components/TransactionTableCompleted";
import TransactionTableCompleted from "../../components/TransactionTableCompleted";
function AchievedTransactions() {


return (
  <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
    {/* Sidebar with fixed width */}
    <SideBar className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />

    {/* Main content area */}
    
    <div className="flex-1 flex flex-col overflow-auto">
      <Header/>
      <div className="mx-24">
      <h1 className="text-3xl font-jakarta text-myblack mb-2 font-semibold ">Achievements</h1>
      <TransactionTableCompleted/>
      </div>
    </div>
  </div>
);
};



  export default AchievedTransactions;
