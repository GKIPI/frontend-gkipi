"use client"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function UserDashboard() {
    const [dataToFetch, setDataToFetch] = useState(null)
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            console.log(`/api/user/seeker/${session.user.email}`);
            fetch(`/api/user/seeker/${session.user.email}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('API response:', data);
                    setData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [session, status]);

    useEffect(() => {
        if (!dataToFetch) return;

        // Make the API call using Fetch API
        fetch('/api/seeker', {
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
                console.log('API response:', data);
                setData(data);
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
    const [data, setData] = useState({ user: "loading...", jobTitle: "loading...", skills: "loading...", tag: "loading..." })
    const [validation, setValidation] = useState(false)

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
                };
                setDataToFetch(formData);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    };

    return (

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
                            <input className="border-2 border-black w-[50%] p-1 rounded-lg" type="text" value={sex} onChange={(e) => setSex(e.target.value)} />
                        </label>
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
                        <div className="h-[80vh]">
                            <h1 className="font-bold text-[3rem] px-4 self-center">Preview Your CV</h1>
                            <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                Job Title :
                                <div>{data.jobTitle}</div>
                            </div>
                            <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                Skills :
                                <div>{data.skills}</div>

                            </div>
                            <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                CV :
                                <div>
                                    {/* Display a preview of the uploaded image if available */}
                                </div>
                                <button
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white">
                                    View
                                </button>
                            </div>
                            <div className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg">
                                Tag :
                                <div>{data.tag}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}