"use client";
import { useState, useEffect } from "react";
import { toRupiah } from "../../../../helper/priceFormatter";
import Link from "next/link";
import { parseBlobToURL } from "../../../../helper/imageDownloader";

const KatalogDetailsModal = ({ isOpen, onClose, catalogId, arr }) => {
    const [currKatalog, setCurrKatalog] = useState({
        _id: "",
        title: "Loading...",
        image: ["Loading..."],
        price: "Loading...",
        details: "Loading...",
        image: "",
        location: "Loading...",
        notes: "Loading...",
        tag: ["Loading...", "Loading..."],
        approval: true,
    });


    useEffect(() => {
        const _data = arr.filter(item => item._id === catalogId)
        setCurrKatalog(_data[0])
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
            <div className="bg-slate-50 w-3/5 min-h-[35rem] max-h-[35rem] overflow-auto shadow-lg space-y-28 rounded-lg px-5 py-16 font-montserrat">
                <div className="w-full flex gap-6">
                    <div className="w-3/5">
                        <Link href={parseBlobToURL(currKatalog.image)} target="_blank">
                            <img src={currKatalog.image}></img>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center">
                            <p className="w-full font-poppins text-4xl font-semibold">{currKatalog.title}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-full font-poppins">Kategori: <span className="text-green-500 italic">{currKatalog.tag}</span></p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-full font-montserrat font-semibold">{toRupiah(currKatalog.price)}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-full font-montserrat font-medium">{currKatalog.details}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className=" px-5 py-1 text-lg text-zinc-800 hover:bg-slate-200 transition-colors"
                    >
                        Tutup
                    </button>
                    <Link href={"https://www.instagram.com/komunitas_profesi/"} target="_blank">
                        <button
                            className="bg-zinc-800 px-5 py-1 text-lg text-slate-200 hover:bg-transparent hover:text-zinc-800 hover:outline hover:outline-2 hover:outline-zinc-800 transition-colors"
                        >
                            Hubungi
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
module.exports = KatalogDetailsModal
