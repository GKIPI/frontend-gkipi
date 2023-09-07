
import ImageBg from "../../../../public/Activity.png"
import Image from "next/image"

import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"

export default function activityDetails() {
    return (
        <section className="flex flex-col">
            <div className="absolute h-[40px] w-[40px] rounded-full m-3 hover:bg-primary hover:text-white">
                <Link href={"/activity"}>
                    <FiArrowLeft className="h-8 md:h-10 w-max" /> 
                </Link>
            </div>
                <h1 className="m-3 text-3xl font-bold mt-[50px] self-center">This Is the most outstanding Title</h1>
            <div className="w-[90vw] self-center max-h-[50vh] items-center flex overflow-hidden">
                <Image src={ImageBg} />
            </div>
            <div className="max-w-[90vw] my-5 self-center">
                <p className="whitespace-pre-wrap text-justify">             hjdnaklsndlkasndklanskldnas daslknjdklasnkdlas dklasndklasnlkdnasl dklasndlkasndklanskld asd asklndklasndklas dklasndklasnkldnaskldnaklsd asndklasndklanslkdnasdasndlkasdas dasdklansdklasndkla salkndklasndklas daskldnklasndklas dasklndklasndklasn</p>
            </div>
        </section>
    )
}