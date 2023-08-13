"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../../public/Logo.png";
import {useState} from "react";

const Aside = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div classname="w-full h-full">
      <div className="h-[30%] w-full flex justify-center items-center bg-zinc-200">
        <Link href="/">
          <Image src={Logo} className="w-28 bg-secondary" />
        </Link>
      </div>
      <div className="flex flex-col justify-between h-[32rem] bg-zinc-200">
        <div className="px-6 font-montserrat text-lg space-y-4">
          {window.location.pathname === "/admin/dashboard" ? (
            <button className="text-[#B68D40] font-semibold">Home</button>
          ) : (
            <Link href="/admin/dashboard">
              <button>Home</button>
            </Link>
          )}
          <div className="space-y-2">
            <h1 className="font-bold">Lowongan Kerja</h1>
            <div className="flex flex-col pl-4 items-start">
              {window.location.pathname === "/admin/dashboard/JobSeeker" ? (
                <button className="text-[#B68D40] font-semibold">
                  Job Seeker
                </button>
              ) : (
                <Link href="/admin/dashboard/JobSeeker">
                  <button>Job Seeker</button>
                </Link>
              )}
              {activeIndex === 2 ? (
                <button className="text-[#B68D40] font-semibold">
                  Job Vacancies
                </button>
              ) : (
                <Link href="/admin/dashboard/JobVacancies">
                  <button
                    onClick={() => {
                      setActiveIndex(2);
                    }}
                  >
                    Job Vacancies
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-bold">Katalog Online</h1>
            <div className="flex justify-start items-center">
              {activeIndex === 3 ? (
                <button className="text-[#B68D40] pl-4 font-semibold">
                  Catalog
                </button>
              ) : (
                <Link href="/admin/dashboard/Catalogs">
                  <button
                    className="pl-4"
                    onClick={() => {
                      setActiveIndex(3);
                    }}
                  >
                    Catalog
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 space-y-8">
          <Link href={"/"}>
            <button className="font-montserrat text-2xl px-5 py-2.5 hover:bg-zinc-800 transition-colors duration-200 hover:text-slate-200 rounded-md">
              Exit Dashboard
            </button>
          </Link>
          <div className="border-b border-zinc-400"></div>
          <div className="font-montserrat text-sm text-zinc-400">
            <p>Telp : (021) 7503247</p>
            <p>e-Mail : emailGKIPI@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = Aside;
