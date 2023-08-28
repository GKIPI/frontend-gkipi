import _404 from "../../../../public/assets/404.svg";
import Image from "next/image";

export default function AboutUs() {
    return (
        <section className="min-h-screen w-full flex flex-col gap-10 items-center justify-center my-4">
            <div className="flex flex-col justify-center gap-8 max-w-[60rem] max-w-[85vw]">
                <h1 className="text-center md:text-6xl text-4xl font-semibold font-lexend">About</h1>
                <p className="text-center font-poppins font-medium md:text-2xl text-xl max-w-2xl leading-8">
                    Komunitas Profesi merupakan salah satu komunitas yang ada di Badan
                    Pelayanan Jemaat Komisi Minat GKI Pondok Indah.
                </p>
                <p className="text-center font-poppins font-medium md:text-2xl text-xl max-w-2xl">3 Komunitas yang ada di Komisi Minat GKI Pondok Indah</p>
            </div>
            {/* card */}
            <div className="grid md:grid-cols-3 grid-cols-1 gap-10 md:max-w-[60rem] max-w-[70vw]">
                <div className="max-w-[17rem] flex flex-col gap-8 p-4 shadow-lg min-h-[20rem]">
                    <h1 className="text-center font-playfairDisplay italic text-xl font-bold text-[#B68D40] ">Komunitas Profesi</h1>
                    <p className="text-center font-poppins">Program Komunitas Profesi di antaranya pemberdayaan ekonomi, pelatihan keterampilan dunia profesi, dan wirausaha.</p>
                </div>
                <div className="max-w-[17rem] flex flex-col gap-8 p-4 shadow-lg min-h-[20rem]">
                    <h1 className="text-center font-playfairDisplay italic text-xl font-bold text-[#B68D40] ">Komunitas Kebangsaan</h1>
                    <p className="text-center font-poppins">Program Komunitas Kebangsaan diantaranya merawat semangat kebangsaan dengan menciptakan ruang lintas iman, mengedukasi & melatih kemahiran masyarakat dan gerakan transformasi sosial melalui komunitas. </p>
                </div>
                <div className="max-w-[17rem] flex flex-col gap-8 p-4 shadow-lg min-h-[20rem]">
                    <h1 className="text-center font-playfairDisplay italic text-xl font-bold text-[#B68D40] ">Komunitas Olahraga</h1>
                    <p className=" font-poppins text-center">Program komunitas olahraga tidak hanya mengutamakan kegiatan olahraga-nya saja namun juga membangun persekutuan dengan mengangkat nilai² persahabatan dalam keberagaman.</p>
                </div>
            </div>
        </section>
    );
}
