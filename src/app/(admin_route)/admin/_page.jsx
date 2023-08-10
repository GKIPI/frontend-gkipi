"use client";
import Image from "next/image";
import Pict1 from "../../../public/assets/pict1.png";
import Logo from "../../../public/Logo.png";
import Link from "next/link";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {useState} from "react";

export default function Admin() {
  const [adminUname, setAdminUname] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const validateAdmin = () => {
    adminUname === 'admin' && adminPassword === 'admin' ? true : false;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    validateAdmin ? window.location.href = '/admin/dashboard' : alert("Username atau Password salah").then(()=>{window.location.reload()})
  };
  return (
    <section className="min-h-min flex flex-row">
      <div className="w-[60%] flex flex-col items-center gap-20">
        <nav className="w-full">
          <Link href={"/"}>
            <Image src={Logo} alt="" className="w-28" />
          </Link>
        </nav>
        <main className=" font-montserrat w-1/2 space-y-8">
          <h1 className=" font-bold text-[3rem] leading-[3rem]">
            Welcome to Admin Login
          </h1>
          <div className=" text-sm md:text-base">
            <form onSubmit={(ev) => handleSubmit(ev)} className="space-y-4">
              <div className="space-y-2">
                <p className="text-[1.25rem]">Username</p>
                <input
                  type="text"
                  value={adminUname}
                  onChange={(ev) => setAdminUname(ev.target.value)}
                  placeholder="Enter admin username"
                  className="border border-black rounded-md px-[29px] py-4 w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <p className="text-[1.25rem]">Password</p>
                <div className="relative">
                  <input
                    onChange={(ev) => setAdminPassword(ev.target.value)}
                    value={adminPassword}
                    type={isPasswordHidden ? "password" : "show"}
                    placeholder="Enter admin password"
                    className="border border-black rounded-md px-[29px] py-4 w-full"
                    required
                  />
                  <div className="cursor-pointer inset-y-0 pr-5 absolute right-0 flex items-center">
                    {isPasswordHidden ? (
                      <FiEyeOff
                        size={20}
                        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                      />
                    ) : (
                      <FiEye
                        size={20}
                        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="select-none bg-zinc-800 text-white px-9 py-4 rounded-lg hover:bg-zinc-600 active:scale-95"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <div className="w-[40%]">
        <Image src={Pict1} priority alt="" className="w-screen select-none" />
      </div>
    </section>
  );
}
