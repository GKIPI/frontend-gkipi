import Logo from "./../../../public/Logo.png"
import { FaTwitter, FaInstagram } from "react-icons/fa";


import Image from "next/image"
import Link from "next/link";

export default function Footer() {
    return (
        <section className="bg-tertiary max-w-[100vw] p-1">
            <div className="md:max-w-[50%] flex flex-row md:m-[50px] m-2 font-medium">
                <div className="flex justify-center flex-col md:items-center md:max-w-[70%] w-[100%] md:text-[15px] text-[10px]">
                    <Image
                        src={Logo}
                        width={600}
                        height={600}
                        className="md:w-[90px] w-[40px] bg-primary m-3"
                        alt="Logo" />
                    <div>
                        Jalan Sekolah Kencana IV
                        No. TN-7, RT.4/RW.15, Pondok Pinang, Kebayoran Lama, South Jakarta City, Jakarta 12310
                    </div>
                    <div className="w-full">
                        Telp     : (021) 7503247
                    </div>
                    <div className="w-full">
                        e-Mail : emailGKIPI@gmail.com
                    </div>
                </div>
                <div className="md:m-5 m-2 w-fit min-w-max font-semibold flex flex-col md:text-[20px] text-[15px] items-center justify-center">
                    <div>Follow Us</div>
                    <div className="flex flex-row">
                        <Link
                            href="/"
                        >
                            <FaInstagram className="m-auto w-[20px] h-[20px] max-xs:w-[30px] max-xs:h-[15px] mx-3" />
                        </Link>
                        <Link
                            href="/"
                        >
                            <FaTwitter className="m-auto w-[20px] h-[20px] max-xs:w-[30px] max-xs:h-[15px] mx-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}