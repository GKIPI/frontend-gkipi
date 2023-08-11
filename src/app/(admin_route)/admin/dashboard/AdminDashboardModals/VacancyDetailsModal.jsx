"use client";
import {useState, useEffect} from "react";
import {toRupiah} from "../../../../../../helper/priceFormatter";

const VacancyDetailsModal = ({isOpen, onClose, vacancyId}) => {
  const [currVacancy, setCurrVacancy] = useState({
    _id: "",
    user: "Loading...",
    image: ["Loading..."],
    jobTitle: "Loading...",
    company: "Loading...",
    image: "",
    location: "Loading...",
    notes: "Loading...",
    tag: ["Loading...", "Loading..."],
    approval: true,
  });

  const getVacancyData = async () => {
    try {
      console.log(vacancyId);
      const res = await fetch(`/api/admin/vacancy/${vacancyId}`);
      const data = await res.json();
      if (data.vacancy) {
        setCurrVacancy(data.vacancy);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVacancyData();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
      <div className="bg-slate-50 w-3/5 min-h-[35rem] shadow-lg space-y-28 rounded-lg px-5 py-16 font-montserrat">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Email</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currVacancy.user}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Perusahaan</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currVacancy.company}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Lokasi</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currVacancy.location}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Posisi</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currVacancy.jobTitle}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Tag</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currVacancy.tag[0]} |{" "}
              <span className="font-bold">{currVacancy.tag[1]}</span>
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Note</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {currVacancy.notes}
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

module.exports = VacancyDetailsModal;
