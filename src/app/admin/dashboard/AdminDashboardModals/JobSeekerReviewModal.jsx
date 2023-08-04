import {FiX} from "react-icons/fi";
import {BiSolidFileJpg, BiSolidUserCheck, BiTrash} from "react-icons/bi";
import Link from "next/link";

const JobSeekerReviewModal = ({isOpen, onClose, src}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
      <div className="bg-slate-50 w-4/5 min-h-[40rem] shadow-lg space-y-28 rounded-lg px-5 py-5 font-montserrat">
        <div className="flex flex-row justify-end items-center">
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>
        <table className="w-full border-collapse border border-zinc-800 text-left table-fixed">
          <thead className="font-montserrat text-xs md:text-sm">
            <tr className="border border-b border-zinc-800 bg-zinc-200">
              <th className="py-2 pl-4">Nama</th>
              <th className="py-2">Jenis Kelamin</th>
              <th className="py-2">Pendidikan</th>
              <th className="py-2">Keahlian</th>
              <th className="py-2">Pengalaman</th>
              <th className="py-2">CV</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody className="text-sm font-montserrat text-zinc-600">
            <tr>
              <td className="py-4 pl-4 border-b border-zinc-800">
                <div className="pr-2">
                  <p>Muhammad Razza Titian Jiwani</p>
                </div>
              </td>
              <td className="py-4 border-b border-zinc-800">
                <div className="pr-2">
                  <p>Laki-laki</p>
                </div>
              </td>
              <td className="py-4 border-b border-zinc-800">
                <div className="pr-2">
                  <p>S1 Teknologi Informasi</p>
                </div>
              </td>
              <td className="py-4 border-b border-zinc-800">
                <div className="pr-2">
                  <p>Menjadi Mahasiswa</p>
                </div>
              </td>
              <td className="py-4 border-b border-zinc-800">
                <div className="pr-2">
                  <p>Menjadi Mahasiswa</p>
                </div>
              </td>
              <td className="py-4 border-b border-zinc-800">
                <div className="pr-2">
                  <Link
                    onClick={() => alert("CV Downloaded")}
                    href={"/admin/dashboard"}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

module.exports = JobSeekerReviewModal;
