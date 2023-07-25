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
        <navbar className="fixed top-0 w-full h-auto flex items-center justify-center px-8 md:px-12 z-[300] text-white font-montserrat font-thin">

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