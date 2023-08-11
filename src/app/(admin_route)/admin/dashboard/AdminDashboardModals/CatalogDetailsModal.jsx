"use client";
import {useState, useEffect} from "react";
import {toRupiah} from "../../../../../../helper/priceFormatter";

const CatalogDetailsModal = ({isOpen, onClose, catalogId}) => {
  const [currCatalog, setCurrCatalog] = useState({
    user: "Loading...",
    image: "",
    title: "Loading...",
    prize: "Loading...",
    tag: ["Loading..."],
    contact: "Loading...",
    details: "Loading...",
    approval: true,
  });

  const getCatalogData = async () => {
    try {
      const res = await fetch(`/api/admin/katalog/${catalogId}`);
      const data = await res.json();
      if (data.katalog) {
        setCurrCatalog(data.katalog);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCatalogData();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
      <div className="bg-slate-50 w-3/5 min-h-[35rem] shadow-lg space-y-28 rounded-lg px-5 py-16 font-montserrat">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Email</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currCatalog.user}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Produk</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currCatalog.title}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Harga</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {toRupiah(currCatalog.prize)}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Tag</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currCatalog.tag}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Kontak</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currCatalog.contact}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Detail</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currCatalog.details}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-zinc-800 px-5 py-1 text-lg text-slate-200 hover:bg-transparent hover:text-zinc-800 hover:outline hover:outline-2 hover:outline-zinc-800 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

module.exports = CatalogDetailsModal;
