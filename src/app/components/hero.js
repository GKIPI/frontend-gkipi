import Link from "next/link";

export default function Hero() {
    return (
        <section className="max-w-screen flex justify-center min-w-[50vw] h-[60vh]">
            <div className="text-pimary flex flex-col justify-center items-center w-[80%] mt-[10%]">
                <div className="text-3xl font-bold p-5 flex justify-center items-center">Komunitas Profesi Graha Persahabatan</div>
                <div className="p-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <Link
                    href="/"
                    className={
                        "lg:text-[30px] text-[20px] text-primary py-1 px-5 m-5 font-montserrat hover:bg-tertiary"
                    }
                >
                    See More
                </Link>
            </div>
        </section>
    );
}
