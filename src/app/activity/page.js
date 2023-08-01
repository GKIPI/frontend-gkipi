import Link from "next/link";
import ImageBg from "../../../public/Activity.png"
import Image from "next/image"


export default function Activity() {
    const pointObjects = [
        {
            icon: "/activity/point1.svg",
            text: "Buatkan foto produk/jasa Anda (ukuran file maksimum 250 kB)",
        },
        {
            icon: "/activity/point2.svg",
            text: "Kirim detail produk/jasa ini ke Administrator melalui email ke admin@komprofgp.org atau WA ke 0818-710037",
        },
        {
            icon: "/activity/point3.svg",
            text: "Untuk makanan, direkomendasikan produk yang tidak mengandung bahan pengawet",
        },
        {
            icon: "/activity/point4.svg",
            text: "Bukan Produk/Jasa MLM",
        },
        {
            icon: "/activity/point5.svg",
            text: "Tidak ada transaksi dilakukan di situs ini dan pengguna informasi katalog online ini tidak dipungut biaya",
        },
        {
            icon: "/activity/point6.svg",
            text: "Transaksi dapat dilakukan dengan menghubungi langsung dengan penjual melalui kontak yang tersedia",
        },
        {
            icon: "/activity/point7.svg",
            text: "Administrator mempunyai wewenang untuk menentukan apakah produk/jasa dapat dimasukkan di katalog ini",
        },
        {
            icon: "/activity/point8.svg",
            text: "Administrator tidak bertanggung jawab terhadap kualitas atau penyampaian barang yang disampaikan penjual bila tidak sesuai dengan harapan pembeli",
        },
        {
            icon: "/activity/point9.svg",
            text: "Bila Administrator mendapatkan masukan dari pembeli mengenai kualitas dan penyampaian barang yang tidak sesuai, dan telah dilakukan verifikasi, Administrator berhak untuk mengeluarkan produk tersebut dari katalog",
        },
    ];

    return (
        <section className="lg:flex flex-row min-h-screen ">
            <div className="lg:w-auto lg:h-screen w-0 max-h-[50vh] lg:max-h-[100vh] lg:max-w-[50%] overflow-y-hidden">
                <Image priority src={ImageBg} width={2668} height={4096} className="w-full" />
            </div>
            <div className="lg:w-full h-max p-5 flex flex-col">
                <div className="max-w-full h-full p-4" style={{ borderRadius: '10px', background: '#FAFAFA', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset' }}>
                    <div>
                        Cara Daftar Produk / Jasa
                    </div>
                    {pointObjects.map((point, index) => (
                        <div key={index} className="flex items-center mt-4">
                            <Image src={point.icon} width={30} height={30} alt={`Icon ${index}`} />
                            <p className="ml-2">{point.text}</p>
                        </div>
                    ))}
                </div>
                <Link href={'/'} className="self-end bg-primary hover:border-2 hover:border-primary mx-7 my-5 text-white px-7 py-2 hover:bg-white hover:text-primary font-[15px] w-max">Saya Mengerti</Link>
            </div>
        </section>
    )
}