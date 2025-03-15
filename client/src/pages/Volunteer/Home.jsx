import React from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import ONGSlider from "../../components/ONGSlider";
import DonationGrid from "../../components/PostsGrid";
import SearchFilters from "../../components/Search";
function HomePage() {
  return (
    <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen overflow-hidden ">
      {/* Sidebar with fixed width */}
      <SideBar className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />

      {/* Main content area */}

      <div className="flex-1 flex flex-col overflow-scroll">
        <Header />
        <div className="  overflow-visible">

          <SearchFilters className='mr-12 sticky top-0 bg-white z-10' />

          <ONGSlider className="w-full " />

          <p className='font-jakarta text-[24px] font-bold ml-12 text-myblack'>Current Campaigns You Can Contribute To</p>

          <DonationGrid />
        </div>
      </div>
    </div>
  );
};


export default HomePage;