import {FiX} from "react-icons/fi";

const JobSeekerDetailsModals = ({isOpen, onClose, src}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
      <div className="bg-slate-50 w-3/5 min-h-[35rem] shadow-lg space-y-28 rounded-lg px-5 py-16 font-montserrat">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Nama</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {src.nama}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Jenis Kelamin</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {src.jenisKelamin}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Pendidikan</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {src.pendidikan}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Keahlian</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {src.keahlian}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-[25%] font-semibold">Pengalaman</p>
            <p className="w-[75%] px-3 py-2 bg-slate-200 rounded-lg">
              {src.pengalaman}
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

module.exports = JobSeekerDetailsModals;
