"use client";
import Link from "next/link";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

export default function Write() {
  const [imageData, setImageData] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImageData(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      image: imageData,
      details: details,
      user: "GKI Pondok Indah",
    };
    const res = await fetch(`/api/admin/activity`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast(`${res.error}`, {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    } else {
      toast("Submited data", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      router.push("/admin/dashboard/News");
    }
  };

  return (
    <div>
      <Link href={"/admin/dashboard/News"}>
        <button className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
          Back
        </button>
      </Link>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p>Upload cover</p>
            <input
              className="text-sm"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-poppins">Title</p>
            <input
              className="border focus:border-blue-500 font-poppins text-sm rounded-md px-4 py-2 focus:outline-none"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p>Content</p>
            <textarea
              wrap="hard"
              className="w-1/2 border focus:border-blue-500 font-poppins text-sm rounded-md px-4 py-2 focus:outline-none"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="w-1/2 flex justify-end">
            <button
              onClick={() => setPostLoading(true)}
              type="submit"
              className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200"
            >
              {!postLoading ? (
                "Upload"
              ) : (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
