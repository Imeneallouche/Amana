import React from "react";
import SideBarONG from "../../components/SideBarONG";
import Header from "../../components/Header";
import BlockchaintransactionsTable from "../../components/BlockchainTransIactionsTable";
import SearchFilters2 from "../../components/SearchTrans";
function BlockchainTrans() {


    return (
        <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">

            <SideBarONG className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />

            <div className="flex-1 flex flex-col  overflow-auto">
                <Header />
                <SearchFilters2 />
                <div className="mx-12">
                    <h1 className="lg:text-3xl md:text-xl font-jakarta text-myblack my-2 font-semibold ">Transactions</h1>
                    <p className="md:text-lg sm:text-sm font-jakarta text-[#4B5563]">View all your blockchain transactions and mission progress </p>
                    <BlockchaintransactionsTable />
                </div>
            </div>
        </div>
    );
};



export default BlockchainTrans ;
