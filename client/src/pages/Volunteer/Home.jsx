import React from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import ONGSlider from "../../components/ONGSlider";
import DonationGrid from "../../components/PostsGrid";
import SearchFilters from "../../components/Search";
function HomePage(){
    return (
        <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
          {/* Sidebar with fixed width */}
          <SideBar className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />
    
          {/* Main content area */}
          
          <div className="flex-1 flex flex-col overflow-auto">
            <Header/>
            <div className='ml-12'>
             <div className='mr-12'>
          <SearchFilters className='mr-12' />
          </div>
            <ONGSlider className="w-full" />
            </div>
            <p className='font-jakarta text-[24px] font-bold ml-12 text-myblack'>Current Campaigns You Can Contribute To</p>
            <div className="flex-1 overflow-auto px-6">
              <DonationGrid />
            </div>
          </div>
        </div>
      );
    };


export default HomePage;