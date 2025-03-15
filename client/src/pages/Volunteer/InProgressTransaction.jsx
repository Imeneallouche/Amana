import React from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import TransactionTableInProgress from "../../components/TransactionTableInProgress";
function InProgressTransactions() {


return (
  <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
    {/* Sidebar with fixed width */}
    <SideBar className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />

    {/* Main content area */}
    
    <div className="flex-1 flex flex-col overflow-auto">
      <Header/>
      <div className="mx-24">
      <h1 className="lg:text-3xl md:text-xl font-jakarta text-myblack mb-2 font-semibold ">Pending Transactions</h1>
      <p className="md:text-lg sm:text-sm font-jakarta text-[#4B5563]">Track your contributions and watch your progress grow over time. </p>
      <TransactionTableInProgress/>
      </div>
    </div>
  </div>
);
};



  export default InProgressTransactions;
