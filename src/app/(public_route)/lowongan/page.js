"use client";

import Sidebar from "./sidebar";
import { useState, useEffect } from "react";

import BlurredOnLoad from "@/app/loading";
import Modal from "@/app/components/modal";
import Link from "next/link";
import { parseBlobToURL } from "../../../../helper/imageDownloader";
import Card from "./card";


import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "next/image";
import Map from "../../../../public/map.png"


export default function Lowongan() {
  const [isLoading, setIsLoading] = useState(true)
  const [activePage, setActivePage] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalContent, setSelectedModalContent] = useState(null);

  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);


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
          setCards(data.seekers);
          setIsLoading(false)
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
          setCards(data.vacancies)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [activePage])

  const onSelect = () => {
    setIsLoading(true)
    setActivePage(!activePage);
    setCards([])
  };

  const handleSearch=()=>{
    console.log("selected ind:", selectedIndustries)
    console.log("selected tit:", selectedTitles)
  }

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
    <>
      {isLoading ? (<BlurredOnLoad />) : (
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
            {/* <Sidebar
              handleSearch={handleSearch}
              selectedIndustries={selectedIndustries}
              setSelectedIndustries={setSelectedIndustries}
              selectedTitles={selectedTitles}
              setSelectedTitles={setSelectedTitles}
            /> */}

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
                    pagination={{ clickable: true }}
                    navigation
                  >
                    {chunkedCards.map((card, index) => (
                      <SwiperSlide key={index}>
                        <Card
                          array={card}
                          type={activePage}
                          selected={selectedModalContent}
                          onClicked={(card) => {
                            setIsModalOpen(true);
                            setSelectedModalContent(card);
                          }} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="swiper-pagination"></div>
                </>
              )}
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedModalContent?.jobTitle}
            content={
              <>
                <div className="w-full lg:flex gap-6">
                  <div className="w-3/5">
                    <Link href={parseBlobToURL(selectedModalContent?.image)} target="_blank">
                      <img src={selectedModalContent?.image}></img>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center">
                      <p className="w-full font-poppins text-4xl font-semibold">{selectedModalContent?.jobTitle}</p>
                    </div>
                    {activePage ?
                      <div className="border-2 p-2 rounded-md ">
                        <div className="flex items-center">
                          <p className="w-full font-montserrat font-semibold">name: {selectedModalContent?.name}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-full font-montserrat font-medium">education: {selectedModalContent?.education}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-full font-montserrat font-medium">sex: {selectedModalContent?.sex}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-full font-montserrat font-medium">tag: {selectedModalContent?.tag[0]}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-full font-montserrat font-medium">title job: {selectedModalContent?.tag[1]}</p>
                        </div>
                      </div> :
                      <div className="border-2 p-2 rounded-md ">
                        <div className="flex items-center">
                        <Image src={Map} />
                          <p className="mx-1 w-full font-montserrat text-lg">{selectedModalContent?.location}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-full font-montserrat font-medium">notes: </p>
                          <p className="">{selectedModalContent?.notes}</p>
                        </div>
                        <div className="flex flex-row justify-between">  
                        <div className="flex items-center">
                          <p className="w-full font-montserrat text-sm">{selectedModalContent?.tag[0]}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-full font-montserrat text-sm"> {selectedModalContent?.tag[1]}</p>
                        </div>
                        </div>
                      </div>
                    }

                  </div>
                </div>
              </>

            }
          />

        </section>

      )}
    </>
  );
}