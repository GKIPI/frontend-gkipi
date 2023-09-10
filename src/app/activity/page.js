"use client"
import Carousell from "../components/carousell";
import Navbar from '../components/navbar_hero'
import { useEffect, useState } from "react";


import Link from "next/link";

function generateCardData(numCards) {
    const cardData = [];
    for (let i = 1; i <= numCards; i++) {
        cardData.push({
            title: `Card ${i}`,
            description: `Lorem ipsumdsja ajasndjas asjndlasdnlas for Card ${i}`,
        });
    }
    return cardData;
}

export default function Activity() {

    const [data, setData]=useState([])
    useEffect(()=>{
        fetch('/api/admin/activity')
          .then((response) => response.json())
          .then((data) => {
            setData(data.activities); 
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
    const cardData = generateCardData(10);

    return (
        <section className="flex items-center flex-col overflow-hidden">
            <Navbar />
            <div className="mt-[90px] md:mt-[100px]">
                <Carousell />
            </div>
            <div className="w-[90vw] mt-3">
                <h1 className="text-3xl font-bold my-[10px]">Our Activities:</h1>
                {data.map((item, index) => (
                    <Card key={index} row={item} />
                ))}
            </div>
        </section>
    )
}
export function Card({ row }) {
    return (
        <div className="hover:bg-tertiary">
        <Link href={`/activity/${row._id}`}>
            <div className="flex flex-row p-3">
                <div className="w-[100px] h-[50px] overflow-hidden">
                    <img src={row.image} alt={row.title} />
                </div>
                <div className="px-3">
                    <h2 className="font-bold">{row.title}</h2>
                    <p className="line-clamp-3">{row.details}</p>
                </div>
            </div>
            <hr />
        </Link>
        </div>
    )
}