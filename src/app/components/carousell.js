"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function Carousell() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('/api/admin/activity/swiper')
      .then((response) => response.json())
      .then((data) => {
        setData(data.activities);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div className='w-[80vw] h-[20vh]'>
      {isLoading ?
        <div className='bg-tertiary h-[20vh] flex items-center'>
          <div className="z-[900] flex justify-center items-center w-full">
            <div className="spinner"></div>
          </div>
        </div>
        : data.length === 0 ? ( // Check if there is no data
        <div className='bg-tertiary h-[20vh] flex items-center justify-center text-white'>
          No news posted yet.
        </div>
      ) : (
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Card data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
export function Card(row) {
  return (
    <Link href={`/activity/${row?.data?._id}`}>
      <div className='bg-red-600 h-[20vh] flex items-center'>
        <img src={row.data.image} className='w-full' />
        <div className='absolute text-white font-poppins p-3 self-end my-2 bg-gradient-to-r from-black/25'>{row.data.title}</div>
      </div>
    </Link>
  )
}