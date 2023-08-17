"use client";

import Sidebar from "./sidebar";
import { useState, useEffect } from "react";

import BlurredOnLoad from "@/app/loading";
import Modal from "@/app/components/modal";
import Link from "next/link";
import { parseBlobToURL } from "../../../../helper/imageDownloader";
import Card from "./card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";


import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "next/image";
import Map from "../../../../public/map.png"


export default function Lowongan() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [activePage, setActivePage] = useState(true);
  const [page, setPage] = useState(1);
  const [filteredCards, setFilteredCards] = useState([])

  const [swiper, setSwiper] = useState(null);
  const [lastPageReached, setLastPageReached] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalContent, setSelectedModalContent] = useState(null);

  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [cards, setCards] = useState([])
  const [selectedTitles, setSelectedTitles] = useState([]);

  useEffect(() => {
    setFilteredCards(filterCards(selectedIndustries, selectedTitles))
  }, [cards])

  useEffect(() => {
    setLastPageReached(false)
    if (activePage) {
      fetch(`/api/seeker?page=1`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCards(data.seekers);
          setFilteredCards(data.seekers)
          setIsLoading(false)
          setPage(1);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      fetch(`/api/vacancy?page=1`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCards(data.vacancies);
          setFilteredCards(data.vacancies)
          setIsLoading(false);
          setPage(1);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [activePage]);


  const onSelect = () => {
    setIsLoading(true)
    setActivePage(!activePage);
    setCards([])
    setFilteredCards([])

  };

  const filterCards = (selectedIndustries, selectedTitles) => {
    if (selectedIndustries.length == 0 && selectedTitles == 0) {
      return cards
    }
    const filteredCards = cards.filter(card => {
      const cardTags = card.tag || [];
      const industryMatch = selectedIndustries.some(industry => cardTags.includes(industry));
      const titleMatch = selectedTitles.some(title => cardTags.includes(title));
      return industryMatch || titleMatch;
    });

    return filteredCards;
  }


  const handleSearch = (selectedIndustries, selectedTitles) => {
    setFilteredCards(filterCards(selectedIndustries, selectedTitles))
  };

  const handleSlideChange = () => {
    if (swiper) {
      const { activeIndex } = swiper;
      if (activeIndex === chunkedCards.length - 1 && !lastPageReached) {
        fetchMoreData();
      }
    }
  };

  const fetchMoreData = () => {
    const nextPage = page + 1;

    const apiUrl = activePage ? `/api/seeker?page=${nextPage}` : `/api/vacancy?page=${nextPage}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (activePage == false) {
          if (data.vacancies && data.vacancies.length === 0) {
            setLastPageReached(true);
            setIsLoadingData(false)
          } else {
            setCards([...cards, ...data.vacancies]);
            setPage(nextPage);
            setIsLoadingData(false)
            swiper.slideNext();
          }
        } else {
          if (data.seekers && data.seekers.length === 0) {
            setLastPageReached(true);
            setIsLoadingData(false)
          } else {
            setCards([...cards, ...data.seekers])
            setPage(nextPage);
            setIsLoadingData(false)
            swiper.slideNext();
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };


  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  const chunkedCards = chunkArray(filteredCards, 6);

  return (
    <>
      {isLoading ? (
        <BlurredOnLoad/>
      ) : (
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
            <Sidebar
              handleSearch={handleSearch}
              selectedIndustries={selectedIndustries}
              setSelectedIndustries={setSelectedIndustries}
              selectedTitles={selectedTitles}
              setSelectedTitles={setSelectedTitles}
            />

            <div className="container mx-auto px-4 sm:px-8 flex-grow w-[75%]">
              {chunkedCards.length === 0 ? (
                <div className="text-center mt-8">
                  <h2 className="text-2xl font-bold mb-4">There is no data uploaded yet.</h2>
                </div>
              ) : (
                <>{isLoadingData ? 
                  <div className="absolute top-0 left-0 right-0 bottom-0 z-[900] flex justify-center items-center">
                  <div className="spinner"></div>
                </div>
                :
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    onSwiper={setSwiper}
                    onSlideChange={handleSlideChange}
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
                    <div
                      className="z-[1] hidden cursor-pointer unselectable lg:block absolute left-[-20px] text-[80px] top-[50%] translate-y-[-50%] "
                      onClick={() => {
                        if (swiper.activeIndex === 0) return;
                        swiper.slidePrev();
                      }}
                    >
                      <IoIosArrowBack />
                    </div>
                    <div
                      className="z-[1] hidden cursor-pointer unselectable lg:block absolute right-[-20px] text-[80px] top-[50%] translate-y-[-50%]"
                      onClick={() => {
                        if (swiper.activeIndex + 1 === page) {
                          if(lastPageReached)return
                          setIsLoadingData(true)
                          fetchMoreData()
                        }
                        swiper.slideNext();
                      }}
                    >
                      <IoIosArrowForward />
                    </div>
                  </Swiper>}
                  <div className="swiper-pagination"></div>
                  <div className="flex lg:hidden gap-8 text-[35px] sm:text-[40px] z-[100] justify-center">
                    <div
                      onClick={() => {
                        if (swiper.activeIndex == 0) return;
                        swiper.slidePrev();
                      }}
                    >
                      <IoIosArrowBack />
                    </div>
                    <div
                      onClick={() => {
                        if (swiper.activeIndex + 1 === page) {
                          if(lastPageReached)return
                          setIsLoadingData(true)
                          fetchMoreData()
                        }
                        swiper.slideNext();
                      }}
                    >
                      <IoIosArrowForward />
                    </div>
                  </div>
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
                      <div className="border-2 p-2 rounded-md bg-tertiary">
                        <div className="flex items-center">
                          <p className="font-montserrat font-semibold">{selectedModalContent?.name}</p> {selectedModalContent?.sex === "Male" ? <BsGenderMale /> : <BsGenderFemale />}
                          <p className="font-montserrat text-xs">{selectedModalContent?.sex}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-lg w-full font-montserrat font-medium">Education: </p>
                          <p className="text-lg bg-white px-2 my-1">{selectedModalContent?.education}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-lg w-full font-montserrat font-medium">Skills: </p>
                          <p className="text-lg  bg-white px-2 my-1">{selectedModalContent?.skills}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-lg w-full font-montserrat font-medium">Age: </p>
                          <p className="text-lg  bg-white px-2 my-1">{selectedModalContent?.age}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="flex items-center">
                            <p className="w-full font-montserrat text-sm">{selectedModalContent?.tag[0]}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-full font-montserrat text-sm"> {selectedModalContent?.tag[1]}</p>
                          </div>
                        </div>
                      </div> :
                      <div className="border-2 p-2 rounded-md bg-tertiary">
                        <div className="flex items-center">
                          <Image src={Map} />
                          <p className="mx-1 w-full font-montserrat text-lg">{selectedModalContent?.location}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-montserrat font-medium">notes: </p>
                          <p className="text-lg bg-white px-2">{selectedModalContent?.notes}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className=" font-montserrat font-medium">company: </p>
                          <p className="text-lg  bg-white px-2">{selectedModalContent?.company}</p>
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