import Link from "next/link";


export default function Menu() {
    return (
        <section className="flex justify-center font-montserrat">

            <Link href={'/katalog'} className="w-[28%] my-10 flex mx-4 items-center  relative justify-center bg-primary lg:h-[200px] h-[100px] p-3 hover:bg-primary/50">
                <div className="text-white text-center lg:text-2xl">Online Catalogue </div>
            </Link>
            <Link href={'/lowongan'} className="w-[28%] my-10 flex mx-4 items-center  relative justify-center bg-primary lg:h-[200px] h-[100px] p-3 hover:bg-primary/50">
                <div className="text-white text-center lg:text-2xl">Job vacancy</div>
            </Link>

        </section>
    )
}