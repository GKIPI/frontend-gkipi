"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../../public/Logo.png";
import {useEffect, useState} from "react";

const Aside = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [requestsCount, setRequestsCount] = useState({
    seeker: 0,
    vacancies: 0,
    catalog: 0,
  });

  const getCount = async () => {
    const res = await fetch("/api/admin/requests");
    const data = await res.json();
    setRequestsCount({
      seeker: data.len[0],
      vacancies: data.len[1],
      catalog: data.len[2],
    });
  };

  useEffect(() => {
    const page = window.location.pathname;
    if (page === "/admin/dashboard") {
      setActiveIndex(0);
    } else if (page === "/admin/dashboard/JobSeeker") {
      setActiveIndex(1);
    } else if (page === "/admin/dashboard/JobVacancies") {
      setActiveIndex(2);
    } else if (page === "/admin/dashboard/Catalogs") {
      setActiveIndex(3);
    } else if (page === "/admin/dashboard/News") {
      setActiveIndex(4);
    }
  }, []);

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="min-h-screen w-1/4 bg-zinc-200">
      <div className="h-[30%] w-full flex justify-center items-center">
        <Link href="/">
          <Image src={Logo} alt="Logo" priority className="w-28 bg-secondary" />
        </Link>
      </div>
      <div className="flex flex-col justify-between h-[32rem]">
        <div className="px-6 font-montserrat text-lg space-y-4">
          <div>
            {activeIndex === 0 ? (
              <button className="text-[#B68D40] font-semibold">Home</button>
            ) : (
              <Link href="/admin/dashboard">
                <button
                  onClick={() => {
                    setActiveIndex(0);
                  }}
                >
                  Home
                </button>
              </Link>
            )}
          </div>
          <div>
            {activeIndex === 4 ? (
              <button className="text-[#B68D40] font-semibold">News</button>
            ) : (
              <Link href="/admin/dashboard/News">
                <button
                  onClick={() => {
                    setActiveIndex(4);
                  }}
                >
                  News
                </button>
              </Link>
            )}
          </div>
          <div className="space-y-2">
            <h1 className="font-bold">Job Opportunities</h1>
            <div className="flex flex-col pl-4 items-start">
              {activeIndex === 1 ? (
                <button className="text-[#B68D40] font-semibold">
                  Job Seeker ({requestsCount.seeker})
                </button>
              ) : (
                <Link href="/admin/dashboard/JobSeeker">
                  <button
                    onClick={() => {
                      setActiveIndex(1);
                    }}
                  >
                    Job Seeker ({requestsCount.seeker})
                  </button>
                </Link>
              )}
              {activeIndex === 2 ? (
                <button className="text-[#B68D40] font-semibold">
                  Job Vacancies ({requestsCount.vacancies})
                </button>
              ) : (
                <Link href="/admin/dashboard/JobVacancies">
                  <button
                    onClick={() => {
                      setActiveIndex(2);
                    }}
                  >
                    Job Vacancies ({requestsCount.vacancies})
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-bold">Online Catalog</h1>
            <div className="flex justify-start items-center">
              {activeIndex === 3 ? (
                <button className="text-[#B68D40] pl-4 font-semibold">
                  Catalog ({requestsCount.catalog})
                </button>
              ) : (
                <Link href="/admin/dashboard/Catalogs">
                  <button
                    className="pl-4"
                    onClick={() => {
                      setActiveIndex(3);
                    }}
                  >
                    Catalog ({requestsCount.catalog})
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
            {/* <p>Telp : (021) 7503247</p> */}
            <p>e-Mail : admin@komunitasprofesigkipi.org</p>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = Aside;
