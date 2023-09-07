import Link from "next/link";
import {OnLoading} from "./onLoading";

export default function News() {
  return (
    <div>
      <div className="h-36 flex justify-between items-end w-full border-b-2 py-1">
        <h1 className="font-poppins font-semibold text-4xl">Content List</h1>
        <Link href={"/admin/dashboard/News/write"}>
          <button className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
            Write
          </button>
        </Link>
      </div>
      {/* Content */}
      <div className="py-8">
        <OnLoading />
      </div>
    </div>
  );
}
