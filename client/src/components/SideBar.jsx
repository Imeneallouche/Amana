import { Sidebar } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.svg";
import { I3DCubeScan, EmptyWallet,MedalStar, Home2, LogoutCurve} from "iconsax-react"; 


export function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const getItemClass = (path) =>
    `rounded-lg p-2  flex items-center gap-2 text-md transition font-jakarta
    ${ 
      location.pathname === path
        ? "bg-[#D9D9D9] bg-opacity-40 text-[#C1B49A]" // Active item style
        : "text-[#F9F9F9] text-opacity-60 hover:bg-[#1D3D31]"
    }`;

  const getIconClass = (path) =>
    location.pathname === path ? "text-[#C1B49A]" : "text-[#C1B49A]"; 

  const handleLogout = () => {
    // Logout logic here
  };

  return (
    <Sidebar className="h-screen w-[18.6%] bg-[#032B20] shadow-lg text-[#C1B49A]">
      <div className="flex flex-col items-center py-6 mb-6  mt-8">
        <img src={logo} alt="Amanah" className="h-20" />
      </div>

      <Sidebar.Items>
        <Sidebar.ItemGroup>

          <Sidebar.Item 
          to="/homeVolunteer"
            className={`${getItemClass("/homeVolunteer")} flex items-center my-2 mx-5 gap-8 `} 
            icon={() => <Home2 size="20" className="ml-3"  variant="Bold" color={location.pathname === "/homeVolunteer" ? "#C1B49A" : "#96A9A2"} />}
            >
            Home
          </Sidebar.Item>

          <Sidebar.Item 
            
            className={`${getItemClass("/simulation")} flex items-center mx-5 my-2 gap-8 `} 
            icon={() => <I3DCubeScan size="20" className="ml-3"  variant="Bold" color={location.pathname === "/dashboard" ? "#C1B49A" : "#96A9A2"} />}
            >
            Simulation
          </Sidebar.Item>

          <Sidebar.Item 
          to="/transactionsVolunteer"
            className={`${getItemClass("/transactions")} flex items-center mx-5 my-2  gap-8`}
            icon={() => <EmptyWallet size="20" className="ml-3" variant="Bold" color={location.pathname === "/transactionsVolunteer" ? "#C1B49A" : "#96A9A2"} />}
            >
            Transactions
          </Sidebar.Item>

          <Sidebar.Item 
            className={`${getItemClass("/achievements")} flex items-center mx-5 my-2 gap-8 `}
            icon={() => <MedalStar size="20" className="ml-3"  variant="Bold" color={location.pathname === "/dashboard" ? "#C1B49A" : "#96A9A2"} />}
            >
            Achievements
          </Sidebar.Item>

          <button onClick={handleLogout} className="w-full text-left mt-auto mb-4">
    <Sidebar.Item 
      className={`${getItemClass("/logout")} flex items-center mx-5 my-2 gap-8`} 
      icon={() => <LogoutCurve size="20" className="ml-3" variant="Bold" color="#96A9A2" />}
    >
      Log Out
    </Sidebar.Item>
  </button>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
