"use client"
import React, { useState } from "react";

const SeekerForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated skills to an array of strings
    const skillsArray = skills.split(",").map((skill) => skill.trim());

    // Create a form data object to send the data to the server
    const formData = new FormData();
    formData.append("email", email);
    formData.append("jobTitle", jobTitle);
    formData.append("skills", JSON.stringify(skillsArray));
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
        console.log("email:", email, " jobtitle:", jobTitle, " skills:", skills, " image", imageFile);

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
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Job Title:
        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Skills (comma-separated):
        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
      </label>
      <br />
      <label>
        Upload Image:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SeekerForm;
