"use client"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { useState } from "react";

export default function UserDashboard() {
    const [name, setName] = useState(""); // Add name state variable
    const [sex, setSex] = useState(""); // Add sex state variable
    const [education, setEducation] = useState(""); // Add education state variable
    const [age, setAge] = useState(""); // Add age state variable
    const [user, setUser] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [skills, setSkills] = useState("");
    const [tag, setTag] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [data, setData] = useState({ user: "loading...", jobTitle: "loading...", skills: "loading...", tag: "loading..." })

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert comma-separated skills to an array of strings
        const skillsArray = skills.split(",").map((skill) => skill.trim());

        // Create a form data object to send the data to the server
        const formData = new FormData();
        formData.append("tag", tag);
        formData.append("jobTitle", jobTitle);
        formData.append("skills", JSON.stringify(skillsArray));
        formData.append("name", name); // Add name to the form data
        formData.append("sex", sex); // Add sex to the form data
        formData.append("education", education); // Add education to the form data
        formData.append("age", age); // Add age to the form data
        formData.append("image", imageFile);

        try {
            // Access the BLOB data of the image
            const imageBlob = new Blob([imageFile], { type: imageFile.type });

            // Convert the image data to a Base64-encoded string
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                // Log the Base64-encoded image data to the console
                console.log("Image Base64:", base64Image);

                // Add the Base64 image to the form data
                formData.append("base64Image", base64Image);

                // Replace "YOUR_SERVER_ENDPOINT" with the actual server endpoint to handle the seeker data
                console.log("user:", user, " jobtitle:", jobTitle, " skills:", skills, " image", imageFile);

                // Show success message or perform other actions on successful submission
                console.log("Seeker data submitted successfully!");
            };
            reader.readAsDataURL(imageBlob);
        } catch (error) {
            // Handle errors (e.g., show error messages)
            console.error("Error submitting seeker data:", error);
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
                            <input className="w-[50%] p-1" type="file" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <label className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                            Industry tag:
                            <select
                                className="border-2 border-black w-[50%] p-1 rounded-lg"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
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
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            >
                                <option value="" disabled>Select a Tag</option>
                                {tagTitle.map((tagOption) => (
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