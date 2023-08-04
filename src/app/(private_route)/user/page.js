import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"



export default function Login() {

    return (
        <div>
            <div className="pt-8 md:pt-10 lg:pt-4 pl-2 md:pl-6 lg:pl-12">
                <Link href={"/"}>
                    <FiArrowLeft className="h-8 md:h-10 w-max" />
                </Link>
            </div>
            <main className="min-h-screen flex flex-col justify-center items-center font-montserrat gap-12 pt-16 pb-36">
                <div className="text-center">
                    <h1 className="font-bold text-[3rem] leading-10 px-4">Welcome to dashboard!</h1>
                </div>
                <div className="flex justify-center font-montserrat w-screen">

                    <Link href={'/user/jobSeeker'} className="w-[20%] my-10 flex mx-4 items-center  relative justify-center bg-primary lg:h-[200px] h-[100px] !p-3 hover:bg-primary/50">
                        <div className="text-white text-center lg:text-2xl">Job Seeker</div>
                    </Link>
                    <Link href={'/user/jobVacancies'} className="w-[20%] my-10 flex md:mx-4 mx-1 items-center  relative justify-center bg-primary lg:h-[200px] h-[100px] !p-3 hover:bg-primary/50">
                        <div className="text-white text-center lg:text-2xl">Job Vacancies</div>
                    </Link>
                    <Link href={'/user/katalog'} className="w-[20%] my-10 flex mx-4 items-center  relative justify-center bg-primary lg:h-[200px] h-[100px] !p-3 hover:bg-primary/50">
                        <div className="text-white text-center lg:text-2xl">Katalog</div>
                    </Link>
                </div>
            </main>
        </div>
    )
}
