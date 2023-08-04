"use client"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { useState } from "react";

export default function UserDashboard() {
    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");
    const [prize, setPrize] = useState("");
    const [tag, setTag] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [contact, setContact] = useState("");
    const [details, setDetails] = useState("");

    const dummyKatalog = [
        {
            title: "Sample Product 1",
            prize: "1000",
            tag: "Beauty & Health",
            image: "",
        },
        {
            title: "Sample Product 2",
            prize: "500",
            tag: "Electronics",
            image: "",
        },
        {
            title: "Sample Product 3",
            prize: "200",
            tag: "Food & Beverage",
            image: "",
        },
    ];
    const [katalog, setKatalog] = useState(dummyKatalog);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a form data object to send the data to the server
        const formData = new FormData();
        formData.append("tag", tag);
        formData.append("title", title);
        formData.append("prize", prize);
        formData.append("contact", contact); 
        formData.append("details", details); 
        formData.append("image", imageFile);

        try {
            // Access the BLOB data of the image
            const imageBlob = new Blob([imageFile], { type: imageFile.type });

            // Add the current katalog data to the list of job vacancies
            setJobVacancies((prevKatalog) => [
                ...prevKatalog,
                {
                    title,
                    prize,
                    tag,
                    image: base64Image,
                    contact,
                    details
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
    const handleDeleteKatalog = (index) => {
        const updatedKatalog = [...katalog];
        updatedKatalog.splice(index, 1);
        setKatalog(updatedKatalog);
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
                            Prize:
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
                                onChange={(e) => setUser(e.target.value)}
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
                            {katalog.length > 0 ? (
                                katalog.map((katalog, index) => (
                                    <div key={index} className="border-2 p-3 w-full border-black flex flex-row justify-between text-lg items-center rounded-lg my-2">
                                        <div>
                                            Title :
                                            <div>{katalog.title}</div>
                                        </div>
                                        <div>
                                            <button
                                                className="bg-primary text-white px-4 py-2 rounded-md hover:text-primary border-2 border-primary hover:bg-white"
                                                onClick={() => handleViewKatalog(index)}
                                            >
                                                View
                                            </button>{" "}
                                            <button
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:text-red-600 border-2 border-red-600 hover:bg-white"
                                                onClick={() => handleDeleteKatalog(index)}
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
