"use client";
import Link from "next/link";
import {OnLoading} from "./onLoading";
import {useEffect, useState} from "react";
import Image from "next/image";
import ConfirmDeleteModal from "../AdminDashboardModals/ConfirmDeleteModal";

export default function News() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [contentId, setContentId] = useState("");
  const getActivity = async () => {
    try {
      const res = await fetch("/api/admin/activity");
      const data = await res.json();
      if (data.activities) {
        setFetchedData(data.activities);
        setIsLoaded(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div>
      <div className="h-36 flex justify-between items-end w-full border-b-2 py-1">
        <h1 className="font-poppins font-semibold text-4xl">Content List</h1>
        <Link href={"/admin/dashboard/News/write"}>
          <button className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
            Write
          </button>
        </Link>
      </div>
      {/* Content */}
      <div className="py-8">
        {isLoaded ? (
          <div className="flex flex-col gap-8">
            {fetchedData.map((_data) => {
              return (
                <div key={_data._id} className="flex gap-4">
                  <div className="relative h-36 aspect-video">
                    <Image src={_data.image} fill alt="" className="w-full" />
                  </div>
                  <div className="flex flex-col w-full justify-end">
                    <h1 className="font-montserrat font-semibold text-2xl">
                      {_data.title}
                    </h1>
                    <p className="line-clamp-3">{_data.details}</p>
                    <div className="flex gap-4">
                      <Link href={`/activity/${_data._id}`} target="_blank">
                        <button className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
                          Read
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setContentId(_data._id);
                          setConfirmDelete(true);
                        }}
                        className="px-5 py-2 text-zinc-800 outline outline-2 outline-zinc-800 hover:outline-none hover:bg-red-500 hover:text-white transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <OnLoading />
        )}
      </div>
      <ConfirmDeleteModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        endpoint={"admin/activity"}
        index={contentId}
      />
    </div>
  );
}
