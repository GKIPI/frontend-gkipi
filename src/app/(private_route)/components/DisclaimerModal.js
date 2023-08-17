"use client";
import { FiX } from "react-icons/fi";

export default function DisclaimerModal ({ isOpen, setIsOpenClose, handlesubmit }){

    return (
        <>
        {isOpen? <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
            <div className="bg-slate-50 w-[80vw] md:w-[50%] max-h-[80vh] shadow-lg flex flex-col gap-8 rounded-lg px-5 py-5 font-montserrat">
                <div className="flex flex-row justify-end items-center">
                    <button onClick={() => {
                        setIsOpenClose(false)
                    }}>
                        <FiX size={20} />
                    </button>
                </div>
                <div className=" flex flex-col">
                    <h1 className="text-center text-3xl font-bold font-montserrat">Disclaimer</h1>
                    <ol className="list-decimal pl-6 text-justify flex flex-col  max-h-[55vh] overflow-auto gap-3">
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
                            handlesubmit()
                        }}
                        className=" px-4 py-1 bg-zinc-800 text-slate-200 font-montserrat text-xl hover:outline hover:outline-2 hover:bg-transparent hover:outline-zinc-800 hover:text-zinc-800 transition-colors"
                    >
                        Setuju
                    </button>
                </div>
            </div>
        </div> : null
        }
        
        </>
    );
};

module.exports = DisclaimerModal;
