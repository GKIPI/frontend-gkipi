"use client";
import {FiX} from "react-icons/fi";
import {BiSolidFileJpg, BiSolidUserCheck, BiTrash} from "react-icons/bi";
import Link from "next/link";
import {useEffect, useState} from "react";
import {getRequestedData} from "../../../../../../helper/requestCounter";
import {toRupiah} from "../../../../../../helper/priceFormatter";
import {parseBlobToURL} from "../../../../../../helper/imageDownloader";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const CatalogReviewModal = ({isOpen, onClose, requests}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currUserId, setCurrUserId] = useState("");
  const viewImage = (img) => {
    const url = parseBlobToURL(img);
    window.open(url, "_blank");
  };
  const putApproved = async (req, catalogId) => {
    try {
      const res = await fetch(`/api/katalog/${catalogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const msg = await res.json();
      console.log(msg);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  const handleApproved = (userId) => {
    const data = {
      approval: true,
    };
    putApproved(data, userId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
      <div className="bg-slate-50 w-[98%] min-h-[40rem] shadow-lg space-y-28 rounded-lg px-5 py-5 font-montserrat">
        <div className="flex flex-row justify-end items-center">
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>
        <table className="w-full border-collapse border border-zinc-800 text-left table-fixed">
          <thead className="font-montserrat text-xs md:text-sm">
            <tr className="border border-b border-zinc-800 bg-zinc-200">
              <th className="py-2 pl-4">Email</th>
              <th className="py-2">Nama</th>
              <th className="py-2">Harga</th>
              <th className="py-2">Kategori</th>
              <th className="py-2">Detail</th>
              <th className="py-2">Gambar</th>
              <th className="py-2">Kontak</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody className="text-sm font-montserrat text-zinc-600">
            {requests.map((req, i) => {
              return (
                <tr key={i}>
                  <td className="py-4 pl-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{req.user}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{req.title}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{toRupiah(req.price)}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{req.tag}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{req.details}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <button
                        onClick={() => viewImage(req.image)}
                        className="flex gap-1 items-center"
                      >
                        <BiSolidFileJpg size={20} />
                        <p className="line-clamp-1 text-amber-400 hover:underline italic">
                          {req.title}
                        </p>
                      </button>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{req.contact}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="flex flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          handleApproved(req._id);
                        }}
                        title="accept"
                        className="bg-green-500 hover:bg-green-600 p-1 rounded-md text-slate-200"
                      >
                        <BiSolidUserCheck size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setCurrUserId(req._id);
                          setConfirmDelete(true);
                        }}
                        className="bg-red-500 hover:bg-red-600 p-1 rounded-md text-slate-200"
                      >
                        <BiTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ConfirmDeleteModal
          onClose={() => setConfirmDelete(false)}
          isOpen={confirmDelete}
          endpoint={"katalog"}
          index={currUserId}
        />
      </div>
    </div>
  );
};

module.exports = CatalogReviewModal;
