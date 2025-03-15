import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import box from "../../assets/box.svg";
import swap from "../../assets/convert-3d-cube.svg";
import scan from "../../assets/3d-cube-scan.svg";
import check from "../../assets/box-tick.svg";

const steps = [
  { id: 1, title: "Start of the donation", description: "You have chosen to sponsor an orphan in Gaza. Your donation is ready to be sent.", delay: 3, pos: 1, img: box },
  { id: 2, title: "Information check", description: "Computers are verifying that everything is correct (amount, recipient).", delay: 6, pos: 0, img: swap },
  { id: 3, title: "Secure registration", description: "Your donation is now recorded in a secure registry. It can no longer be modified.", delay: 9, pos: 1, img: scan },
  { id: 4, title: "Donation confirmed", description: "The money is being sent. You will receive proof (photos, videos, receipts).", delay: 12, pos: 0, img: check },
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
        <div className="mx-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Transaction Process Visualization</h2>

          {/* Timeline Section */}
          <div className="relative flex flex-col items-center">
            {/* Horizontal Timeline Line */}
            <div className="absolute top-[50%] left-0 right-0 mx-auto h-[4px] bg-blue-500 w-full"></div>

            {/* Steps Positioned Above and Below Timeline */}
            <div className="flex justify-evenly w-full relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative w-[20%]">
                  
                  {/* Step Text + Image (Alternating Positions) */}
                  {step.pos === 1 && (
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: visibleStep >= index + 1 ? 1 : 0.3 }}
                      transition={{ duration: 1 }}
                      className="flex flex-col items-center mb-6"
                    >
                      <img src={step.img} alt={step.title} className="w-[80px] h-[80px] mb-2" />
                      <h3 className="text-md font-semibold">{step.title}</h3>
                      <p className="text-gray-600 text-sm mt-2 text-center">{step.description}</p>
                    </motion.div>
                  )}

                  {/* Circle in the Center (Step Indicator) */}
                  <motion.div
                    className={`w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow-lg absolute top-[50%] transform -translate-y-1/2`}
                    initial={{ opacity: 0.3, scale: 0.8 }}
                    animate={{
                      opacity: visibleStep >= index + 1 ? 1 : 0.3,
                      scale: visibleStep >= index + 1 ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>

                  {/* Step Text + Image (Alternating Positions) */}
                  {step.pos === 0 && (
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: visibleStep >= index + 1 ? 1 : 0.3 }}
                      transition={{ duration: 1 }}
                      className="flex flex-col items-center mt-6"
                    >
                      <img src={step.img} alt={step.title} className="w-[80px] h-[80px] mb-2" />
                      <h3 className="text-md font-semibold">{step.title}</h3>
                      <p className="text-gray-600 text-sm mt-2 text-center">{step.description}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Simulation;
