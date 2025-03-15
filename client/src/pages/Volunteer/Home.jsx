import React from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import ONGSlider from "../../components/ONGSlider";
import DonationGrid from "../../components/PostsGrid";
import SearchFilters from "../../components/Search";
function HomePage() {
  return (
    <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
      {/* Sidebar with fixed width */}
      <SideBar className="w-64 min-w-[16rem] h-full  shadow-lg" />

      {/* Main content area */}

      <div className="flex-1 flex flex-col overflow-scroll">

        <div className="fixed top-0 bg-[#F9F9F9] left-[18.6%] xl:w-[calc(100%-16rem)] z-10 p-4">
          <Header />
          <div className="mr-8">
          <SearchFilters  />
          </div>
        </div>
        <div 
        className=" overflow-x-hidden mt-36"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer & Edge
        }}>

          <ONGSlider />
          <div className="mx-8">
          <p className='font-jakarta text-[24px] font-bold mx-8 text-myblack'>Current Campaigns You Can Contribute To</p>

          <DonationGrid />
          </div>
        </div>
      </div>

    </div>
  );
};


export default HomePage;