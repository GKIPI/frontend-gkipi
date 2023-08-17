import Aside from "./Aside"
import { BsPersonCircle } from "react-icons/bs";

export default function AdminDashboardLayout({ children }) {
    return (
        <div className="min-h-screen w-full flex flex-row">
            <Aside />
            <main className="w-[75%] py-4 px-2 md:px-8 flex flex-col">
                <div className="flex justify-end">
                    <button className="flex gap-2 items-center font-montserrat italic text-zinc-800">
                        <BsPersonCircle />
                        <p>GKI Pondok Indah (Admin)</p>
                    </button>
                </div>
                {children}
            </main>
        </div>
    )
}