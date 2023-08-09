import {FiX} from "react-icons/fi";
import {BiSolidFileJpg, BiSolidUserCheck, BiTrash} from "react-icons/bi";
import {useState} from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import {parseBlobToURL} from "../../../../../helper/imageDownloader";

const JobSeekerReviewModal = ({isOpen, onClose, requests}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currUserId, setCurrUserId] = useState("");
  const viewCV = (img) => {
    const url = parseBlobToURL(img);
    window.open(url, "_blank");
  };
  const putApproved = async (req, userId) => {
    try {
      const res = await fetch(`/api/seeker/${userId}`, {
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
              <th className="py-2 pl-4">Nama</th>
              <th className="py-2">Pendidikan</th>
              <th className="py-2">Posisi</th>
              <th className="py-2">Jenis Kelamin</th>
              <th className="py-2">Keahlian</th>
              <th className="py-2">Tag</th>
              <th className="py-2">Usia</th>
              <th className="py-2">CV</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody className="text-sm font-montserrat text-zinc-600">
            {requests.map((request, i) => {
              return (
                <tr key={i}>
                  <td className="py-4 pl-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{request.name}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{request.education}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{request.jobTitle}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{request.sex}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{request.skills}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>
                        <span>{request.tag[0]} </span>|
                        <span className="font-bold"> {request.tag[1]}</span>
                      </p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <p>{request.age}</p>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="pr-2">
                      <button
                        onClick={() => viewCV(request.image)}
                        className="flex gap-1 items-center"
                      >
                        <BiSolidFileJpg size={20} />
                        <p className="line-clamp-1 text-amber-400 hover:underline italic">
                          {request.name}
                        </p>
                      </button>
                    </div>
                  </td>
                  <td className="py-4 border-b border-zinc-800">
                    <div className="flex flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          handleApproved(request._id);
                        }}
                        title="accept"
                        className="bg-green-500 hover:bg-green-600 p-1 rounded-md text-slate-200"
                      >
                        <BiSolidUserCheck size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setCurrUserId(request._id);
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
          endpoint={"seeker"}
          index={currUserId}
        />
      </div>
    </div>
  );
};

module.exports = JobSeekerReviewModal;
