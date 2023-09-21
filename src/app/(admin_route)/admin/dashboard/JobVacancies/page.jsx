"use client";
import {
  AiOutlineEye,
  AiOutlineFileSearch,
  AiOutlineForm,
  AiOutlineDelete,
} from "react-icons/ai";
import {useEffect, useState} from "react";
import {getRequestedData} from "../../../../../../helper/requestCounter";
import ConfirmDeleteModal from "../AdminDashboardModals/ConfirmDeleteModal";
import VacancyImageModal from "../AdminDashboardModals/VacancyImageModal";
import VacancyDetailsModal from "../AdminDashboardModals/VacancyDetailsModal";
import VacancyReviewModal from "../AdminDashboardModals/VacancyReviewModal";

export default function JobVacancies() {
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [vacancyId, setVacancyId] = useState("");
  const [currImageOpen, setCurrImageOpen] = useState("");
  const [currImageTitle, setCurrImageTitle] = useState("");
  const [requestsData, setRequestsData] = useState([]);
  const [vacancyList, setVacancyList] = useState([
    {
      _id: "",
      user: "Loading...",
      image: ["Loading..."],
      jobTitle: "Loading...",
      company: "Loading...",
      image: "",
      location: "Loading...",
      notes: "Loading...",
      tag: ["Loading...", "Loading..."],
      createdAt: "",
      approval: true,
    },
  ]);

  const getVacancyData = async () => {
    try {
      const res = await fetch("/api/admin/vacancy");
      const data = await res.json();
      if (data.vacancies) {
        setVacancyList(data.vacancies);
        setRequestsData(getRequestedData(data.vacancies));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVacancyData();
  }, []);
  return (
    <section className="space-y-10">
      <h1 className="font-montserrat text-2xl md:text-4xl font-bold pt-16">
        Job Vacancies
      </h1>
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setIsReviewOpen(true)}
            className="font-montserrat bg-zinc-800 text-slate-200 px-4 py-2 hover:bg-transparent hover:text-zinc-800 hover:outline hover:outline-2 hover:outline-zinc-800 transi duration-200"
          >
            Review ({requestsData.length})
          </button>
        </div>
        <div>
          <table className="w-full border-collapse border border-zinc-800 text-left table-fixed">
            <thead className="font-montserrat text-xs md:text-sm">
              <tr className="border border-b border-zinc-800 bg-zinc-200">
                <th className="py-2 pl-4">Job</th>
                <th className="py-2 line-clamp-1">Company</th>
                <th className="py-2">Location</th>
                <th className="py-2">Notes</th>
                <th className="py-2">Created At</th>
                <th className="py-2">Poster</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-montserrat text-zinc-600">
              {vacancyList.map((item, i) => {
                if (!item.approval) return null;
                return (
                  <tr>
                    <td className="py-4 pl-4 border-b border-zinc-800">
                      <p className="line-clamp-1">{item.jobTitle}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-1">{item.company}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-1">{item.location}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-2">{item.notes}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-2">
                        {new Date(item.createdAt).toLocaleString("en-UK")}
                      </p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <div className="flex flex-row items-center gap-3">
                        <button
                          onClick={() => {
                            setCurrImageTitle(
                              `${item.company} - ${item.jobTitle}`
                            );
                            setCurrImageOpen(item.image);
                            setIsModalImageOpen(true);
                          }}
                        >
                          <AiOutlineFileSearch
                            title="view PDF"
                            size={25}
                            className="hover:text-blue-400"
                          />
                        </button>
                      </div>
                    </td>
                    <td className="border-b border-zinc-800">
                      <div className="flex flex-row items-center gap-3">
                        <button
                          onClick={() => {
                            setVacancyId(item._id);
                            setIsModalDetailsOpen(true);
                          }}
                        >
                          <AiOutlineEye
                            size={25}
                            title="view"
                            className="hover:text-blue-400"
                          />
                        </button>
                        <button
                          className="cursor-not-allowed text-slate-300"
                          disabled
                        >
                          <AiOutlineForm
                            size={25}
                            title="edit"
                            // className="hover:text-amber-400"
                          />
                        </button>
                        <button
                          onClick={() => {
                            setVacancyId(item._id);
                            setConfirmDeleteModal(true);
                          }}
                        >
                          <AiOutlineDelete
                            size={25}
                            title="delete"
                            className="hover:text-red-400"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <VacancyReviewModal
            requests={requestsData}
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
          />
          <ConfirmDeleteModal
            endpoint="vacancy"
            index={vacancyId}
            onClose={() => setConfirmDeleteModal(false)}
            isOpen={confirmDeleteModal}
          />
          <VacancyImageModal
            src={{currImageOpen, currImageTitle}}
            isOpen={isModalImageOpen}
            onClose={() => setIsModalImageOpen(false)}
          />
          <VacancyDetailsModal
            isOpen={isModalDetailsOpen}
            onClose={() => setIsModalDetailsOpen(false)}
            vacancyId={vacancyId}
          />
        </div>
      </div>
    </section>
  );
}
