"use client";
import {FiX} from "react-icons/fi";
import {BiSolidFileJpg, BiSolidUserCheck, BiTrash} from "react-icons/bi";
import Link from "next/link";
import {useEffect, useState} from "react";
import {requestCounterData} from "../../../../../helper/requestCounter";
import {toRupiah} from "../../../../../helper/priceFormatter";

export const CatalogReviewModal = ({isOpen, onClose, src}) => {
  const [catalogRequest, setCatalogRequest] = useState([
    {
      user: "Loading...",
      title: "Loading...",
      prize: "Loading...",
      tag: "Loading...",
      details: "Loading...",
      image: "Loading...",
      contact: "Loading...",
      approval: false,
    },
  ]);

  const getCatalogReview = async () => {
    try {
      const res = await fetch("/api/admin/katalog");
      const data = await res.json();
      if (data.katalogs) {
        const requests = requestCounterData(data.katalogs);
        setCatalogRequest(requests);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCatalogReview();
  });
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
              <th className="py-2 pl-4">User</th>
              <th className="py-2">Title</th>
              <th className="py-2">Price</th>
              <th className="py-2">Category</th>
              <th className="py-2">Details</th>
              <th className="py-2">Image</th>
              <th className="py-2">Contact</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody className="text-sm font-montserrat text-zinc-600">
            {catalogRequest.map((req, i) => {
              return (
                <tr>
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
                      <p>{toRupiah(req.prize)}</p>
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
                      <Link
                        onClick={() => alert("CV Downloaded")}
                        href={"/admin/dashboard?page=My+Catalog"}
                        className="flex gap-1 items-center"
                      >
                        <BiSolidFileJpg size={20} />
                        <p className="line-clamp-1 text-amber-400 hover:underline italic">
                          Muhammad Razza Titian
                        </p>
                      </Link>
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
                          console.log("Accepted");
                        }}
                        title="accept"
                        className="bg-green-500 hover:bg-green-600 p-1 rounded-md text-slate-200"
                      >
                        <BiSolidUserCheck size={20} />
                      </button>
                      <button
                        onClick={() => {
                          console.log("Rejected");
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
      </div>
    </div>
  );
};
