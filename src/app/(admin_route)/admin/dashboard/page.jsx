"use client";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className=" flex flex-col items-center justify-center h-96">
        <div className=" w-3/4">
          <h1 className="font-montserrat text-4xl font-semibold text-center">
            Welcome to Admin Dashboard GKI Pondok Indah
          </h1>
        </div>
      </div>
      <Link href="/admin/dashboard/ManageAdmin">
        <button className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
          Kelola Admin
        </button>
      </Link>
      <div className="border-b-2 p-1"> </div>
    </section>
  );
}
