import _404 from "../../../public/assets/404.svg"
import Image from "next/image"

export default function AboutUs() {
    return (
        <section className="min-h-screen w-full flex flex-col items-center">
            <div className="w-3/4 flex flex-col items-center">
                <Image src={_404} />
                <div className="font-montserrat text-3xl text-center font-semibold">Kami sedang bekerja untuk fitur ini. Nantikan update selanjutnya ya!</div>
            </div>
        </section>
    )
}