"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "./../../../../public/Logo.png";
import JobSeeker from "./JobSeeker";
import JobVacancies from "./JobVacancies";
import Catalog from "./Catalog";
import {BsPersonCircle} from "react-icons/bs";
import {useState} from "react";
import Home from "./Home";

const DASHBOARD_NAVIGATION = [
  {
    title: "Home",
    page: <Home />,
  },
  {
    title: "Job Seeker",
    page: <JobSeeker />,
    reqCount: 2,
  },
  {
    title: "Job Vacancies",
    page: <JobVacancies />,
    reqCount: 1,
  },
  {
    title: "My Catalog",
    page: <Catalog />,
    reqCount: 6,
  },
];

export default function Dasboard() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen flex flex-row">
      <aside className="hidden md:block w-[25%] bg-zinc-200">
        <div className="h-[30%] w-full flex justify-center items-center">
          <Link href="/">
            <Image src={Logo} className="w-28 bg-secondary" />
          </Link>
        </div>
        <div className="flex flex-col justify-between h-[32rem]">
          <div className="px-6 font-montserrat text-lg space-y-4">
            {activeIndex === 0 ? (
              <button className="text-[#B68D40] font-semibold">
                {DASHBOARD_NAVIGATION[0].title}
              </button>
            ) : (
              <Link href={{pathname: "dashboard"}}>
                <button
                  onClick={() => {
                    setActiveIndex(0);
                  }}
                >
                  {DASHBOARD_NAVIGATION[0].title}
                </button>
              </Link>
            )}
            <div className="space-y-2">
              <h1 className="font-bold">Lowongan Kerja</h1>
              <div className="flex flex-col pl-4 items-start">
                {activeIndex === 1 ? (
                  <button className="text-[#B68D40] font-semibold">
                    {DASHBOARD_NAVIGATION[1].title} (
                    {DASHBOARD_NAVIGATION[1].reqCount})
                  </button>
                ) : (
                  <Link
                    href={{
                      pathname: "dashboard",
                      query: {page: DASHBOARD_NAVIGATION[1].title},
                    }}
                  >
                    <button
                      onClick={() => {
                        setActiveIndex(1);
                      }}
                    >
                      {DASHBOARD_NAVIGATION[1].title} (
                      {DASHBOARD_NAVIGATION[1].reqCount})
                    </button>
                  </Link>
                )}
                {activeIndex === 2 ? (
                  <button className="text-[#B68D40] font-semibold">
                    {DASHBOARD_NAVIGATION[2].title} (
                    {DASHBOARD_NAVIGATION[2].reqCount})
                  </button>
                ) : (
                  <Link
                    href={{
                      pathname: "dashboard",
                      query: {page: DASHBOARD_NAVIGATION[2].title},
                    }}
                  >
                    <button
                      onClick={() => {
                        setActiveIndex(2);
                      }}
                    >
                      {DASHBOARD_NAVIGATION[2].title} (
                      {DASHBOARD_NAVIGATION[2].reqCount})
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-bold">Katalog Online</h1>
              {activeIndex === 3 ? (
                <button className="pl-4 text-[#B68D40] font-semibold">
                  {DASHBOARD_NAVIGATION[3].title} (
                  {DASHBOARD_NAVIGATION[3].reqCount})
                </button>
              ) : (
                <Link
                  href={{
                    pathname: "dashboard",
                    query: {page: DASHBOARD_NAVIGATION[3].title},
                  }}
                >
                  <button
                    className="pl-4"
                    onClick={() => {
                      setActiveIndex(3);
                    }}
                  >
                    {DASHBOARD_NAVIGATION[3].title} (
                    {DASHBOARD_NAVIGATION[3].reqCount})
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="px-6 space-y-8">
            <Link href={"/admin"}>
              <button className="font-montserrat text-2xl px-5 py-2.5 hover:bg-zinc-800 transition-colors duration-200 hover:text-slate-200 rounded-md">
                Sign Out
              </button>
            </Link>
            <div className="border-b border-zinc-400"></div>
            <div className="font-montserrat text-sm text-zinc-400">
              <p>Telp : (021) 7503247</p>
              <p>e-Mail : emailGKIPI@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="w-full md:w-[75%] py-4 px-2 md:px-8 flex flex-col">
        <div className="flex justify-end">
          <button className="flex gap-2 items-center font-montserrat italic text-zinc-800">
            <BsPersonCircle />
            <p>GKI Pondok Indah (Admin)</p>
          </button>
        </div>
        <div>{DASHBOARD_NAVIGATION[activeIndex].page}</div>
      </main>
    </div>
  );
}
