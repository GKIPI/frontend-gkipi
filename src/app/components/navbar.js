"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "./../../../public/Logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    setIsMenuOpen(false);
    setActivePage(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Calculate the opacity value based on the scroll position (between 0 and 100)
      const opacity = Math.min(scrollY / 100, 1);
      setScrollOpacity(opacity);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <navbar
      className={`fixed top-0 w-full h-auto flex items-center justify-center px-8 md:px-12 z-[300] text-white font-montserrat font-thin`}
      style={{ backgroundColor: `rgba(29,36,43, ${scrollOpacity})` }}
    >
      <div className="hidden lg:flex justify-end gap-[50px] w-[50%] text-[24px] mx-[20px]">
        <Link
          href="/"
          className={
            "flex flex-col after:bg-white after:h-[2px] after:duration-300 " +
            (activePage == "/" ? "after:w-full" : "after:w-0")
          }
        >
          Home
        </Link>
        <Link
          href="/activity"
          className={
            "flex flex-col after:bg-white after:h-[2px] after:duration-300 " +
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
                    alt="Logo" />
      </Link>
      <div className="hidden lg:flex gap-[50px] w-[50%] text-[24px] mx-[20px]">
        <Link
          href="/aboutUs"
          className={
            "flex flex-col after:bg-white after:h-[2px] after:duration-300 " +
            (activePage == "/aboutUs" ? "after:w-full" : "after:w-0")
          }
        >
          About Us
        </Link>
      </div>
    </navbar>
  );
}
