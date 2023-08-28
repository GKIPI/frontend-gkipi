import Link from "next/link";

export default function Hero() {
    return (
        <section className="max-w-screen flex justify-center min-w-[50vw] h-[60vh]">
            <div className="text-pimary flex flex-col justify-center items-center w-[80%] mt-[10%]">
                <div className="flex flex-col w-full md:w-1/2 p-5 gap-4">
                    <div className="font-lexend text-2xl leading-[3.5rem] md:text-[40px] font-bold text-center">Komunitas Profesi Graha Persahabatan</div>
                    <div className="font-poppins text-center text-xs">
                    </div>
                </div>
                {/* <Link
                    href="/"
                    className={
                        "lg:text-[30px] text-[20px] text-primary py-1 px-5 m-5 font-montserrat hover:bg-tertiary"
                    }
                >
                    See More
                </Link> */}
            </div>
        </section>
    );
}
