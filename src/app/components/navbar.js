"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "./../../../public/Logo.png"

export default function Navbar() {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setActivePage(pathname);
  }, [pathname]);

  return (
    <navbar className="fixed top-0 w-full h-auto flex items-center justify-center px-8 md:px-12 z-[200]">

      <div className="hidden lg:flex justify-end gap-[50px] w-[50%] font-creato font-bold text-[18px]">
      <Link
          href="/"
          className={
            "flex flex-col after:bg-neutral-100 after:h-[2px] after:duration-300 " +
            (activePage == "/" ? "after:w-full" : "after:w-0")
          }
        >
          Home
        </Link>
        <Link
          href="/activity"
          className={
            "flex flex-col after:bg-neutral-100 after:h-[2px] after:duration-300 " +
            (activePage == "/activity" ? "after:w-full" : "after:w-0")
          }
        >
          Activity
        </Link>
      </div>
      <Link href="/" className="flex items-center gap-[10px]">
       <Image 
       src={Logo}
       width={600}
       height={600}
       className="w-[100px]"
       alt="Logo"/>
      </Link>
      <div className="hidden lg:flex gap-[50px] w-[50%] font-creato font-bold text-[18px]">
        
        <Link
          href="/aboutUs"
          className={
            "flex flex-col after:bg-neutral-100 after:h-[2px] after:duration-300 " +
            (activePage == "/aboutUs" ? "after:w-full" : "after:w-0")
          }
        >
          About Us
        </Link>
      </div>

      {/* <div className="relative lg:hidden">
        <div
          className="flex lg:hidden flex-col items-center justify-evenly aspect-square cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={
              "w-[25px] duration-300 h-[3px] bg-neutral-100 " +
              (isMenuOpen ? "!w-0" : "w-full")
            }
          ></div>
          <div
            className={
              "w-[25px] duration-300 h-[3px] bg-neutral-100 " +
              (isMenuOpen ? "rotate-45" : "")
            }
          ></div>
          <div
            className={
              "w-[25px] duration-300 h-[3px] bg-neutral-100 absolute " +
              (isMenuOpen ? "-rotate-45" : "")
            }
          ></div>
          <div
            className={
              "w-[25px] duration-300 h-[3px] bg-neutral-100 " +
              (isMenuOpen ? "!w-0" : "w-full")
            }
          ></div>
        </div>

        <div
          className={
            "absolute lg:hidden flex flex-col items-center gap-3 duration-300 font-bold top-[calc(100%+40px)] right-0 bg-green-400/90 outline outline-neutral-100 outline-1 px-8 py-5 rounded-[9px]" +
            (isMenuOpen ? " translate-x-0" : " translate-x-[200%]")
          }
        >
          <Link
            href="/"
            className={
              "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] after:duration-300 " +
              (activePage == "/" ? "after:w-full" : "after:w-0")
            }
          >
            Beranda
          </Link>
          <Link
            href="/dokumentasi"
            className={
              "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] after:duration-300 " +
              (activePage == "/dokumentasi" ? "after:w-full" : "after:w-0")
            }
          >
            Dokumentasi
          </Link>
          <Link
            href="/agenda"
            className={
              "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] duration-200 " +
              (activePage == "/agenda" ? "after:w-full" : "after:w-0")
            }
          >
            Agenda
          </Link>
          <Link
            href="/materi"
            className={
              "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] duration-200 " +
              (activePage == "/materi" ? "after:w-full" : "after:w-0")
            }
          >
            Materi
          </Link>
          <Link
            href="/faq"
            className={
              "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] duration-200 " +
              (activePage == "/faq" ? "after:w-full" : "after:w-0")
            }
          >
            FAQ
          </Link>
        </div>
      </div> */}
    </navbar>
  );
}