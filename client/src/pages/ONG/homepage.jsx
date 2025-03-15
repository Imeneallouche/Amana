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

function HomePageONG() {
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
    * 
    */}
      <div className="grid mt-5 md:grid-cols-4 gap-5 mx-8">
      <div className="flex  bg-white  justify-start gap-5 items-center text-white rounded-xl  px-6 py-4  flex-1 shadow-lg transition-transform duration-300 hover:scale-105">
         <img src={img1}  className="w-12 h-12 p-2 rounded-lg bg-[#01321F] bg-opacity-30" /> 
            <div>         
                  <p className="text-sm text-[#4B5563] font-jakarta font-medium">Active Missions</p>
                  <p className="text-2xl text-myblack  font-jakarta font-extrabold">24</p>

            </div>
          </div>
           
          <div className="flex  bg-white  justify-start gap-5 items-center text-white rounded-xl  px-6 py-4  flex-1 shadow-lg transition-transform duration-300 hover:scale-105">
         <img src={img2}  className="w-12 h-12 p-2 rounded-lg bg-[#01321F] bg-opacity-30" /> 
            <div>         
                  <p className="text-sm text-[#4B5563] font-jakarta font-medium">Active Missions</p>
                  <p className="text-2xl text-myblack  font-jakarta font-extrabold">24</p>

            </div>
          </div>
          <div className="flex  bg-white  justify-start gap-5 items-center text-white rounded-xl  px-6 py-4  flex-1 shadow-lg transition-transform duration-300 hover:scale-105">
         <img src={img3}  className="w-12 h-12 p-2 rounded-lg bg-[#01321F] bg-opacity-30" /> 
            <div>         
                  <p className="text-sm text-[#4B5563] font-jakarta font-medium">Active Missions</p>
                  <p className="text-2xl text-myblack  font-jakarta font-extrabold">24</p>

            </div>
          </div>

          <div className="flex  bg-white  justify-start gap-5 items-center text-white rounded-xl  px-6 py-4  flex-1 shadow-lg transition-transform duration-300 hover:scale-105">
         <img src={img4}  className="w-12 h-12 p-2 rounded-lg bg-[#01321F] bg-opacity-30" /> 
            <div>         
                  <p className="text-sm text-[#4B5563] font-jakarta font-medium">Active Missions</p>
                  <p className="text-2xl text-myblack  font-jakarta font-extrabold">24</p>

            </div>
          </div>

</div>
          <DonationGrid />
          </div>
        </div>
      </div>

    </div>
  );
};


export default HomePageONG;