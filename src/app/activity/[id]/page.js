"use client"
import ImageBg from "../../../../public/Activity.png"
import Image from "next/image"
import { useEffect, useState } from "react"
import BlurredOnLoad from "@/app/loading"

import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"

export default function activityDetails({ params }) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/admin/activity/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <>
            {isLoading ? <BlurredOnLoad /> :
                <section className="flex flex-col">
                    <div className="absolute h-[40px] w-[40px] rounded-full m-3 hover:bg-primary hover:text-white">
                        <Link href={"/activity"}>
                            <FiArrowLeft className="h-8 md:h-10 w-max" />
                        </Link>
                    </div>
                    <h1 className="m-3 text-3xl font-bold mt-[50px] self-center">{data?.title}</h1>
                    <div className="w-[90vw] self-center max-h-[50vh] items-center flex overflow-hidden justify-center">
                        <img src={data?.image} className="self-center"/>
                    </div>
                    <div className="max-w-[90vw] my-5 self-center">
                        <p className="whitespace-pre-wrap text-justify">{data?.details}</p>
                    </div>
                </section>
            }
        </>
    )
}