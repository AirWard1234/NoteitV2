import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { assets } from "../../assets/assets";

const Main = () => {
  const [file, setFile] = useState(null); 
  const navigate = useNavigate(); // Initialize navigation

  // Effect hook to store the file in localStorage and navigate once the file is set
  useEffect(() => {
    if (file) {
      console.log(file);
      // Store file metadata (not actual file data) in localStorage
      localStorage.setItem("file", JSON.stringify({ name: file.name, type: file.type }));
      navigate("/live-transcription"); // Navigate to live-transcription page after file is selected
    }
  }, [file, navigate]); // Dependency on file

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile)
    setFile(selectedFile); // Update state with the selected file
    handleUpload(selectedFile); // Upload the file to backend
  };

  // Function to upload file to the backend
  const handleUpload = async (selectedFile) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile); // Append the selected file to FormData

    try {
      // Replace with your backend endpoint
      const response = await fetch("http://localhost:5000/uploadFile", {
        method: "POST",
        mode: "no-cors",
        body: formData, // Send the file to the server as form-data
      });

      const data = await response.json(); // Assuming the server responds with JSON
      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="main">
        <div className="nav">
            <div className="logo">Noteit</div>
            <div className="side">
            <div className="live">LIVE</div>
                <div className="profile">
                    <img src={assets.user_icon} />
                </div>
            </div>
        </div>
        <div className="content">
            {/* container that takes notes */}
            <div className="dropbox">
                <div className="dropbox-holder">
                    <div className="uploader">
                        <div className="uploader-content">
                            <img src={assets.file_icon}></img>
                            <h2>You Source It, We Noteit</h2>
                            <p>Drag or upload any file and we will do the dirty work</p>
                        </div>
                    </div>
                    <input onChange={handleFileChange} type='file' className='file-uploader' />
                </div>
            </div>

            {/* container that holds the note history */}
            <div className="history-container">
                <div className="history">
                    <div className="history-lable">
                        <div className="history-title">My Notes</div>
                        <div className="youtube">
                            <img src={assets.youtube_icon}></img>
                            <input type='text'></input>
                        </div>
                        <div className="all-notes">
                            View All
                            <img src={assets.send_icon}></img>
                        </div>
                    </div>
                    <div className="history-content">
                        <div className="catagory">
                            <div className="subject">AFM <img src={assets.money_icon}></img> </div>
                            <div className="note">02-21-2025</div>
                            <div className="note">02-19-2025</div>
                            <div className="note">02-11-2025</div>
                            <div className="note">02-02-2025</div>
                            <div className="note">01-13-2025</div>
                        </div>
                        <div className="catagory">
                            <div className="subject">ECON <img src={assets.sus_icon}></img> </div>
                            <div className="note">02-21-2025</div>
                            <div className="note">02-19-2025</div>
                            <div className="note">02-11-2025</div>
                            <div className="note">02-02-2025</div>
                            <div className="note">01-13-2025</div>
                        </div>
                        <div className="catagory">
                            <div className="subject">MSE <img src={assets.robot_icon}></img> </div>
                            <div className="note">02-21-2025</div>
                            <div className="note">02-19-2025</div>
                            <div className="note">02-11-2025</div>
                            <div className="note">02-02-2025</div>
                            <div className="note">01-13-2025</div>
                        </div>
                        <div className="catagory">
                            <div className="subject">MATH <img src={assets.brain_icon}></img> </div>
                            <div className="note">02-21-2025</div>
                            <div className="note">02-19-2025</div>
                            <div className="note">02-11-2025</div>
                            <div className="note">02-02-2025</div>
                            <div className="note">01-13-2025</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main
