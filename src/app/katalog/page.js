"use client"
import Navbar from "../components/navbar"
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs"
import category from "./category"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import products from "./product"

export default function Katalog(){
  const [dropIsClicked, setDropIsClicked] = useState(false)

  const Category = () => {
    return (
      <div className="absolute min-w-[15em]">
        <button
        onClick={() => setDropIsClicked(!dropIsClicked)}
        className={"relative w-full px-4 py-2 flex flex-row items-center text-neutral-400 justify-between border border-neutral-400 " + (
          dropIsClicked ? "border-b-0" : ""
        )}>
          Category
          {
            dropIsClicked ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
          }
          
        </button>
        <div className={"relative bg-white flex flex-col items-start border text-neutral-400 border-neutral-400 " +
        (
          dropIsClicked ? "block" : "hidden"
        )}>
          {
            category.map((item, i) => {
              return (
                <Link
                onClick={() => console.log(item.link)}
                href={{pathname:"/katalog", query: (item.link !== "" ? { category: item.link} : "")}}
                className="w-full"
                key={i}>
                  <div className="hover:bg-neutral-300/50 px-4 py-2">
                  {item.title}
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  }

  const Card = ({img, title, price, src}) => {
    return(
      <div className="flex flex-col items-center">
        <div className="border max-w-[80em] flex flex-col items-center p-2">
          <div className="max-h-[20rem] aspect-square overflow-hidden bg-white flex flex-col justify-center">
            <Image alt="" src={img} width={1000} height={1000} className="w-full"/>
          </div>
          <h1 className="w-3/4 text-center leading-7 font-montserrat font-bold text-3xl">{title}</h1>
          <h1>{price}</h1>
          <button className="cursor:pointer w-full py-3 bg-zinc-700 text-slate-200 text-xl hover:bg-zinc-900" onClick={()=>alert(src)}>Order</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center pt-36 pb-48">
        <div className="w-4/5 space-y-16">
          <div className="flex justify-end">
            <Category />
          </div>
          <div className="bg-red-200 min-h-min grid grid-cols-2 md:grid-cols-3 gap-y-10">
            {
              products.map((item, i) => {
                return(
                  <Card
                  img={item.img}
                  title={item.title}
                  price={item.price}
                  src={item.src}
                  key={i}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}