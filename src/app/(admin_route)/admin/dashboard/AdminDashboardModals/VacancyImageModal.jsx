import {FiX} from "react-icons/fi";
import {downloadImage} from "../../../../../../helper/imageDownloader";

const VacancyImageModal = ({isOpen, onClose, src}) => {
  const {currImageOpen, currImageTitle} = src;
  const handleDownload = () => {
    downloadImage(currImageOpen, currImageTitle);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
      <div className="bg-slate-50 w-2/5 min-h-[43rem] shadow-lg space-y-8 rounded-lg px-5">
        <div className="flex flex-row justify-between items-center mt-1">
          <h1 className=" w-3/4 line-clamp-1">{currImageTitle}</h1>
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-3/4 aspect-square ${
              currImageOpen ? "" : "animate-pulse bg-slate-300"
            }`}
          >
            <img src={currImageOpen}></img>
          </div>
          <div className="flex gap-4">
            <button
              disabled
              className="cursor-not-allowed px-4 py-1 bg-zinc-800 text-slate-200 font-montserrat text-xl hover:outline hover:outline-2 hover:bg-transparent hover:outline-zinc-800 hover:text-zinc-800 transition-colors"
            >
              View
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1 bg-zinc-800 text-slate-200 font-montserrat text-xl hover:outline hover:outline-2 hover:bg-transparent hover:outline-zinc-800 hover:text-zinc-800 transition-colors"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = VacancyImageModal;
