import React from "react";
import SideBar from "../../components/SideBar";
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
//dummy data just to demonstrate the front end 
const TotalMissions =24;
const TotalDonations= 12450;
const LivesSaved=15;
const PeopleFed=127;
const SocialImpact=89;
function Achievements() {
  
  return (
  <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
    {/* Sidebar with fixed width */}
    <SideBar className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />

    {/* Main content area */}
    
    <div className="flex-1 flex flex-col overflow-auto">
          <div className="flex-1 flex flex-col overflow-auto">
      <Header/>
      <div className="mx-24">
      <h1 className="lg:text-3xl md:text-xl font-jakarta text-myblack mb-2 font-semibold ">Achievements</h1>
      <p className="md:text-lg sm:text-sm font-jakarta text-[#4B5563]">Track your contributions and their impact</p>
      {/*THe three cards*/}
      <div className="grid mt-5 md:grid-cols-3 gap-5">
      <div className="flex  bg-mygreen justify-between items-center text-white rounded-xl  px-6 py-2  flex-1 shadow-lg">
          <div>
            
            <p className="text-md font-jakarta font-medium">Total Missions</p>
            <p className="text-2xl font-jakarta font-bold">{TotalMissions}</p>
          </div>
          <img src={hand} style={{ width: "33px", height: "30px" }} alt="Hand" />
          </div>

          <div className="flex  bg-[#FFD599] justify-between items-center text-white rounded-xl px-6 py-2 flex-1 shadow-lg">
          <div>
            
            <p className="text-md text-mygreen font-jakarta font-medium">Total Donations</p>
            <p className="text-2xl text-mygreen font-jakarta font-bold">{TotalDonations}</p>
            <p className="text-md text-mygreen font-jakarta font-medium">In 2025</p>
          </div>
          <img src={dollar} style={{ width: "33px", height: "30px" }} alt="Hand" />
          </div>

        

          <div className="flex flex-col bg-mygreen justify-between items-start text-white font-jakarta rounded-xl px-6 py-2 flex-1 shadow-lg">
  <span className="text-sm  flex justify-between w-full">
    <span>Lives Saved</span> 
    <span className="font-bold">{LivesSaved}</span>
  </span>
  <span className="text-sm  flex justify-between w-full mt-2">
    <span>People Fed</span> 
    <span className="font-bold">{ PeopleFed}</span>
  </span>
  <span className="text-sm flex justify-between w-full mt-2">
    <span>Social Impact</span> 
    <span className="font-bold">{SocialImpact}</span>
  </span>
</div>

          </div>
    {/*The badges section*/}  
      <div className="bg-white  mt-5 rounded-lg flex flex-col gap-5 p-5 ">
      <h1 className="lg:text-lg md:text-md font-jakarta text-myblack mb-2 font-semibold ">Your Achievement Badges</h1>

      <div className="flex flex-col justify-evenly md:flex-row items-center gap-12">
  <div className="flex flex-col   items-center text-center">
    <img src={badge3} alt="Saved 10+ lives" className="w-16 h-16" />
    <span className="text-sm text-gray-900 font-semibold mt-2">Life Savior</span>
    <span className="text-xs text-gray-600 font-medium mt-2">Saved 10+ lives</span>

  </div>
  <div className="flex flex-col items-center text-center">
    <img src={badge4} alt="Fed 50+ people" className="w-16 h-16" />
    <span className="text-sm text-gray-900 font-semibold mt-2">Hope Bringer</span>
    <span className="text-xs text-gray-600 font-medium mt-2">Fed 50+ person</span>

  </div>
  <div className="flex flex-col items-center text-center">
    <img src={badge2} alt="Improved 50+ lives" className="w-16 h-16" />

    <span className="text-sm text-gray-900 font-semibold mt-2">Future Shaper</span>
    <span className="text-xs text-gray-600 font-medium mt-2">Imporoved 50+ lives</span>

  </div>
  <div className="flex flex-col items-center text-center">
    <img src={badge1} alt="1 year active" className="w-16 h-16" />
    <span className="text-sm text-gray-900 font-semibold mt-2">Guardian Angel</span>
    <span className="text-xs text-gray-600 font-medium mt-2">1 year active</span>

  </div>
</div>
    {/*the videos section*/}
    <h1 className="lg:text-lg md:text-md font-jakarta text-myblack mb-2 font-semibold ">Your Impact Stories</h1>
      <BlogSlide/>
      <h1 className="lg:text-lg md:text-md font-jakarta  text-myblack mb-2 font-semibold ">Your Impact Stories</h1>
      <ImpactReports/>

      </div>
    
    
  </div>
  </div>
  </div>
  </div>  
);
};
export default Achievements;