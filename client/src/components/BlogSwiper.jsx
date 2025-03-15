import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import BlogCard from "./BlogCard";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import bg from "../assets/dates.jpg";
import bg1 from '../assets/img.png';
import bg2 from '../assets/healthcare.png';
const blogPosts = [
  { title: "Education Mission", date: "March 2025", description: "A journey to empower young minds through quality education.", img: bg1 },
  { title: "Healthcare Support", date: "April 2025", description: "Providing medical aid to communities in need.", img: bg2 },
  { title: "Food Distribution", date: "May 2025", description: "Ensuring no family goes hungry through our outreach programs.", img: bg },
  { title: "Disaster Relief", date: "June 2025", description: "Helping communities rebuild after natural disasters.", img: bg },
  { title: "Environmental Initiative", date: "July 2025", description: "Promoting sustainability through various programs.", img: bg },
];

export default function BlogSlider() {
  return (
    <div className="w-full relative flex flex-col items-center">
      {/* Swiper Slider */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {blogPosts.map((post, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <BlogCard title={post.title} date={post.date} description={post.description} img={post.img} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Pagination Below */}
      <div className="custom-pagination mt-4 flex justify-center gap-2"></div>

      {/* Navigation Arrows */}
      <div className="flex gap-4 mt-4">
        <button className="swiper-button-prev custom-nav bg-gray-400 bg-opacity-30  text-white p-2 rounded-full shadow-md">
          <ArrowLeft size="17" color="#9CA3AF" />
        </button>
        <button className="swiper-button-next custom-nav bg-gray-400 bg-opacity-30 text-white p-2 rounded-full shadow-md">
          <ArrowRight size="17" color="#9CA3AF" />
        </button>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #9CA3AF !important;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 50%;
          transition: background 0.3s ease;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: rgba(156, 163, 175, 0.5);
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #4a7c59;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 20px;
          height: 8px;
          border-radius: 10px;
          background-color: #0f3d21;
        }
      `}</style>
    </div>
  );
}
