import {FiX} from "react-icons/fi";

const CatalogImageModal = ({isOpen, onClose, src, title}) => {
  const handleDownload = () => {
    const byteString = atob(src.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], {type: "image/jpeg"});
    const imageUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
      <div className="bg-slate-50 w-2/5 min-h-[43rem] shadow-lg space-y-8 rounded-lg px-5">
        <div className="flex flex-row justify-between items-center mt-1">
          <h1 className=" w-3/4 line-clamp-1">{title}</h1>
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-3/4 aspect-square ${
              src ? "" : "animate-pulse bg-slate-300"
            }`}
          >
            <img src={src}></img>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-1 bg-zinc-800 text-slate-200 font-montserrat text-xl hover:outline hover:outline-2 hover:bg-transparent hover:outline-zinc-800 hover:text-zinc-800 transition-colors">
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

module.exports = CatalogImageModal;
