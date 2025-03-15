import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import ONGCard from "./ONGCard"; 
import barakaImage from "../assets/baraka.jpg"; // Replace with actual images
import { ArrowRight, ArrowLeft } from "iconsax-react"; 

export default function ONGSlider() {
  const organizations = [
    { name: "El-Baraka", description: "El Baraka is an Algerian charity collecting donations for Palestine.", image: barakaImage },
    { name: "Hope Foundation", description: "Providing education and healthcare to children in need worldwide.", image: barakaImage },
    { name: "Human Relief", description: "Emergency aid and shelter for disaster-affected regions.", image: barakaImage },
    { name: "Green Earth", description: "Promoting environmental sustainability and reforestation projects.", image: barakaImage },
    { name: "Care Alliance", description: "Supporting vulnerable communities with medical aid and resources.", image: barakaImage },
  ];

  return (
    <div className="w-full  relative ml-12 flex flex-col items-center">
      {/* Swiper Slider */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView="auto"
        pagination={{ clickable: true, el: ".custom-pagination" }}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        className="w-full"
      >
        {organizations.map((org, index) => (
          <SwiperSlide key={index} className="!w-auto"> 
            <ONGCard name={org.name} description={org.description} image={org.image} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Below */}
      <div className="custom-pagination mt-4 flex justify-center gap-2"></div>



      {/* Custom Styles for Pagination Dots */}
      <style jsx>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #4a7c59; /* Inactive color */
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 20px;
          height: 8px;
          border-radius: 10px; /* Pill shape */
          background-color: #0f3d21; /* Active color */
        }
      `}</style>
    </div>
  );
}
