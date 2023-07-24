import Image from "next/image"

import Katalog from "../../../public/Katalog.png"
import BankSampah from "../../../public/Bank_Sampah.png"
import LowonganPekerjaan from "../../../public/Lowongan_Pekerjaan.png"


export default function Menu() {
    return (
        <section className="flex justify-center">
            <div className="w-[28%] my-10 mx-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center text-xl">Bank Sampah</div>
                </div>
                <Image
                    className="w-[100%]"
                    src={BankSampah}
                    width={1600}
                />
            </div>

            <div className="w-[28%] my-10 mx-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center text-xl">Katalog Online</div>
                </div>
                <Image
                    className="w-[100%]"
                    src={Katalog}
                    width={1600}
                />
            </div>
            <div className="w-[28%] my-10 mx-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center text-xl">Lowongan Pekerjaan</div>
                </div>
                <Image
                    className="w-[100%]"
                    src={LowonganPekerjaan}
                    width={1600}
                />
            </div>

        </section>
    )
}