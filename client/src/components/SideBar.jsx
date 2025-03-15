import { Sidebar } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { I3DCubeScan, EmptyWallet, MedalStar, Home2, LogoutCurve, ArrowDown2 } from "iconsax-react";

export function SideBar() {
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
              onClick={() => navigate("/homeVolunteer")}
            className={`${getItemClass("/homeVolunteer")} items-center lg:gap-[10%] my-2 border-0`}
            icon={() => <Home2 size="20" variant="Bold" color={location.pathname === "/homeVolunteer" ? "#C1B49A" : "#96A9A2"} />}
          >
            Home
          </Sidebar.Item>

          <Sidebar.Item
            onClick={() => navigate("/simulation")}
            className={`${getItemClass("/simulation")} flex items-center lg:gap-[10%] my-2`}
            icon={() => <I3DCubeScan size="20" variant="Bold" color={location.pathname === "/simulation" ? "#C1B49A" : "#96A9A2"} />}
          >
            Simulation
          </Sidebar.Item>

          <div>
            <button onClick={toggleTransactions} className={`w-full text-left ${getItemClass("/transactionsVolunteer")} flex items-center lg:gap-[10%] my-2`}>
              <EmptyWallet size="20" variant="Bold" color="#96A9A2" />
              <span className="ml-2">Transactions</span>
              <ArrowDown2 size="16" className={`ml-auto transition-transform ${isTransactionsOpen ? "rotate-180" : "rotate-0"}`} />
            </button>
            {isTransactionsOpen && (
              <div className="ml-6">
                <Sidebar.Item
                  onClick={() => navigate("/transactionsVolunteerInProgress")}
                  className={`${getItemClass("/transactionsVolunteerInProgress")} flex items-center lg:gap-[10%] my-2`}
                >
                  Pending
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => navigate("/transactionsVolunteerCompleted")}
                  className={`${getItemClass("/transactionsVolunteerCompleted")} flex items-center lg:gap-[10%] my-2`}
                >
                  Achieved
                </Sidebar.Item>
              </div>
            )}
          </div>

          <Sidebar.Item
            onClick={() => navigate("/achievementsVolunteer")}
            className={`${getItemClass("/achievementsVolunteer")} flex items-center lg:gap-[10%] my-2`}
            icon={() => <MedalStar size="20" variant="Bold" color={location.pathname === "/achievementsVolunteer" ? "#C1B49A" : "#96A9A2"} />}
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

export default SideBar;
