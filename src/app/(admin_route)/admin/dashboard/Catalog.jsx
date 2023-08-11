import {useState, useEffect} from "react";
import {
  AiOutlineEye,
  AiOutlineFileSearch,
  AiOutlineForm,
  AiOutlineDelete,
} from "react-icons/ai";

import CatalogImageModal from "./AdminDashboardModals/CatalogImageModal";
import ConfirmDeleteModal from "./AdminDashboardModals/ConfirmDeleteModal";
import CatalogReviewModal from "./AdminDashboardModals/CatalogReviewModal";
import {toRupiah} from "../../../../../helper/priceFormatter";
import {
  requestCounter,
  getRequestedData,
} from "../../../../../helper/requestCounter";

export default function Catalog() {
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [catalogId, setCatalogId] = useState("");
  const [currImageOpen, setCurrImageOpen] = useState("");
  const [currImageTitle, setCurrImageTitle] = useState("");
  const [requestsData, setRequestsData] = useState([]);
  const [catalogList, setCatalogList] = useState([
    {
      _id: "",
      title: "Loading...",
      tag: ["Loading..."],
      prize: 0,
      contact: "Loading...",
      image: "",
    },
  ]);

  const getCatalogData = async () => {
    try {
      const res = await fetch("/api/admin/katalog");
      const data = await res.json();
      if (data.katalogs) {
        setCatalogList(data.katalogs);
        setRequestsData(getRequestedData(data.katalogs));
        console.log(data.katalogs);
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
            Review ({requestsData.length})
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
              {catalogList.map((catalog, i) => {
                if (!catalog.approval) return null;
                return (
                  <tr key={i}>
                    <td className="py-4 pl-4 border-b border-zinc-800">
                      <p className="line-clamp-1">{catalog.title}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-1">{catalog.tag}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-1">{toRupiah(catalog.prize)}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <p className="line-clamp-2">{catalog.contact}</p>
                    </td>
                    <td className="border-b border-zinc-800">
                      <div className="flex flex-row items-center gap-3">
                        <button
                          onClick={() => {
                            setCurrImageTitle(catalog.title);
                            setCurrImageOpen(catalog.image);
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
                            setCatalogId(catalog._id);
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
                          disabledData
                        >
                          <AiOutlineForm
                            size={25}
                            title="edit"
                            // className="hover:text-amber-400"
                          />
                        </button>
                        <button
                          onClick={() => {
                            setCatalogId(catalog._id);
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
          <CatalogImageModal
            src={{currImageOpen, currImageTitle}}
            isOpen={isModalImageOpen}
            onClose={() => setIsModalImageOpen(false)}
          />
          <CatalogReviewModal
            requests={requestsData}
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
          />
          <ConfirmDeleteModal
            endpoint="katalog"
            index={catalogId}
            onClose={() => setConfirmDeleteModal(false)}
            isOpen={confirmDeleteModal}
          />
        </div>
      </div>
    </section>
  );
}
