"use client";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

export default function Lowongan() {
  const [activePage, setActivePage] = useState(true);
  const onSelect = (value) => {
    setActivePage(!activePage);
  };


  const generateCardData = () => {
    const cardData = [];
    for (let i = 1; i <= 24; i++) {
      cardData.push({
        title: `Card ${i}`,
        content: `This is the content of Card ${i}.`,
      });
    }
    return cardData;
  };

  const cards = generateCardData();

  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  const chunkedCards = chunkArray(cards, 6);

  return (
    <section className="mim-h-screen w-screen overflow-x-hidden overflow-y-hidden text-[24px]">
      <Navbar />
      <div className="w-full flex justify-center items-center">
        <div
          onClick={onSelect}
          className={
            "font-montserrat font-[900] m-7 cursor-pointer hover:bg-primary hover:text-white p-2 " +
            (activePage ? "text-black" : "text-black/25")
          }
        >
          Job Seeker
        </div>
        <div
          onClick={onSelect}
          className={
            "font-montserrat font-[900] m-7 cursor-pointer hover:bg-primary hover:text-white p-2 " +
            (activePage ? "text-black/25" : "text-black")
          }
        >
          Job Vacancies
        </div>
      </div>
      <div className="h-full flex">
        <Sidebar />
        <div className="container mx-auto px-4 sm:px-8 flex-grow">
          <Swiper
           modules={[Navigation, Pagination, Scrollbar, A11y]} 
           slidesPerView={1}
           navigation
           pagination={{clickable: true}}>
            {chunkedCards.map((card, index) => (
              <SwiperSlide key={index}>
                <Card array={card} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Add the pagination here */}
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}

// The Card component remains the same
const Card = ({ array }) => {
  return (
    <div className="grid gap-2 sm:gap-5 grid-cols-2 lg:grid-cols-3 mx-0 p-[5%] xs:p-5 sm:p-8 md:p-12 w-full overflow-x-hidden overflow-y-hidden">
      {array.map((card, i) => (
        <div key={i} className="max-h-[370px] w-full bg-black rounded-lg shadow-md p-4 text-white">
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};
