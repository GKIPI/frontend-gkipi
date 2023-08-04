"use client"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { useState } from "react";

export default function UserDashboard() {
    const [email, setEmail] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [data, setData] = useState({ email: "loading...", jobTitle: "loading...", company: "loading...", tag: "loading...", jobLocation: "loading..." })
    const dummyJobVacancies = [
        {
          jobTitle: "Software Engineer",
          company: "TechCo",
          jobLocation: "New York, USA",
          tag: "Software Development",
          base64Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
        },
        {
          jobTitle: "Marketing Manager",
          company: "Globex",
          jobLocation: "London, UK",
          tag: "Marketing",
          base64Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA",
        },
        {
          jobTitle: "Accountant",
          company: "Numbers Inc.",
          jobLocation: "Sydney, Australia",
          tag: "Finance",
          base64Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABs",
        },
      ];
      
    const [jobVacancies, setJobVacancies] = useState(dummyJobVacancies);

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

        // Create a form data object to send the data to the server
        const formData = new FormData();
        formData.append("tag", tag);
        formData.append("jobTitle", jobTitle);
        formData.append("company", company);
        formData.append("location", jobLocation);
        formData.append("image", imageFile);

        try {
            // Access the BLOB data of the image
            const imageBlob = new Blob([imageFile], { type: imageFile.type });

            // Add the current job vacancy data to the list of job vacancies
            setJobVacancies((prevJobVacancies) => [
                ...prevJobVacancies,
                {
                    jobTitle,
                    company,
                    jobLocation,
                    tag,
                    base64Image,
                },
            ]);
            // Convert the image data to a Base64-encoded string
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                // Log the Base64-encoded image data to the console
                console.log("Image Base64:", base64Image);

                // Add the Base64 image to the form data
                formData.append("base64Image", base64Image);
                // Show success message or perform other actions on successful submission
                console.log("Seeker data submitted successfully!");
            };
            reader.readAsDataURL(imageBlob);
        } catch (error) {
            // Handle errors (e.g., show error messages)
            console.error("Error submitting seeker data:", error);
        }
    };

    // Step 3: Create a function to handle deleting a specific job vacancy
    const handleDeleteJobVacancy = (index) => {
        const updatedJobVacancies = [...jobVacancies];
        updatedJobVacancies.splice(index, 1);
        setJobVacancies(updatedJobVacancies);
    };

    return (
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                    <div className="max-w-full h-full p-4" style={{ borderRadius: "10px", background: "#FAFAFA", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset" }}>
                        <div className="h-[80vh]">
                            <h1 className="font-bold text-[3rem] px-4 self-center">Preview</h1>
                            {jobVacancies.length > 0 ? (
                                jobVacancies.map((jobVacancy, index) => (
                                    <div key={index} className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        <div>
                                        Job Title :
                                        <div>{jobVacancy.jobTitle}</div>
                                        </div>
                                        <div>
                                        <button
                                            className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white"
                                            onClick={() => handleViewJobVacancy(index)}
                                        >
                                            View
                                        </button>{" "}
                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:text-red-600 border-2 border-red-600 hover:bg-white"
                                            onClick={() => handleDeleteJobVacancy(index)}
                                        >
                                            Delete
                                        </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="m-5 text-red-600">*No job vacancies added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>

            );
}
