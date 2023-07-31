import Image from "next/image";
import Link from "next/link";
import Logo from "./../../../../public/Logo.png";
import JobSeeker from "./JobSeeker";

export default function () {
  return (
    <div className="min-h-screen flex flex-row">
      <aside className="hidden md:block w-[25%] bg-zinc-200">
        <div className="h-[30%] w-full flex justify-center items-center">
          <Link href="/">
            <Image src={Logo} className="w-28 bg-secondary" />
          </Link>
        </div>
        <div className="flex flex-col justify-between h-[32rem]">
          <div className="px-6 font-montserrat text-lg space-y-4">
            <button>Home</button>
            <div className="space-y-2">
              <h1 className="font-bold">Lowongan Kerja</h1>
              <div className="flex flex-col pl-4 items-start">
                <button>Job Seeker</button>
                <button>Job Vacancies</button>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-bold">Katalog Online</h1>
              <button className="pl-4">My Catalog</button>
            </div>
          </div>
          <div className="px-6 space-y-8">
            <button className="font-montserrat text-2xl px-5 py-2.5 hover:bg-zinc-800 transition-colors duration-200 hover:text-slate-200 rounded-md">
              Sign Out
            </button>
            <div className="border-b border-zinc-400"></div>
            <div className="font-montserrat text-sm text-zinc-400">
              <p>Telp : (021) 7503247</p>
              <p>e-Mail : emailGKIPI@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="w-full md:w-[75%] py-4 px-2 md:px-8 flex flex-col">
        <div className="bg-red-500/25 flex justify-end">
          <div className="font-montserrat italic text-zinc-400">
            GKI Pondok Indah (Admin)
          </div>
        </div>
        <div>
          <JobSeeker />
        </div>
      </main>
    </div>
  );
}
