import Link from "next/link";


export default function Menu() {
    return (
        <section className="flex justify-center font-montserrat">

            <Link href={'/katalog'} className="w-[28%] my-10 flex mx-4 items-center  relative justify-center bg-primary h-[200px]">
                <div className="text-white text-center text-2xl">Katalog Online</div>
            </Link>
            <Link href={'/lowongan'} className="w-[28%] my-10 flex mx-4 items-center  relative justify-center bg-primary h-[200px]">
                <div className="text-white text-center text-2xl">Lowongan Pekerjaan</div>
            </Link>

        </section>
    )
}