"use client"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import BlurredOnLoad from "@/app/loading";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { convertImageToBase64 } from "../../../../../helper/convertImage";
import Modal from "@/app/components/modal";
import DisclaimerModal from "../../components/DisclaimerModal";
import { downloadImage, downloadPDf, parseBlobToURL } from "../../../../../helper/imageDownloader";
import { isImage } from "../../../../../helper/typeChecker";

export default function UserDashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [disclaimerOpen, setDisclaimerOpen] = useState(false)
    const [dataToFetch, setDataToFetch] = useState(null)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const { data: session, status } = useSession();
    const [data, setData] = useState({ user: "loading...", jobTitle: "loading...", skills: "loading...", name: "loading...", notes: "loading...", })
    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            fetch(`/api/user/seeker/${session.user.email}`)
                .then(response => {
                    if (!response.ok) {
                        toast(`${error}`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data.seekers[0])
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

        if (data?._id) {
            fetch(`/api/seeker/${data._id}`, {
                method: 'PUT',
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
                    toast('Updated data', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                    return response.json();
                })
                .then(data => {
                    setData(data);
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            return
        }
        fetch('/api/seeker', {
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
                toast('Uploaded data', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                return response.json();
            })
            .then(data => {
                setData(data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [dataToFetch]);

    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [education, setEducation] = useState("");
    const [age, setAge] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [skills, setSkills] = useState("");
    const [industrytag, setIndustryTag] = useState("");
    const [titletag, setTitleTag] = useState("");
    const [validation, setValidation] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [PDFData, setPDFData] = useState("")
    const [imageData, setImageData] = useState("")

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
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

    const tagSex = [
        "Male",
        "Female"
    ];

    const tagTitle = [
        "Staff",
        "Supervisor",
        "Manager",
        "General Manager",
        "Director",
    ];

    const handleDeleteJobSeeker = (seeker) => {
        try {
            fetch(`/api/seeker/${seeker._id}`, {
                method: 'DELETE'
            })
        } catch (error) {
            toast(`${error}`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
            throw Error(error)

        }
        toast('Deleted data', { hideProgressBar: true, autoClose: 2000, type: 'success' })
        window.location.reload();
    };
    const handlePDFFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64PDF = e.target.result;
                setPDFData(base64PDF);
            };
            reader.readAsDataURL(file);
        }
    }
    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = e.target.result;
                setImageData(image);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = () => {
        if (!jobTitle || !name || !sex || !education || !PDFData || !age || !skills || !industrytag || !titletag) {
            setValidation(true)
            setDisclaimerOpen(false)
            return;
        }
        console.log(imageData)
        console.log(PDFData)

        //Convert the uploaded image to base64
        const fileInput = document.querySelector('input[type="file"]');
        convertImageToBase64(fileInput, (base64Image) => {
            const formData = {
                user: session.user.email,
                jobTitle: jobTitle,
                name: name,
                sex: sex,
                education: education,
                age: age,
                skills: skills,
                tag: [industrytag, titletag],
                headshot: imageData,
                image: PDFData,
                approval: false
            };
            setDataToFetch(formData)
        })
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
                        <div className="lg:w-[50%] ">
                            <form onSubmit={() => { setDisclaimerOpen(true) }} className="bg-tertiary lg:w-full p-5 flex flex-col ">
                                <h1 className="font-bold text-[3rem] px-4 self-center">Upload your CV here!</h1>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2 ">
                                    Job Title:
                                    <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                                </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Name:
                                    <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Sex:
                                    <select
                                        className="border-2 border-black w-[50%] p-1 rounded-lg"
                                        value={sex}
                                        onChange={(e) => { setSex(e.target.value) }}
                                    >
                                        <option value="" disabled>Select a Tag</option>
                                        {tagSex.map((tagOption) => (
                                            <option key={tagOption} value={tagOption}>
                                                {tagOption}
                                            </option>
                                        ))}
                                    </select>                        </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Education:
                                    <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={education} onChange={(e) => setEducation(e.target.value)} />
                                </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Age:
                                    <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                                </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Skills (comma-separated):
                                    <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
                                </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Upload CV(*.pdf):
                                    <input onChange={handlePDFFileChange} className="w-[50%] p-1" type="file" accept="application/pdf" />
                                </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Upload Photo(.jpg, .jpeg, .png):
                                    <input onChange={handleImageFileChange} className="w-[50%] p-1" type="file" accept="image/*" />
                                </label>
                                <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                    Industry tag:
                                    <select
                                        className="border-2 border-black w-[50%] p-1 rounded-lg"
                                        value={industrytag}
                                        onChange={(e) => { setIndustryTag(e.target.value) }}
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
                                </label>
                                {validation ? <div className="text-red-600 text-xs">*Complete your data!</div> : null}
                                <button className={` ${validation ? 'bg-red-600' : 'bg-black border-primary hover:text-primary border-2 hover:bg-white'} bg-black text-white text-center py-4 rounded-md my-2 self-end w-[25%] `} type="button" onClick={() => { setDisclaimerOpen(true) }}>Submit</button>
                            </form>
                        </div>
                        <div className="lg:w-[50%] h-max p-5 flex flex-col">
                            <div className="max-w-full h-full p-4" style={{ borderRadius: '10px', background: '#FAFAFA', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset' }}>
                                <div className="h-full">
                                    <h1 className="font-bold text-[3rem] px-4 self-center">Preview Your CV</h1>
                                    <div className={`p-4 border ${data?.approval ? 'bg-green-200' : 'bg-red-200'}`}>
                                        <p className="text-center">
                                            {data?.approval ? 'This CV is approved!' : 'This CV is not yet approved.'}
                                        </p>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Name :
                                        <div className="px-1 bg-white rounded-lg border-2">{(data?.name) ? data.name : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Age :
                                        <div className="px-1 bg-white rounded-lg border-2">{(data?.age) ? data.age : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Job Title :
                                        <div className="px-1 bg-white rounded-lg border-2">{(data?.jobTitle) ? data.jobTitle : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Education :
                                        <div className="px-1 bg-white rounded-lg border-2">{(data?.education) ? data.education : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Skills :
                                        <div className="px-1 bg-white rounded-lg border-2">{(data?.skills) ? data.skills : null}</div>

                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        CV :
                                        <div>
                                            {/* Display a preview of the uploaded image if available */}
                                        </div>
                                        {(data?.image) ?
                                            (isImage(data.image) ?
                                                <button
                                                    onClick={() => setIsModalOpen(true)}
                                                    className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary sNover:px-1 hover:bg-white">
                                                    View
                                                </button>
                                                :
                                                <button
                                                    onClick={() => {
                                                        downloadPDf(data.image, data.name);
                                                    }}
                                                    className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary sNover:px-1 hover:bg-white">
                                                    View
                                                </button>
                                            ) : null}
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Industrial Tag :
                                        <div className="px-1 bg-white rounded-lg border-2">{(data?.tag) ? data.tag[0] : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Title Tag :
                                        <div className="px-1 bg-white rounded-lg border-2">{(data?.tag) ? data.tag[1] : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Sex :
                                        <div className="px-1 bg-white rounded-lg border-2">{(data?.sex) ? data.sex : null}</div>
                                    </div>
                                    <button
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:text-red-600 border-2 border-red-600 hover:bg-white"
                                        onClick={() => handleOpenDeleteModal(data?._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isModalOpen ? "visible" : "invisible"
                            }`}
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <button
                                className="absolute bg-white text-primary px-2 py-2 rounded-full hover:bg-primary hover:text-white"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <FaTimes size={18} />
                            </button>
                            <img src={data?.image} alt="CV Preview" className="max-h-[80vh] max-w-[80vw]" />
                        </div>
                    </div>
                    <Modal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        title="Confirm Deletion"
                        content={
                            <div>
                                <p>Are you sure you want to delete this job seeker?</p>
                                <button
                                    className="mx-2 bg-red-600 text-white px-4 py-2 rounded-md hover:text-red-600 border-2 border-red-600 hover:bg-white"
                                    onClick={() => handleDeleteJobSeeker(data)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="mx-2 bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white"
                                    onClick={() => setDeleteModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        }
                    />
                </div>
            )}
            <DisclaimerModal
                isOpen={disclaimerOpen}
                setIsOpenClose={setDisclaimerOpen}
                handlesubmit={handleSubmit} />
        </>
    )
}