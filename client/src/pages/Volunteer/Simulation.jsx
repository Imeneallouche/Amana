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
      <SideBar className="w-64 min-w-[16rem] h-full bg-white shadow-lg" />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <div className="mx-12">
          <h2 className="text-2xl font-bold mb-6">Transaction Process Visualization</h2>
          <div className="relative flex flex-row h-[600px] justify-evenly items-center">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex flex-col w-[20%] ${step.pos === 1 ? "place-self-start" : "place-self-end"}`}>
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: visibleStep >= index + 1 ? 1 : 0.3 }}
                  transition={{ duration: 1 }}
                  className={`flex ${step.pos === 1 ? "flex-col" : "flex-col-reverse"} items-center gap-4`}
                >
                  <img src={step.img} alt={step.title} className="w-[120px] h-[120px] mb-2" />
                  <div className="flex flex-col h-full text-center">
                    <h3 className="text-md font-semibold">{step.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{step.description}</p>
                  </div>
                  <motion.div
                    className={`w-6 h-6 rounded-full border-4 ${
                      visibleStep >= index + 1 ? "border-mygreen bg-mygreen" : "border-gray-400 bg-white"
                    }`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: visibleStep >= index + 1 ? 1 : 0.5 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </div>
            ))}

            {/* Timeline */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-evenly items-center w-full transform -translate-y-1/2">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-center w-[20%]">
                  {/* Connecting Dots */}
                  {index > 0 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: visibleStep >= index + 1 ? "100%" : "0%" }}
                      transition={{ duration: 1 }}
                      className="absolute h-[4px] top-1/2 left-[-50%] w-full transform -translate-y-1/2 flex justify-between items-center"
                    >
                      {Array.from({ length: 10 }).map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`w-2 h-2 rounded-full ${visibleStep >= index + 1 ? "bg-mygreen bg-opacity-30 shadow-[2px] shadow-blur-[1px]" : "bg-gray-300"}`}
                        />
                      ))}
                    </motion.div>
                  )}
                  {/* Circle Indicator
                  <motion.div
                    className={`w-6 h-6 rounded-full border-4 ${
                      visibleStep >= index + 1 ? "border-mygreen bg-mygreen" : "border-gray-400 bg-white"
                    }`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: visibleStep >= index + 1 ? 1 : 0.5 }}
                    transition={{ duration: 0.5 }}
                  /> */}
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
