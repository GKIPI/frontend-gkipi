"use client";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useState } from "react";
import SMH from '../../../public/dummy/gkpi1.jpeg'
import Image from "next/image";
import Building from "../../../public/buildings.png"
import Map from "../../../public/map.png"


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
        company: `Company ${i}`,
        location: `Location ${i}`,
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
        <div className="container mx-auto px-4 sm:px-8 flex-grow w-[75%]">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            pagination={{ clickable: true }}>
            {chunkedCards.map((card, index) => (
              <SwiperSlide key={index}>
                <Card array={card} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}

const Card = ({ array }) => {
  return (
    <div className="grid gap-2 sm:gap-5 grid-cols-2 lg:grid-cols-3 mx-0 p-[5%] xs:p-5 sm:p-8 md:p-12 w-full overflow-x-hidden overflow-y-hidden">
      {array.map((card, i) => (
        <div key={i} className="max-h-[370px] w-full shadow-md p-4">
          <div className="bg-slate-300 animate-pulse  h-[250px] w-full overflow-y-hidden">
            {/* <Image src={SMH} className="w-full" /> */}
          </div>
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <div className="flex flex-row justify-between mx-3">
            <div className="flex flex-row">
              <div className="flex items-center">
                <Image src={Building} />
              </div>
              <div className="text-sm mx-2">{card.company}</div>
            </div>
            <div className="flex flex-row">
              <div className="flex items-center">
                <Image src={Map} />
              </div>
              <div className="text-sm mx-2">{card.location}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
