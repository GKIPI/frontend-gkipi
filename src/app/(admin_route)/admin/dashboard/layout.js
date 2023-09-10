import Aside from "./Aside"
import { BsPersonCircle } from "react-icons/bs";

export default function AdminDashboardLayout({ children }) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const currentDate = new Date().toLocaleDateString('en-UK', options);
    return (
        <div className="min-h-screen w-full flex flex-row">
            <Aside />
            <main className="w-[75%] py-4 px-2 md:px-8 flex flex-col">
                <div className="flex justify-end gap-8">
                    <h1 className="gap-2 items-center font-montserrat text-zinc-800">{currentDate}</h1>
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