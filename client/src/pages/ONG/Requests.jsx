import React from "react";
import Header from "../../components/Header";
import SideBarONG from "../../components/SideBarONG";
import ONGSlider from "../../components/ONGSlider";
import DonationGrid from "../../components/PostsGrid";
import SearchFilters from "../../components/Search";
import img1 from "../../assets/i1.svg";
import img2 from "../../assets/i1.svg";
import img3 from "../../assets/i2.svg";
import img4 from "../../assets/i3.svg";
import CareRequestGrid from "../../components/request";
function Requests() {
  return (
    <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
      {/* Sidebar with fixed width */}
      <SideBarONG className="w-64 min-w-[16rem] h-full  shadow-lg" />

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
  
          
          <div className="mx-8 mt-8">
   {/**
    */}

          <CareRequestGrid />
          </div>
        </div>
      </div>

    </div>
  );
};


export default Requests;