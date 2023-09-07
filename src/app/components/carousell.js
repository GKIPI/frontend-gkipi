"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import ImageBg from "../../../public/Activity.png"
import Image from "next/image"

export default function Carousell() {
  return (
    <div className='w-[80vw] h-[20vh]'>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Card /></SwiperSlide>
        <SwiperSlide><Card /></SwiperSlide>
        <SwiperSlide><Card /></SwiperSlide>
      </Swiper>
    </div>
  )
}
export function Card() {
  return (
    <div className='bg-red-600 h-[20vh] flex items-center'>
      <Image src={ImageBg}/>
      <div className='absolute text-white font-poppins p-3 self-end my-2 bg-gradient-to-r from-black/25'>Title jsndajdlk ksldalkdsa</div>
    </div>
  )
}