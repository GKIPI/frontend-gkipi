"use client";

import {useEffect, useState} from "react";
import {
  AiOutlineEye,
  AiOutlineFileSearch,
  AiOutlineForm,
  AiOutlineDelete,
} from "react-icons/ai";

import JobSeekerCVModals from "./AdminDashboardModals/JobSeekerCVModals";
import JobSeekerDetailsModal from "./AdminDashboardModals/JobSeekerDetailsModal";
import JobSeekerReviewModal from "./AdminDashboardModals/JobSeekerReviewModal";
import ConfirmDeleteModal from "./AdminDashboardModals/ConfirmDeleteModal";
import {
  requestCounter,
  getRequestedData,
} from "../../../../helper/requestCounter";

export default function JobSeeker() {
  const [isModalCVOpen, setIsModalCVOpen] = useState(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [currItem, setCurrItem] = useState("");
  const [currCVOpen, setCurrCVOpen] = useState("");
  const [seekerId, setSeekerId] = useState("");
  const [requestsData, setRequestsData] = useState([]);
  const [seekerList, setSeekerList] = useState([
    {
      _id: "",
      name: "Loading...",
      image: "",
      skills: "Loading...",
      education: "Loading...",
      approval: true,
      tag: ["Loading List..."],
    },
  ]);

  const getSeekerData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/seeker");
      const data = await res.json();
      if (data.seekers) {
        setSeekerList(data.seekers);
        setRequestsData(getRequestedData(data.seekers));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSeekerData();
  }, []);

  return (
    <section className="space-y-10">
      <h1 className="font-montserrat text-2xl md:text-4xl font-bold pt-16">
        Job Seeker
      </h1>
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setIsReviewOpen(true)}
            className="font-montserrat bg-zinc-800 text-slate-200 px-4 py-2 hover:bg-transparent hover:text-zinc-800 hover:outline hover:outline-2 hover:outline-zinc-800 transi duration-200"
          >
            Review ({requestCounter(seekerList)})
          </button>
        </div>
        <div>
          <table className="w-full border-collapse border border-zinc-800 text-left table-fixed">
            <thead className="font-montserrat text-xs md:text-sm">
              <tr className="border border-b border-zinc-800 bg-zinc-200">
                <th className="py-2 pl-4">Name</th>
                <th className="py-2 line-clamp-1">Education</th>
                <th className="py-2">Skills</th>
                <th className="py-2">Tags</th>
                <th className="py-2">CV</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-montserrat text-zinc-600">
              {seekerList.map((item, i) => {
                if (!item.approval) return null;
                return (
                  <tr key={i}>
                    <td className="py-4 pl-4 border-b border-zinc-800">
                      <p className="line-clamp-1">{item.name}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-1">{item.education}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-1">{item.skills}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <div>
                        {item.tag.map((a, i) => {
                          return (
                            <ul key={i} className="list-disc">
                              <li>{a}</li>
                            </ul>
                          );
                        })}
                      </div>
                    </td>
                    <td className="border-b border-zinc-800">
                      <div className="flex flex-row items-center gap-3">
                        <button
                          onClick={() => {
                            setIsModalCVOpen(true);
                            setCurrCVOpen(item.image);
                            setCurrItem(item.name);
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
                            setSeekerId(item._id);
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
                        <button>
                          <AiOutlineDelete
                            onClick={() => {
                              setSeekerId(item._id);
                              setConfirmDeleteModal(true);
                            }}
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
          <JobSeekerCVModals
            isOpen={isModalCVOpen}
            src={{currCVOpen, currItem}}
            onClose={() => setIsModalCVOpen(false)}
          />
          <JobSeekerDetailsModal
            seekerId={seekerId}
            isOpen={isModalDetailsOpen}
            onClose={() => setIsModalDetailsOpen(false)}
          />
          <ConfirmDeleteModal
            endpoint="seeker"
            index={seekerId}
            isOpen={confirmDeleteModal}
            onClose={() => setConfirmDeleteModal(false)}
          />
          <JobSeekerReviewModal
            requests={requestsData}
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
          />
        </div>
      </div>
    </section>
  );
}
