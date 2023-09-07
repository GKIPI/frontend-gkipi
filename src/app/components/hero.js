import Link from "next/link";
import Carousell from "./carousell";

export default function Hero() {
    return (
        <section className="max-w-screen flex justify-center min-w-[50vw] min-h-[60vh]">
            <div className="text-pimary flex flex-col justify-center items-center w-[80%] mt-[10%]">
                <div className="flex flex-col w-full md:w-1/2 p-5 gap-4">
                    <div className="font-lexend text-2xl leading-[3.5rem] md:text-[40px] font-bold text-center">Komunitas Profesi Graha Persahabatan</div>
                    <div className="font-poppins text-center text-xs italic">
                        "Bukan satu kesempatan yang khusus yang akan menjadikan Anda hebat dan sukses, tapi kesungguhan Anda untuk menjadi diri Anda yang terbaik dalam kesempatan apa pun".
                    </div>
                </div>
                <Carousell/>
            </div>
        </section>
    );
}
