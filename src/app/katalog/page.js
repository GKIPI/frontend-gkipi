"use client"
import Navbar from "../components/navbar"
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs"
import category from "./category"
import Link from "next/link"
import { useState } from "react"
import SMH from '../../../public/dummy/gkpi1.jpeg'
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
      <div className="border items-center">
        <div className="h-96 object-fill overflow-hidden">
          <Image src={img} width={1000} height={1} className="w-full"/>
        </div>
        <h1>{title}</h1>
        <h1>{price}</h1>
        <button onClick={()=>alert(src)}>Order</button>
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
          <div className="bg-red-200 min-h-min grid grid-cols-2 md:grid-cols-3 gap-6">
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