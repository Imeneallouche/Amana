import React from "react";
import SideBarONG from "../../components/SideBarONG";
import Header from "../../components/Header";
import hand from '../../assets/hand.svg';
import dollar from '../../assets/dollar.svg';
import badge1 from '../../assets/badge1.svg';
import badge2 from '../../assets/badge2.svg';
import badge3 from '../../assets/badge3.svg';
import badge4 from '../../assets/badge4.svg';
import BlogCard from "../../components/BlogCard";
import BlogSlide from "../../components/BlogSwiper";
import ImpactReports from "../../components/reports";
import img1 from "../../assets/ii1.svg";
import img2 from "../../assets/ii2.svg";
import img3 from "../../assets/ii3.svg";
import { ArrowUp ,Repeat , Cup} from "iconsax-react";

//dummy data just to demonstrate the front end 
const TotalMissions =1245;
const TotalDonations= 12450;
const LivesSaved=15;
const PeopleFed=127;
const SocialImpact=89;
function AchievementsONG() {
  
  return (
  <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
    {/* Sidebar with fixed width */}
    <SideBarONG className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />

    {/* Main content area */}
    
    <div className="flex-1 flex flex-col overflow-auto">
          <div className="flex-1 flex flex-col overflow-auto">
      <Header/>
      <div className="mx-24">
      <h1 className="lg:text-3xl md:text-xl font-jakarta text-myblack mb-2 font-semibold ">Achievements</h1>
      <p className="md:text-lg sm:text-sm font-jakarta text-[#4B5563]">Track your contributions and their impact</p>
      {/*THe three cards*/}
      <div className="grid mt-5 md:grid-cols-3 gap-5">
      <div className="flex  bg-mygreen justify-between items-center text-white rounded-xl  px-6 py-4  flex-1 shadow-lg">
          <div>
            
            <p className="text-sm font-jakarta font-medium">Total Missions</p>
            <p className="text-2xl font-jakarta font-extrabold">{TotalMissions}</p>
         <ArrowUp size="18" variant="linear" color="white" className="inline" /><span className="font-jakarta text-sm text-white">12% increase </span>


          </div>
          <div className="w-12 h-12 rounded-full bg-[#FFD599] flex items-center justify-center">
           <img src={img2} className="w-6 h-6 object-contain rounded-full" alt="Hand" />
           </div>   
                  </div>

            <div className="flex  bg-[#FFD599] justify-between items-center text-white rounded-xl  px-6 py-4  flex-1 shadow-lg">
          <div>
            
            <p className="text-sm font-jakarta text-mygreen font-medium">Ongoing Missions</p>
            <p className="text-2xl text-mygreen font-jakarta font-extrabold">843</p>
         <Repeat size="18" variant="linear" color="black" className="inline" /><span className="font-jakarta text-sm text-mygreen">Active Now </span>


          </div>
          <div className="w-12 h-12 rounded-full bg-mygreen flex items-center justify-center">
           <img src={img3} className="w-6 h-6 object-contain rounded-full" alt="Hand" />
           </div>   
                  </div>  

        
                  <div className="flex  bg-mygreen justify-between items-center text-white rounded-xl  px-6 py-4  flex-1 shadow-lg">
          <div>
            
            <p className="text-sm font-jakarta font-medium">Accomplished Missions</p>
            <p className="text-2xl font-jakarta font-extrabold">1705</p>
         <Cup size="18" variant="Bold" color="white" className="inline" /><span className="font-jakarta text-sm text-white">67% success rate  </span>


          </div>
          <div className="w-12 h-12 rounded-full bg-[#FFD599] flex items-center justify-center">
           <img src={img1} className="w-6 h-6 object-contain rounded-full" alt="Hand" />
           </div>   
                  </div>

          </div>
    {/*The badges section*/}  
      <div className="bg-white  mt-5 rounded-lg flex flex-col gap-5 p-5 ">

    {/*the videos section*/}
    <h1 className="lg:text-lg md:text-md font-jakarta text-myblack mb-2 font-semibold ">Your Impact Stories</h1>
      <BlogSlide/>


      </div>
    
    
  </div>
  </div>
  </div>
  </div>  
);
};
export default AchievementsONG;