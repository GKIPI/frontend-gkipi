"use client"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "../components/modal";
import { useRouter } from "next/navigation";
import BlurredOnLoad from "@/app/loading";


export default function UserDashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [dataToFetch, setDataToFetch] = useState(null)
    const [validation, setValidation] = useState(false)
    const { data: session, status } = useSession();
    const [data, setData] = useState({})
    const route = useRouter();
    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            fetch(`/api/user/vacancy/${session.user.email}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data.vacancies)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [session, status]);
    useEffect(() => {
        if (!dataToFetch) return;
        console.log(dataToFetch)

        fetch('/api/vacancy', {
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
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [industrytag, setIndustryTag] = useState("");
    const [titletag, setTitleTag] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [previewedVacancy, setPreviewedVacancy] = useState({});


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const tagIndustry = [
        "Industrial / Manufacturing",
        "Insurance",
        "FMCG",
        "Media & Agency",
        "Financial Service",
        "Property",
        "Retail"
    ];

    const tagTitle = [
        "Staff",
        "Supervisor",
        "Manager",
        "General Manager",
        "Director",
    ];

    const handleViewJobVacancy = (vacancy) => {
        setPreviewedVacancy(vacancy);
        setPreviewModalOpen(true);
    };

    const handleOpenDeleteModal = (vacancy) => {
        setPreviewedVacancy(vacancy);
        setDeleteModalOpen(true);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!jobTitle || !company || !notes || !industrytag || !titletag) {
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
                    jobTitle,
                    company,
                    location: jobLocation,
                    notes,
                    tag: [industrytag, titletag],
                    image: base64Image,
                };
                setDataToFetch(formData);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
        window.location.reload();
    };

    // Step 3: Create a function to handle deleting a specific job vacancy
    const handleDeleteJobVacancy = (vacancy) => {
        try {
            console.log(vacancy._id)
            fetch(`/api/vacancy/${vacancy._id}`, {
                method: 'DELETE'
            })
        } catch (error) {
            throw Error(error)

        }
        window.location.reload();
    };

    return (
        <>
        {isLoading ? (<BlurredOnLoad/>) : (
        <div className="min-h-screen min-w-screen">
            <div className="absolute h-[40px] w-[40px] rounded-full m-3 hover:bg-primary hover:text-white">
                <Link href={"/user"}>
                    <FiArrowLeft className="h-8 md:h-10 w-max" />
                </Link>
            </div>
            <div className="lg:flex w-screen min-h-screen">
                <div className="lg:w-[50%] h-screen">
                    <form onSubmit={handleSubmit} className="bg-tertiary lg:w-full h-screen p-5 flex flex-col justify-center">
                        <h1 className="font-bold text-[3rem] px-4 self-center">Lets make the world better!</h1>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Job Title:
                            <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Company:
                            <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Notes:
                            <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Job location:
                            <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Upload Image:
                            <input className="w-[50%] p-1" type="file" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Industry tag:
                            <select
                                className="border-2 border-black w-[50%] p-1 rounded-lg"
                                value={industrytag}
                                onChange={(e) => setIndustryTag(e.target.value)}
                            >
                                <option value="" disabled>Select a Tag</option>
                                {tagIndustry.map((tagOption) => (
                                    <option key={tagOption} value={tagOption}>
                                        {tagOption}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Title tag:
                            <select
                                className="border-2 border-black w-[50%] p-1 rounded-lg"
                                value={titletag}
                                onChange={(e) => setTitleTag(e.target.value)}
                            >
                                <option value="" disabled>Select a Tag</option>
                                {tagTitle.map((tagOption) => (
                                    <option key={tagOption} value={tagOption}>
                                        {tagOption}
                                    </option>
                                ))}
                            </select>
                        </label>{validation ? <div className="text-red-600 text-xs">*Lengkapi data anda!</div> : null}
                        <button className={` ${validation ? 'bg-red-600' : 'bg-black border-primary hover:text-primary border-2 hover:bg-white'} bg-black text-white text-center py-4 rounded-md my-2 self-end w-[25%] `} type="submit" >Submit</button>
                    </form>
                </div>
                <div className="lg:w-[50%] h-max p-5 flex flex-col">
                    <div className="max-w-full h-full p-4" style={{ borderRadius: "10px", background: "#FAFAFA", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset" }}>
                        <div className="h-[80vh]">
                            <h1 className="font-bold text-[3rem] px-4 self-center">Preview</h1>
                            {data.length > 0 ? (
                                data.map((jobVacancy, index) => (
                                    <div key={index} className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        <div>
                                            Job Title :
                                            <div>{jobVacancy.jobTitle}</div>
                                        </div>
                                        <div>
                                            <button
                                                className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white"
                                                onClick={() => handleViewJobVacancy(jobVacancy)}
                                            >
                                                View
                                            </button>{" "}
                                            <button
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:text-red-600 border-2 border-red-600 hover:bg-white"
                                                onClick={() => handleOpenDeleteModal(jobVacancy)}
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
                                title={previewedVacancy.jobTitle}
                                content={
                                    <div className="max-h-[80vh] overflow-y-auto">
                                        <div
                                            className={`border-2 p-3 w-full  flex flex-row justify-between text-lg items-center rounded-lg my-2 ${previewedVacancy.approval ? 'bg-green-300 border-green-600' : 'bg-red-300 border-red-600'
                                                }`}
                                        >
                                            Approval:
                                            {previewedVacancy.approval ? (
                                                <p>Your data is approved</p>
                                            ) : (
                                                <p>Your data isn't approved yet</p>
                                            )}
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Job Title :
                                            <div>{previewedVacancy.jobTitle}</div>
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            <img src={previewedVacancy.image} alt="CV Preview" className="max-h-[80vh] max-w-[80vw]" />
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Job location :
                                            <div>{previewedVacancy.location}</div>
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Company :
                                            <div>{previewedVacancy.company}</div>
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Industrial Tag :
                                            <div>{(previewedVacancy.tag) ? previewedVacancy.tag[0] : null}</div>
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Title Tag :
                                            <div>{(previewedVacancy.tag) ? previewedVacancy.tag[1] : null}</div>
                                        </div>
                                        <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                            Notes :
                                            <p>{previewedVacancy.notes}</p>
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
                                            onClick={() => handleDeleteJobVacancy(previewedVacancy)}
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
                            <Modal
                                isOpen={isDeleteModalOpen}
                                onClose={() => setDeleteModalOpen(false)}
                                title="Confirm Deletion"
                                content={
                                    <div>
                                        <p>Are you sure you want to delete this job vacancy?</p>
                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:text-red-600 border-2 border-red-600 hover:bg-white mx-2"
                                            onClick={() => handleDeleteKatalog(previewedVacancy)}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    );
}
