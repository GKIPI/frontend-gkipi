"use client"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "@/app/components/modal";
import BlurredOnLoad from "@/app/loading";
import { toast } from "react-toastify";
import { BsEye } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { convertImageToBase64 } from "../../../../../helper/convertImage";
import DisclaimerModal from "../../components/DisclaimerModal"

export default function UserDashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [dataToFetch, setDataToFetch] = useState(null)
    const [disclaimerOpen, setDisclaimerOpen] = useState(false)
    const [validation, setValidation] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDisclaimerAgreed, setIsDisclaimerAgreed] = useState(false)
    const { data: session, status } = useSession();
    const [data, setData] = useState({})

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            fetch(`/api/user/katalog/${session.user.email}`)
                .then(response => {
                    if (!response.ok) {
                        toast(`${error}`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data.katalogs)
                    setIsLoading(false)
                })
                .catch(error => {
                    toast(`${error}`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
                    console.error('Error fetching data:', error);
                });
        }
    }, [session, status]);


    useEffect(() => {
        if (!dataToFetch) return;

        fetch('/api/katalog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToFetch),
        })
            .then(response => {
                if (!response.ok) {
                    toast(`${response.error}`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                toast('Submited data', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                setData(data);
                window.location.reload();
            })
            .catch(error => {
                toast(`${response.error}`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
                console.error('Error fetching data:', error);
            });
    }, [dataToFetch]);

    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
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

    const handleSubmit = () => {
        if ((!title || !price || !details || !tag || !contact)) {
            setValidation(true)
            setDisclaimerOpen(false)
            return;
        }

        // Convert the uploaded image to base64
        const fileInput = document.querySelector('input[type="file"]');
        convertImageToBase64(fileInput, (base64Image) => {
            const formData = {
                user: session.user.email,
                title,
                price,
                details,
                contact,
                tag,
                image: base64Image,
            };
            setDataToFetch(formData)
        })

    };

    const handleDeleteKatalog = (katalog) => {
        try {
            fetch(`/api/katalog/${katalog._id}`, {
                method: 'DELETE'
            })
        } catch (error) {
            toast(`${error}`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
            throw Error(error)

        }
        toast('Deleted data', { hideProgressBar: true, autoClose: 2000, type: 'success' })
        window.location.reload();
    };




    return (
        <>
            {isLoading ? (<BlurredOnLoad />) : (
                <div className="min-h-screen min-w-screen">
                    <div className="absolute h-[40px] w-[40px] rounded-full m-3 hover:bg-primary hover:text-white">
                        <Link href={"/user"}>
                            <FiArrowLeft className="h-8 md:h-10 w-max" />
                        </Link>
                    </div>
                    <div className="lg:flex w-screen min-h-screen">
                        <div className="lg:w-[50%] lg:h-screen">
                            <form onSubmit={() => { setDisclaimerOpen(true) }} className="bg-tertiary lg:w-full h-screen p-5 flex flex-col">
                                <h1 className="font-bold text-[3rem] px-4 self-center md:text-3xl mt-2">Lets make the world better!</h1>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Title:
                                    <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Price:
                                    <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
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
                                        placeholder="contoh: 81234698723"
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Details:
                                    <textarea wrap="hard"
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
                                </label>{validation ? <div className="text-red-600 text-xs">*Complete your data!</div> : null}
                                <button className={` ${validation ? 'bg-red-600' : 'bg-black border-primary hover:text-primary border-2 hover:bg-white'} bg-black text-white text-center py-4 rounded-md my-2 self-end w-[25%] `} type="button" onClick={() => { setDisclaimerOpen(true) }} >Submit</button>
                            </form>
                        </div>
                        <div className="lg:w-[50%] h-max p-5 flex flex-col">
                                <h1 className="font-bold text-[3rem] px-4 md:text-4xl self-start mb-4 mt-4">My Catalogue</h1>
                            <div className="max-w-full h-full p-4" style={{ borderRadius: "10px", background: "#FAFAFA", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset" }}>
                                <div className="h-[80vh]  overflow-auto">
                                    {data.length > 0 ? (
                                        data.map((katalog, index) => (
                                            <div key={index} className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                                <div className="lg:flex flex-row">
                                                    <div className="line-clamp-1 mx-2 font-semibold"> {katalog.title}</div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className={`lg:p-3 p-1 rounded-full line-clamp-1 mx-3 border-2 ${katalog?.approval ? 'bg-green-200 border-green-600' : 'bg-red-200 border-red-600'}`}>
                                                        <p className="text-center">
                                                            {katalog?.approval ? 'approved' : 'not approved'}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <BsEye
                                                            size={30}
                                                            title="view"
                                                            className="mx-1 p-1 bg-primary text-white rounded-md hover:text-primary border-2 border-primary hover:bg-white"
                                                            onClick={() => handleViewKatalog(katalog)}
                                                        />
                                                        <AiOutlineDelete
                                                            size={30}
                                                            title="delete"
                                                            className="mx-1 p-1 border-2 border-red-600 text-white bg-red-600 hover:text-red-400 rounded-md hover:bg-white"
                                                            onClick={() => handleOpenDeleteModal(katalog)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="m-5 text-red-600">*No products have been added yet.</p>
                                    )}
                                    <Modal
                                        isOpen={isPreviewModalOpen}
                                        onClose={() => setPreviewModalOpen(false)}
                                        title={previewedKatalog.jobTitle}
                                        content={
                                            <div className="max-h-[80vh] overflow-y-auto">
                                                <div
                                                    className={`border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2 ${previewedKatalog.approval ? 'bg-green-300 border-green-600' : 'bg-red-300 border-red-600'
                                                        }`}
                                                >
                                                    Approval:
                                                    {previewedKatalog.approval ? (
                                                        <p>Your data is approved</p>
                                                    ) : (
                                                        <p>Your data isn't approved yet</p>
                                                    )}
                                                </div>
                                                <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                                    Product Name :
                                                    <div>{previewedKatalog.title}</div>
                                                </div>
                                                <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                                    <img src={previewedKatalog.image} alt="CV Preview" className="max-h-[80vh] max-w-[80vw]" />
                                                </div>
                                                <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                                    Price :
                                                    <div>{previewedKatalog.price}</div>
                                                </div>
                                                <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                                    Details :
                                                    <div className="whitespace-pre-wrap">{
                                                        previewedKatalog.details
                                                    }</div>
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

                                    <Modal
                                        isOpen={isDeleteModalOpen}
                                        onClose={() => setDeleteModalOpen(false)}
                                        title="Confirm Deletion"
                                        content={
                                            <div>
                                                <p>Are you sure you want to delete this product?</p>
                                                <button
                                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:text-red-600 border-2 border-red-600 hover:bg-white mx-2"
                                                    onClick={() => handleDeleteKatalog(previewedKatalog)}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white mx-2"
                                                    onClick={() => setDeleteModalOpen(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        }
                                    />
                                    <DisclaimerModal
                                        isOpen={disclaimerOpen}
                                        setIsOpenClose={setDisclaimerOpen}
                                        handlesubmit={handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
