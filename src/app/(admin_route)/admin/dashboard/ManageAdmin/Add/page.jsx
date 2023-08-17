"use client";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function () {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const router = useRouter();

  const postAdmin = async (req) => {
    try {
      const res = await fetch(`/api/auth/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await res.json();
      console.log(data);
      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");
      router.push("/admin/dashboard/ManageAdmin");
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const data = {
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    };
    postAdmin(data);
  };

  return (
    <section className=" w-full flex flex-col gap-10">
      <h1 className="text-4xl font-montserrat font-bold border-b-2 border-spacing-5">
        Tambah Admin
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 font-montserrat text-lg flex flex-col gap-6"
      >
        <div>
          <p>Nama:</p>
          <input
            type="text"
            placeholder="Masukkan nama lengkap..."
            className="border w-full border-zinc-800 rounded-md px-[29px] py-4"
            value={adminName}
            onChange={(ev) => {
              setAdminName(ev.target.value);
            }}
            required
          />
        </div>
        <div>
          <p>Email:</p>
          <input
            type="text"
            placeholder="Masukkan alamat email..."
            className="border w-full border-zinc-800 rounded-md px-[29px] py-4"
            value={adminEmail}
            onChange={(ev) => {
              setAdminEmail(ev.target.value);
            }}
            required
          />
        </div>
        <div>
          <p>Password:</p>
          <div className="relative">
            <input
              type={isPasswordHidden ? "password" : "show"}
              placeholder="Buat password"
              className="border border-zinc-800 rounded-md px-[29px] py-4 w-full"
              value={adminPassword}
              onChange={(ev) => setAdminPassword(ev.target.value)}
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
          <button className="bg-zinc-800 px-10 py-4 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
            Submit
          </button>
        </div>
      </form>
      <div>
        <Link href="/admin/dashboard/ManageAdmin">
          <button className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
            Kembali
          </button>
        </Link>
      </div>
    </section>
  );
}
