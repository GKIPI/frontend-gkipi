import {
  AiOutlineEye,
  AiOutlineFileSearch,
  AiOutlineForm,
  AiOutlineDelete,
} from "react-icons/ai";
import {useState, useEffect} from "react";
import CatalogImageModal from "./AdminDashboardModals/CatalogImageModal";
import ConfirmDeleteModal from "./AdminDashboardModals/ConfirmDeleteModal";
import {toRupiah} from "../../../../../helper/priceFormatter";
import {requestCounter} from "../../../../../helper/requestCounter";
import {CatalogReviewModal} from "./AdminDashboardModals/CatalogReviewModal";

export default function Catalog() {
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [currItem, setCurrItem] = useState(0);
  const [currImageData, setCurrImageData] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [catalogData, setCatalogData] = useState([
    {
      _id: null,
      title: "Loading...",
      tag: ["Loading..."],
      prize: 0,
      contact: "Loading...",
      image: "Loading...",
    },
  ]);

  const getCatalogData = async () => {
    try {
      const res = await fetch("/api/admin/katalog");
      const data = await res.json();
      if (data.katalogs) {
        const displayed = data.katalogs.filter((katalog) => katalog.approval);
        setCatalogData(displayed);
        console.log(data.katalogs);
        setRequestCount(requestCounter(data.katalogs));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCatalogData();
  }, []);
  return (
    <section className="space-y-10">
      <h1 className="font-montserrat text-2xl md:text-4xl font-bold pt-16">
        My Catalog
      </h1>
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setIsReviewOpen(true)}
            className="font-montserrat bg-zinc-800 text-slate-200 px-4 py-2 hover:bg-transparent hover:text-zinc-800 hover:outline hover:outline-2 hover:outline-zinc-800 transi duration-200"
          >
            Review ({requestCount})
          </button>
        </div>
        <div>
          <table className="w-full border-collapse border border-zinc-800 text-left table-fixed">
            <thead className="font-montserrat text-xs md:text-sm">
              <tr className="border border-b border-zinc-800 bg-zinc-200">
                <th className="py-2 pl-4">Name</th>
                <th className="py-2 line-clamp-1">Category</th>
                <th className="py-2">Price</th>
                <th className="py-2">Contact</th>
                <th className="py-2">Picture</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-montserrat text-zinc-600">
              {catalogData.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="py-4 pl-4 border-b border-zinc-800">
                      <p className="line-clamp-1">{item.title}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-1">{item.tag}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-1">{toRupiah(item.prize)}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-2">{item.contact}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <div className="flex flex-row items-center gap-3">
                        <button
                          onClick={() => {
                            setCurrItem(item.title);
                            setIsModalImageOpen(true);
                            setCurrImageData(item.image);
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
                            setCurrItem(item._id);
                          }}
                        >
                          <AiOutlineEye
                            size={25}
                            title="view"
                            className="hover:text-blue-400"
                          />
                        </button>
                        <button
                          onClick={() => {
                            setCurrItem(item._id);
                          }}
                        >
                          <AiOutlineForm
                            size={25}
                            title="edit"
                            className="hover:text-amber-400"
                          />
                        </button>
                        <button
                          onClick={() => {
                            setCurrItem(item._id);
                            setConfirmDelete(true);
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
          <CatalogImageModal
            src={currImageData}
            title={currItem}
            isOpen={isModalImageOpen}
            onClose={() => setIsModalImageOpen(false)}
          />
          <CatalogReviewModal
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
          />
          <ConfirmDeleteModal
            endpoint="katalog"
            index={currItem}
            onClose={() => setConfirmDelete(false)}
            isOpen={confirmDelete}
          />
        </div>
      </div>
    </section>
  );
}
