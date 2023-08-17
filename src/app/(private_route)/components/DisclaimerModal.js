"use client";
import { FiX } from "react-icons/fi";

const DisclaimerModal = ({ isOpen, onClose, agreement }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
            <div className="bg-slate-50 w-[50%] min-h-[40rem] shadow-lg flex flex-col gap-8 rounded-lg px-5 py-5 font-montserrat">
                <div className="flex flex-row justify-end items-center bg-red-500/25">
                    <button onClick={() => {
                        onClose
                        agreement(false)
                    }}>
                        <FiX size={20} />
                    </button>
                </div>
                <div className="bg-red-500/25 flex flex-col">
                    <h1 className="text-center text-3xl font-bold font-montserrat">Disclaimer</h1>
                    <ol className="list-decimal pl-6 text-justify flex flex-col gap-3">
                        <li>
                            Web ini merupakan fasilitator penjual - pembeli dan pemberi kerja - pencari kerja untuk dapat berkomunikasi dan transaksi.
                        </li>
                        <li>
                            Web ini tidak bertanggung jawab terhadap kualitas dan materi produk yang disampaikan penjual bilamana tidak sesuai dengan harapan pembeli.
                        </li>
                        <li>
                            Web ini tidak bertangung jawab baik atas kandidat pencari kerja maupun perorangan atau instasi pemberi kerja.
                        </li>
                        <li>
                            Tidak ada transaksi dilakukan web ini dan pengguna informasi web tidak dipungut biaya.
                        </li>
                        <li>
                            Komunikasi dan transaksi dapat dilakukan dengan menghubungi langsung kepada pihak terkait.
                        </li>
                        <li>
                            Administrator mempunyai kewenangan untuk menverifikasi produk, kandidat dan iklan pemberi kerja sebelum diatayangkan dan bahkan mengeluarkan atau menghapus dari web.
                        </li>
                    </ol>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            agreement(true)
                            onClose();
                        }}
                        className="w-1/5 px-4 py-1 bg-zinc-800 text-slate-200 font-montserrat text-xl hover:outline hover:outline-2 hover:bg-transparent hover:outline-zinc-800 hover:text-zinc-800 transition-colors"
                    >
                        Setuju
                    </button>
                </div>
            </div>
        </div>
    );
};

module.exports = DisclaimerModal;