import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import box from "../../assets/box.svg";
import swap from "../../assets/convert-3d-cube.svg";
import scan from "../../assets/3d-cube-scan.svg";
import check from "../../assets/box-tick.svg";
const steps = [
  { id: 1, title: "Start of the donation", description: "You have chosen to sponsor an orphan in Gaza. Your donation is ready to be sent.", delay: 3, pos: 1 , img: box },
  { id: 2, title: "Information check", description: "Computers are verifying that everything is correct (amount, recipient).", delay: 6, pos: 0 , img: swap },
  { id: 3, title: "Secure registration", description: "Your donation is now recorded in a secure registry. It can no longer be modified.", delay: 9, pos: 1 ,img: scan },
  { id: 4, title: "Donation confirmed", description: "The money is being sent. You will receive proof (photos, videos, receipts).", delay: 12, pos: 0 ,img: check },
];

function Simulation() {
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    steps.forEach((step, index) => {
      setTimeout(() => {
        setVisibleStep(index + 1);
      }, step.delay * 1000);
    });
  }, []);

  return (
    <div className="font-lora flex bg-[#F9F9F9] w-screen h-screen">
      {/* Sidebar */}
      <SideBar className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <div className="mx-12 ">
          <h2 className="text-2xl font-bold mb-1">Transaction Process Visualization</h2>

          {/* Flexbox container for aligning items */}
          <div className="flex flex-row h-[600px]  justify-evenly ">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex flex-col w-[20%] ${step.pos === 1 ? "place-self-start" : "place-self-end"}`}>
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: visibleStep >= index + 1 ? 1 : 0.3 }}
                  transition={{ duration: 1 }}
                  className="flex flex-col items-center"
                >
                   <img src={step.img} alt={step.title} className="w-[120px] h-[120px] mb-2" /> 
                 <div className="
                    flex flex-col  h-full">
                  <div className="flex items-center">
                    
                  <h3 className="text-md  font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{step.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Simulation;
