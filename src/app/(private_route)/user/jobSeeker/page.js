"use client"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import BlurredOnLoad from "@/app/loading";
import { toast } from "react-toastify";

export default function UserDashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [dataToFetch, setDataToFetch] = useState(null)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!jobTitle || !name || !sex || !education || !age || !skills || !industrytag || !titletag) {
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
                    name,
                    sex,
                    education,
                    age,
                    skills,
                    tag: [industrytag, titletag],
                    image: base64Image,
                    approval: false
                };
                setDataToFetch(formData);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
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
                            <form onSubmit={handleSubmit} className="bg-tertiary lg:w-full p-5 flex flex-col justify-center">
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
                                    Upload Image:
                                    <input className="w-[50%] p-1" type="file" accept="image/*" />
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
                                {validation ? <div className="text-red-600 text-xs">*Lengkapi data anda!</div> : null}
                                <button className={` ${validation ? 'bg-red-600' : 'bg-black border-primary hover:text-primary border-2 hover:bg-white'} bg-black text-white text-center py-4 rounded-md my-2 self-end w-[25%] `} type="submit" >Submit</button>
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
                                        <div>{(data?.name) ? data.name : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Age :
                                        <div>{(data?.age) ? data.age : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Job Title :
                                        <div>{(data?.jobTitle) ? data.jobTitle : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Education :
                                        <div>{(data?.education) ? data.education : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Skills :
                                        <div>{(data?.skills) ? data.skills : null}</div>

                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        CV :
                                        <div>
                                            {/* Display a preview of the uploaded image if available */}
                                        </div>
                                        {(data?.image) ?
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white">
                                                View
                                            </button>
                                            : null}
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Industrial Tag :
                                        <div>{(data?.tag) ? data.tag[0] : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Title Tag :
                                        <div>{(data?.tag) ? data.tag[1] : null}</div>
                                    </div>
                                    <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        Sex :
                                        <div>{(data?.sex) ? data.sex : null}</div>
                                    </div>
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
                            <img src={data?.image} alt="CV Preview" className="max-h-[80vh] max-w-[80vw]" />
                            <button
                                className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white mt-4"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}