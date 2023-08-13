"use client";
import { toRupiah } from "../../../../helper/priceFormatter";
import Link from "next/link";
import { parseBlobToURL } from "../../../../helper/imageDownloader";

const KatalogDetailsModal = ({ isOpen, onClose, catalog }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
            <div className="bg-slate-50 w-[90%] md:w-3/5 min-h-[35rem] max-h-[35rem] overflow-auto shadow-lg space-y-28 rounded-lg px-5 py-16 font-montserrat">
                <div className="w-full flex flex-col md:flex-row gap-6">
                    <div className="w-4/5 md:w-3/5">
                        <Link
                            href={parseBlobToURL(catalog.image)}
                            target="_blank">
                            <img src={catalog.image}></img>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center">
                            <p className="w-full font-poppins text-2xl md:text-4xl font-semibold">{catalog.title}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-full font-poppins">Kategori: <span className="text-green-500 italic">{catalog.tag}</span></p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-full font-montserrat font-semibold">{toRupiah(catalog.price)}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-full font-montserrat font-medium">{catalog.details}</p>
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
                    <Link href={"https://www.instagram.com/komunitas_profesi"} target="_blank">
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
