import Herobg from "../../../public/Hero.png";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="max-w-screen flex justify-center">
            <div className="image-container">
                <Image
                    className="w-full h-full object-cover"
                    src={Herobg}
                    layout="fill"
                    alt="Hero"
                />
            </div>

            <div className="text-white absolute flex flex-col justify-center items-center w-full h-full">
                <div className="text-3xl font-bold">Komunitas Profesi Graha Persahabatan</div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <Link
                    href="/"
                    className={
                        "text-[30px] bg-white text-black py-1 px-5 m-5"
                    }
                >
                    See More
                </Link>
            </div>
        </section>
    );
}
