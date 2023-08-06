"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "./../../../public/Logo.png";
import { signOut, useSession } from "next-auth/react";
import { VscAccount } from "react-icons/vsc"

export default function Navbar() {
  const { data, status } = useSession();
  const isAuth = status ==="authenticated"
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setActivePage(pathname);
  }, [pathname]);

  if (isAuth)
    return (
      <div
        className="sticky top-0 w-full h-auto flex items-center px-8 md:px-12 z-[300] text-primary font-montserrat font-thin shadow-black justify-between max-w-screen bg-tertiary"    >
        <Link href="/" className=" flex lg:items-center gap-[10px] bg-secondary m-3 items-start self-start">
          <Image
            src={Logo}
            width={600}
            height={600}
            className="lg:w-[70px] w-[50px]"
            alt="Logo" />
        </Link>
        <div className="absolute hidden lg:flex justify-around gap-[90px] w-screen text-[24px] mx-[20px] lg:justify-center ">
          <Link
            href="/"
            className={
              "flex flex-col after:bg-primary after:h-[2px] after:duration-300 px-3 py-2 " +
              (activePage == "/" ? "after:w-full" : "after:w-0 hover:bg-primary hover:text-white")
            }
          >
            Home
          </Link>
          <Link
            href="/activity"
            className={
              "flex flex-col after:bg-primary after:h-[2px] after:duration-300 px-3 py-2  " +
              (activePage == "/activity" ? "after:w-full" : "after:w-0 hover:bg-primary hover:text-white")
            }
          >
            Activity
          </Link>
          <Link
            href="/aboutUs"
            className={
              "flex flex-col after:bg-primary after:h-[2px] after:duration-300 px-3 py-2  " +
              (activePage == "/aboutUs" ? "after:w-full" : "after:w-0 hover:bg-primary hover:text-white")
            }
          >
            About Us
          </Link>
        </div>
        <div className="hidden absolute lg:flex gap-[50px] right-0 text-[24px] mx-[20px] items-center">
          <Link href="/user">
          <VscAccount
            size={50} 
            title="view PDF"
            className="mx-0 hover:bg-primary hover:text-white p-2 rounded-full"
            alt={`${data?.user?.name}`}
            />
          </Link>
            
          <Link
            href="/"
            className={
              "flex flex-col after:h-[2px] after:duration-300 border-2 border-primary px-4 py-2 hover:text-white hover:bg-primary"}
            onClick={() => signOut()}
          >
            Sign Out
          </Link>
        </div>
        <div className="relative lg:hidden">
          <div
            className="flex lg:hidden flex-col items-center justify-evenly aspect-square cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={
                "w-[25px] duration-300 min-h-[3px] bg-secondary " +
                (isMenuOpen ? "!w-0" : "w-full")
              }
            ></div>
            <div
              className={
                "w-[25px] duration-300 h-[3px] bg-secondary " +
                (isMenuOpen ? "rotate-45" : "")
              }
            ></div>
            <div
              className={
                "w-[25px] duration-300 h-[3px] bg-secondary absolute " +
                (isMenuOpen ? "-rotate-45" : "")
              }
            ></div>
            <div
              className={
                "w-[25px] duration-300 h-[3px] bg-secondary " +
                (isMenuOpen ? "!w-0" : "w-full")
              }
            ></div>
          </div>

          <div
            className={
              "absolute lg:hidden flex flex-col items-center gap-3 duration-300 font-bold top-[calc(100%+40px)] right-0 bg-primary/90 text-tertiary outline outline-neutral-100 outline-1 px-8 py-5 rounded-[9px] z-[1000]" +
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
              Home
            </Link>
            <Link
              href="/activity"
              className={
                "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] after:duration-300 " +
                (activePage == "/dokumentasi" ? "after:w-full" : "after:w-0")
              }
            >
              Activity
            </Link>
            <Link
              href="/aboutUs"
              className={
                "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] duration-200 w-max " +
                (activePage == "/agenda" ? "after:w-full" : "after:w-0")
              }
            >
              About Us
            </Link>
            <Link
              href="/user"
              className={
                "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] duration-200 w-max " +
                (activePage == "/agenda" ? "after:w-full" : "after:w-0")
              }
            >Dashboard
            </Link>
            <Link
              href="/"
              className={
                "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] duration-200 w-max " +
                (activePage == "/agenda" ? "after:w-full" : "after:w-0")
              }
              onClick={() => signOut()}
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    )

  return (
    <div
      className="sticky top-0 w-full h-auto flex items-center px-8 md:px-12 z-[300] text-primary font-montserrat font-thin shadow-black justify-between max-w-screen bg-tertiary"    >
      <Link href="/" className=" flex lg:items-center gap-[10px] bg-secondary m-3 items-start self-start">
        <Image
          src={Logo}
          width={600}
          height={600}
          className="lg:w-[70px] w-[50px]"
          alt="Logo" />
      </Link>
      <div className="absolute hidden lg:flex justify-around gap-[90px] w-screen text-[24px] mx-[20px] lg:justify-center ">
        <Link
          href="/"
          className={
            "flex flex-col after:bg-primary after:h-[2px] after:duration-300 px-3 py-2 " +
            (activePage == "/" ? "after:w-full" : "after:w-0 hover:bg-primary hover:text-white")
          }
        >
          Home
        </Link>
        <Link
          href="/activity"
          className={
            "flex flex-col after:bg-primary after:h-[2px] after:duration-300 px-3 py-2  " +
            (activePage == "/activity" ? "after:w-full" : "after:w-0 hover:bg-primary hover:text-white")
          }
        >
          Activity
        </Link>
        <Link
          href="/aboutUs"
          className={
            "flex flex-col after:bg-primary after:h-[2px] after:duration-300 px-3 py-2  " +
            (activePage == "/aboutUs" ? "after:w-full" : "after:w-0 hover:bg-primary hover:text-white")
          }
        >
          About Us
        </Link>
      </div>
      <div className="hidden absolute lg:flex gap-[50px] right-0 text-[24px] mx-[20px] hover:bg-primary">
        <Link
          href="/login"
          className={
            "flex flex-col after:h-[2px] after:duration-300 border-2 border-primary px-4 py-2 hover:text-white"}
        >
          Sign In
        </Link>
      </div>
      <div className="relative lg:hidden">
        <div
          className="flex lg:hidden flex-col items-center justify-evenly aspect-square cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={
              "w-[25px] duration-300 min-h-[3px] bg-secondary " +
              (isMenuOpen ? "!w-0" : "w-full")
            }
          ></div>
          <div
            className={
              "w-[25px] duration-300 h-[3px] bg-secondary " +
              (isMenuOpen ? "rotate-45" : "")
            }
          ></div>
          <div
            className={
              "w-[25px] duration-300 h-[3px] bg-secondary absolute " +
              (isMenuOpen ? "-rotate-45" : "")
            }
          ></div>
          <div
            className={
              "w-[25px] duration-300 h-[3px] bg-secondary " +
              (isMenuOpen ? "!w-0" : "w-full")
            }
          ></div>
        </div>

        <div
          className={
            "absolute lg:hidden flex flex-col items-center gap-3 duration-300 font-bold top-[calc(100%+40px)] right-0 bg-primary/90 text-tertiary outline outline-neutral-100 outline-1 px-8 py-5 rounded-[9px] z-[1000]" +
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
            Home
          </Link>
          <Link
            href="/activity"
            className={
              "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] after:duration-300 " +
              (activePage == "/dokumentasi" ? "after:w-full" : "after:w-0")
            }
          >
            Activity
          </Link>
          <Link
            href="/aboutUs"
            className={
              "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] duration-200 w-max " +
              (activePage == "/agenda" ? "after:w-full" : "after:w-0")
            }
          >
            About Us
          </Link>
          <Link
            href="/login"
            className={
              "flex flex-col after:bg-neutral-100 justify-center items-center after:h-[2px] duration-200 w-max " +
              (activePage == "/agenda" ? "after:w-full" : "after:w-0")
            }
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
