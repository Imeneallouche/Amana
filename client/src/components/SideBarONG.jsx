import { Sidebar } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { I3DCubeScan, EmptyWallet, MedalStar, Home2, LogoutCurve, ArrowDown2 } from "iconsax-react";

export function SideBarONG() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

  const getItemClass = (path) =>
    `rounded-lg py-2 px-1 xl:px-2 flex items-center text-[0.5rem] md:text-[0.6rem] lg:text-[0.75rem] xl:text-[1rem] transition font-jakarta
    ${location.pathname === path ? "bg-[#D9D9D9] bg-opacity-40 text-[#C1B49A]" : "text-[#F9F9F9] text-opacity-60 hover:bg-[#1D3D31]"}`;

  const toggleTransactions = () => {
    setIsTransactionsOpen(!isTransactionsOpen);
  };

  const handleLogout = () => {
    // Logout logic here
  };

  return (
    <Sidebar className="h-screen px-3 w-[18.6%] bg-[#032B20] shadow-lg border-0 z-20 text-[#C1B49A]">
      <div className="flex flex-col items-center py-6 mb-6 mt-8">
        <img src={logo} alt="Amanah" className="h-20" />
      </div>

      <Sidebar.Items className="!border-none">
        <Sidebar.ItemGroup className="!border-none">
          <Sidebar.Item
              onClick={() => navigate("/homeONG")}
            className={`${getItemClass("/homeONG")} items-center lg:gap-[10%] my-2 border-0`}
            icon={() => <Home2 size="20" variant="Bold" color={location.pathname === "/homeONG" ? "#C1B49A" : "#96A9A2"} />}
          >
            Home
          </Sidebar.Item>

          <Sidebar.Item
            onClick={() => navigate("/requests")}
            className={`${getItemClass("/requests")} flex items-center lg:gap-[10%] my-2`}
            icon={() => <I3DCubeScan size="20" variant="Bold" color={location.pathname === "/requests" ? "#C1B49A" : "#96A9A2"} />}
          >
            Requests
          </Sidebar.Item>

          <Sidebar.Item
            onClick={() => navigate("/TransactionsONG")}
            className={`${getItemClass("/TransactionsONG")} flex items-center lg:gap-[10%] my-2`}
            icon={() => <EmptyWallet size="20" variant="Bold" color={location.pathname === "/TransactionsONG"? "#C1B49A" : "#96A9A2"} />}
          >
            Transactions
          </Sidebar.Item>


          <Sidebar.Item
            onClick={() => navigate("/AchievementsONG")}
            className={`${getItemClass("/AchievementsONG")} flex items-center lg:gap-[10%] my-2`}
            icon={() => <MedalStar size="20" variant="Bold" color={location.pathname === "/AchievementsONG" ? "#C1B49A" : "#96A9A2"} />}
          >
            Achievements
          </Sidebar.Item>

          <button onClick={handleLogout} className="w-full text-left mt-auto mb-4">
            <Sidebar.Item
              className={`${getItemClass("/logout")} flex items-center my-2 lg:gap-[10%]`}
              icon={() => <LogoutCurve size="20" variant="Bold" color="#96A9A2" />}
            >
              Log Out
            </Sidebar.Item>
          </button>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBarONG;
