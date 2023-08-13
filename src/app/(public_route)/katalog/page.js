"use client";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import category from "./category";
import { useState, useEffect } from "react";
import { toRupiah } from "../../../../helper/priceFormatter";
import KatalogDetailsModal from "./KatalogDetailsModal"

export default function Katalog() {
  const [dropIsClicked, setDropIsClicked] = useState(false);
  const [currCategory, setCurrCategory] = useState("All");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currCatalogId, setCurrCatalogId] = useState("");
  const [catalogData, setCatalogData] = useState([
    {
      _id: "",
      contact: "",
      details: "",
      image: "",
      price: "Loading",
      tag: [],
      title: "Loading...",
    },
  ]);
  const [currDisplayed, setCurrDisplayed] = useState(catalogData)

  const Category = () => {
    return (
      <div className="absolute min-w-[15em]">
        <button
          onClick={() => {
            setDropIsClicked(!dropIsClicked);
          }}
          className={
            "relative w-full px-4 py-2 flex flex-row items-center text-neutral-400 justify-between border border-neutral-400 " +
            (dropIsClicked ? "border-b-0" : "")
          }
        >
          {currCategory === "All" ? "Category" : currCategory}
          {dropIsClicked ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
        </button>
        <div
          className={
            "relative bg-white flex flex-col items-start border text-neutral-400 border-neutral-400 " +
            (dropIsClicked ? "block" : "hidden")
          }
        >
          {category.map((item, i) => {
            return (
              <button
                onClick={() => {
                  setCurrCategory(item.title);
                  setDropIsClicked(false);
                }}
                className="w-full text-left"
                key={i}
              >
                <div className="hover:bg-neutral-300/50 px-4 py-2">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const Card = ({ img, title, price, _id }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="h-full max-w-min flex flex-col items-center justify-between p-2">
          <div>
            <div className="h-32 sm:h-48 lg:h-56 aspect-square overflow-hidden bg-white flex flex-col justify-center">
              {!img ? <div className="bg-slate-200 animate-pulse w-full h-full"></div> : <img alt={title} src={img} />}
            </div>
            <h1 className="py-2 text-center leading-7 font-montserrat font-bold text-base md:text-3xl">
              {title}
            </h1>
          </div>
          <div className="w-full">
            <h1 className="text-center font-playfairDisplay font-semibold text-2xl italic text-[#B68D40]">
              {toRupiah(price)}
            </h1>
            <button onClick={() => {
              setDetailsOpen(true)
              setCurrCatalogId(_id)
            }} className="cursor:pointer w-full py-1 md:py-3 bg-zinc-700 text-slate-200 text-base md:text-xl hover:bg-zinc-900">
              Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getCatalogData = async () => {
    try {
      const res = await fetch("/api/katalog/");
      const data = await res.json();
      if (data.katalogs) {
        setCurrDisplayed(data.katalogs)
        setCatalogData(data.katalogs)
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (currCategory != "All") {
      const selected = catalogData.filter(data => data.tag[0] === currCategory);
      setCurrDisplayed(selected)
    } else {
      getCatalogData();
    }
  }, [currCategory])

  return (
    <>
      <div className="min-h-screen flex flex-col items-center pt-36 pb-48">
        <div className="w-[95%] md:w-4/5 space-y-16">
          <div className="flex justify-end">
            <Category />
          </div>
          <div className="min-h-min grid grid-cols-2 md:grid-cols-3 gap-y-10">
            {currDisplayed.map((item, i) => {
              return (
                <Card
                  key={i}
                  img={item.image}
                  title={item.title}
                  price={item.price}
                  _id={item._id}
                />
              );
            })}
          </div>
        </div>
      </div>
      <KatalogDetailsModal arr={catalogData} catalogId={currCatalogId} isOpen={detailsOpen} onClose={() => setDetailsOpen(false)} />
    </>
  );
}
