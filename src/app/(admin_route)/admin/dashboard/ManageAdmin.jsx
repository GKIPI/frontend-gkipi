"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {BiTrash} from "react-icons/bi";
import RemoveAdmin from "./AdminDashboardModals/RemoveAdmin";
export default function () {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currIndex, setCurrIndex] = useState("");
  const [adminList, setAdminList] = useState([
    {
      name: "Loading...",
      email: "Loading...",
      index: null,
    },
  ]);
  useEffect(() => {
    getCatalog();
  }, []);

  const getCatalog = async () => {
    const res = await fetch(`/api/admin/`);
    const data = await res.json();
    if (data.admin) {
      setAdminList(data.admin);
    }
  };

  return (
    <section className="min-h-[75vh] w-full flex flex-col items-center">
      <p className="text-center border-b-2 pb-4 font-montserrat">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
        repudiandae dignissimos libero nisi. Fuga natus laborum dolore nostrum!
        Odit iusto vero tenetur repellat voluptatum amet necessitatibus a autem
        sunt doloribus delectus, officia consequuntur sit, maxime ipsa corrupti
        quaerat aperiam quibusdam rem. Dolores consequatur molestiae
        reprehenderit. Saepe nulla eum error officia?
      </p>
      <div className="flex justify-end w-full pt-5 pb-3">
        <Link href={{pathname: "/admin/dashboard", query: {page: "add admin"}}}>
          <button className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
            Tambah Admin
          </button>
        </Link>
      </div>
      <table className="w-full border-collapse border border-zinc-800 text-left table-fixed">
        <thead className="font-montserrat text-xs md:text-sm">
          <tr className="border border-b border-zinc-800 bg-zinc-200">
            <th className="py-2 pl-4">Username</th>
            <th className="py-2">Email</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody className="text-sm font-montserrat text-zinc-600">
          {adminList.map((admin, i) => {
            return (
              <tr key={i}>
                <td className="py-4 pl-4 border-b border-zinc-800">
                  <div className="pr-2">
                    <p>{admin.name}</p>
                  </div>
                </td>
                <td className="py-4 border-b border-zinc-800">
                  <div className="pr-2">
                    <p>{admin.email}</p>
                  </div>
                </td>
                <td className="py-4 border-b border-zinc-800">
                  <div className="pr-2">
                    <button
                      onClick={() => {
                        setCurrIndex(admin._id);
                        setConfirmDelete(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 p-1 rounded-md text-white"
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
      <RemoveAdmin
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        index={currIndex}
      />
      <div className="w-full h-48 flex items-end">
        <Link href={"/admin/dashboard"}>
          <button className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
            Kembali
          </button>
        </Link>
      </div>
    </section>
  );
}
