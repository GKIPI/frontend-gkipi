import Herobg from "../../../public/Hero.png";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="max-w-screen flex justify-center">
            <div className="image-container">
                <Image
                    className="h-[100vh] object-cover "
                    src={Herobg}
                    alt="Hero"
                />
            </div>

            <div className="text-white absolute flex flex-col justify-center items-center w-full h-[100vh]">
                <div className="text-3xl font-bold p-5 flex justify-center items-center">Komunitas Profesi Graha Persahabatan</div>
                <div className="p-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <Link
                    href="/"
                    className={
                        "text-[30px] bg-white text-black py-1 px-5 m-5 font-montserrat"
                    }
                >
                    See More
                </Link>
            </div>
        </section>
    );
}
