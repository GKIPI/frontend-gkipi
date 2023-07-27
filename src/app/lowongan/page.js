"use client";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useState } from "react";

export default function Lowongan(){
  const [activePage, setActivePage] = useState(true);
  const onSelect=(value)=>{
    setActivePage(!activePage)
  }

  return(
    <section className="max-h-screen w-screen overflow-x-hidden overflow-y-hidden text-[24px]">
      <Navbar/>
      <div className="w-full flex justify-center items-center">
        <div onClick={onSelect} className={"font-montserrat font-[900] m-7 cursor-pointer	hover:bg-primary hover:text-white p-2 " + (activePage ? "text-black" : "text-black/50")}
        >
          Job Seeker</div>
          <div onClick={onSelect} className={"font-montserrat font-[900] m-7 cursor-pointer	hover:bg-primary hover:text-white p-2 " + (activePage ? "text-black/50" : "text-black")}
        >
          Job Vacancies</div>
      </div>
      <div className="h-full">

      <Sidebar/>
      </div>
    </section>
    )
}