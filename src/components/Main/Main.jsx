import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import "./Main.css";
import { assets } from "../../assets/assets";
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const [file, setFile] = useState(''); 
  const navigate = useNavigate(); // Initialize navigation

useEffect(() => {
    if (file) {
      console.log(file)
      console.log(JSON.stringify(file))
      localStorage.setItem('file', file.name); // Store file
      navigate("/live-transcription"); // Navigate after state updates
    }
  }, [file, navigate]); // Only runs when `file` changes

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Updates state (but doesn't navigate immediately)
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
