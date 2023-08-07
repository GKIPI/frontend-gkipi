"use client";

import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Building from "../../../../public/buildings.png"
import Map from "../../../../public/map.png"


import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

export default function Lowongan() {
  const [activePage, setActivePage] = useState(true);

  useEffect(() => {
    if (activePage) {
      fetch(`/api/seeker`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.seekers)
          setCards(data.seekers);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      fetch(`/api/vacancy`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)
          setCards(data.vacancies)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [activePage])

  const onSelect = () => {
    setActivePage(!activePage);
    setCards([])
  };


  const [cards, setCards] = useState([])

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
      <div className="min-h-[80vh] flex">
        <Sidebar />
        <div className="container mx-auto px-4 sm:px-8 flex-grow w-[75%]">
          {chunkedCards.length === 0 ? (
            <div className="text-center mt-8">
              <h2 className="text-2xl font-bold mb-4">There is no data uploaded yet.</h2>
            </div>
          ) : (
            <>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true }}>
                {chunkedCards.map((card, index) => (
                  <SwiperSlide key={index}>
                    <Card array={card} type={activePage} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination"></div>
            </>
          )}
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}

const Card = ({ array, type }) => {
  if (type === false)
    return (
      <div className="grid gap-2 sm:gap-5 grid-cols-2 lg:grid-cols-3 mx-0 p-[5%] xs:p-5 sm:p-8 md:p-12 w-full overflow-x-hidden overflow-y-hidden">
        {array.map((card, i) => (
          <div key={i} className="max-h-[370px] w-full shadow-md p-4">
            <div className="bg-slate-300 h-[250px] w-full overflow-y-hidden">
              <img src={card.image} alt="CV Preview" />
            </div>
            <h2 className="text-xl font-bold mb-2 line-clamp-1	">{card.title}</h2>
            <div className="flex flex-row justify-between mx-3">
              <div className="flex flex-row">
                <div className="flex items-center">
                  <Image src={Building} />
                </div>
                <div className="text-sm mx-2 line-clamp-1	">{card.company}</div>
              </div>
              <div className="flex flex-row">
                <div className="flex items-center">
                  <Image src={Map} />
                </div>
                <div className="text-sm mx-2 line-clamp-1	">{card.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="grid gap-2 sm:gap-5 grid-cols-2 lg:grid-cols-3 mx-0 p-[5%] xs:p-5 sm:p-8 md:p-12 w-full overflow-x-hidden overflow-y-hidden">
      {array.map((card, i) => (
        <div key={i} className="max-h-[370px] w-full shadow-md p-4">
          <div className="bg-slate-300 h-[250px] w-full overflow-y-hidden">
            <img src={card.image} alt="CV Preview" />
          </div>
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <div className="flex flex-row justify-between mx-3">
            <div className="flex flex-col">
              <h3 className="text-xs p-0 m-0 line-clamp-1	">{card.name}</h3>
              <h1 className="font-bold p-0 m-0 line-clamp-1	">{card.jobTitle}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};
