import _404 from "../../../public/assets/404.svg";
import Image from "next/image";

export default function AboutUs() {
    return (
        <section className="min-h-screen w-full flex flex-col gap-10 items-center justify-center">
            <div className="flex flex-col justify-center gap-8 max-w-[60rem]">
                <h1 className="text-center text-4xl font-semibold font-lexend">About</h1>
                <p className="text-center font-poppins font-medium max-w-2xl leading-8">
                    Komunitas Profesi merupakan salah satu komunitas yang ada di Badan
                    Pelayanan Jemaat Komisi Minat GKI Pondok Indah.
                </p>
                <p className="text-center font-poppins font-medium max-w-2xl">3 Komunitas yang ada di Komisi Minat GKI Pondok Indah</p>
            </div>
            {/* card */}
            <div className="grid grid-cols-3 gap-10 max-w-[60rem]">
                <div className="max-w-[15rem] flex flex-col gap-8 p-4 shadow-lg min-h-[20rem]">
                    <h1 className="text-center font-playfairDisplay italic text-xl font-bold text-[#B68D40] ">Komunitas Profesi</h1>
                    <p className="text-justify font-poppins">Program Komunitas Profesi di antaranya pemberdayaan ekonomi, pelatihan keterampilan dunia profesi, dan wirausaha.</p>
                </div>
                <div className="max-w-[15rem] flex flex-col gap-8 p-4 shadow-lg min-h-[20rem]">
                    <h1 className="text-center font-playfairDisplay italic text-xl font-bold text-[#B68D40] ">Komunitas Profesi</h1>
                    <p className="text-justify font-poppins">Program Komunitas Profesi di antaranya pemberdayaan ekonomi, pelatihan keterampilan dunia profesi, dan wirausaha.</p>
                </div>
                <div className="max-w-[15rem] flex flex-col gap-8 p-4 shadow-lg min-h-[20rem]">
                    <h1 className="text-center font-playfairDisplay italic text-xl font-bold text-[#B68D40] ">Komunitas Profesi</h1>
                    <p className="text-justify font-poppins">Program Komunitas Profesi di antaranya pemberdayaan ekonomi, pelatihan keterampilan dunia profesi, dan wirausaha.</p>
                </div>
            </div>
        </section>
    );
}
