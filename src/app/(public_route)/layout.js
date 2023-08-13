import Footer from "../components/footer"
import Navbar from "../components/navbar"
export default function PublicLayout({ children }) {
    return (
        <div className="overflow-x-hidden max-w-[100vw]">
            <Navbar />
            {children}
            <Footer />
        </div>)
}
