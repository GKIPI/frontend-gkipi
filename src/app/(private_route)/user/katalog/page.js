"use client"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "../components/modal";


export default function UserDashboard() {

    const [dataToFetch, setDataToFetch] = useState(null)
    const [validation, setValidation] = useState(false)
    const { data: session, status } = useSession();
    const [data, setData] = useState({})

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            fetch(`/api/user/katalog/${session.user.email}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data.katalogs)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [session, status]);


    useEffect(() => {
        if (!dataToFetch) return;
        console.log(dataToFetch)

        fetch('/api/katalog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToFetch),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [dataToFetch]);

    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");
    const [prize, setPrize] = useState("");
    const [tag, setTag] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [contact, setContact] = useState("");
    const [details, setDetails] = useState("");

    
    const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [previewedKatalog, setPreviewedKatalog] = useState({});

    const tagOption = [
        "Beauty & Health",
        "Sport",
        "Property",
        "Fashion & Accessories",
        "Food & Beverage",
        "Electronics",
        "Book & Stationary",
        "Other"
    ];

    const handleViewKatalog = (Katalog) => {
        setPreviewedKatalog(Katalog);
        setPreviewModalOpen(true);
    };

    const handleOpenDeleteModal = (Katalog) => {
        setPreviewedKatalog(Katalog);
        setDeleteModalOpen(true);
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !prize || !details || !tag || !contact) {
            setValidation(true)
            return;
        }

        // Convert the uploaded image to base64
        const fileInput = document.querySelector('input[type="file"]');
        let base64Image = "";
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                base64Image = event.target.result;
                const formData = {
                    user: session.user.email,
                    title,
                    prize,
                    details,
                    contact,  
                    tag,
                    image: base64Image,
                };
                setDataToFetch(formData);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
        window.location.reload();
    };

    const handleDeleteKatalog = (katalog) => {
        try {
            console.log(katalog._id)
            fetch(`/api/katalog/${katalog._id}`, {
                method: 'DELETE'
            })
        } catch (error) {
            throw Error(error)

        }
        window.location.reload();
    };




    return (
        <div className="min-h-screen min-w-screen">
            <div className="absolute h-[40px] w-[40px] rounded-full m-3 hover:bg-primary hover:text-white">
                <Link href={"/user"}>
                    <FiArrowLeft className="h-8 md:h-10 w-max" />
                </Link>
            </div>
            <div className="lg:flex w-screen min-h-screen">
                <div className="lg:w-[50%] lg:h-screen">
                    <form onSubmit={handleSubmit} className="bg-tertiary lg:w-full h-screen p-5 flex flex-col justify-center">
                        <h1 className="font-bold text-[3rem] px-4 self-center">Lets make the world better!</h1>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Title:
                            <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Price:
                            <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="number" value={prize} onChange={(e) => setPrize(e.target.value)} />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Upload Image:
                            <input className="w-[50%] p-1" type="file" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Contact:
                            <input
                                className="border-2 border-black w-[50%] p-1 rounded-lg"
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Details:
                            <textarea
                                className="border-2 border-black w-[50%] p-1 rounded-lg"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Tag:
                            <select
                                className="border-2 border-black w-[50%] p-1 rounded-lg"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            >
                                <option value="" disabled>Select a Tag</option>
                                {tagOption.map((tagOption) => (
                                    <option key={tagOption} value={tagOption}>
                                        {tagOption}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button className="bg-black text-white text-center py-4 rounded-md my-2 self-end w-[25%] hover:text-primary border-2 border-primary hover:bg-white" type="submit" >Submit</button>
                    </form>
                </div>
                <div className="lg:w-[50%] h-max p-5 flex flex-col">
                    <div className="max-w-full h-full p-4" style={{ borderRadius: "10px", background: "#FAFAFA", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset" }}>
                        <div className="h-[80vh]">
                            <h1 className="font-bold text-[3rem] px-4 self-center">Preview</h1>
                            {data.length > 0 ? (
                                data.map((katalog, index) => (
                                    <div key={index} className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        <div>
                                            Title :
                                            <div>{katalog.title}</div>
                                        </div>
                                        <div>
                                            <button
                                                className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white"
                                                onClick={() => handleViewKatalog(katalog)}
                                            >
                                                View
                                            </button>{" "}
                                            <button
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:text-red-600 border-2 border-red-600 hover:bg-white"
                                                onClick={() => handleDeleteKatalog(katalog)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="m-5 text-red-600">*No job vacancies added yet.</p>
                            )}
                            <Modal
                                isOpen={isPreviewModalOpen}
                                onClose={() => setPreviewModalOpen(false)}
                                title={previewedKatalog.jobTitle}
                                content={
                                    <div className="max-h-[80vh] overflow-y-auto">
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Product Name :
                                            <div>{previewedKatalog.title}</div>
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            <img src={previewedKatalog.image} alt="CV Preview" className="max-h-[80vh] max-w-[80vw]" />
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Price :
                                            <div>{previewedKatalog.prize}</div>
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Details :
                                            <div>{previewedKatalog.details}</div>
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Tag :
                                            <div>{previewedKatalog.tag}</div>
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Contact :
                                            <p>{previewedKatalog.contact}</p>
                                        </div>
                                    </div>

                                }
                            />

                            {/* Delete Confirmation Modal */}
                            <Modal
                                isOpen={isDeleteModalOpen}
                                onClose={() => setDeleteModalOpen(false)}
                                title="Confirm Deletion"
                                content={
                                    <div>
                                        <p>Are you sure you want to delete this job vacancy?</p>
                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:text-red-600 border-2 border-red-600 hover:bg-white"
                                            onClick={() => handleDeleteKatalog(previewedKatalog)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white"
                                            onClick={() => setDeleteModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
