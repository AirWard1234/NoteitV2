import React from 'react'
import "./File.css"

const File = () => {
  return (
    <div className="">
    <div className='container'>
        <div className='video-info'>
            <div className="video">
                {/* video here */}
            </div>
            <div className="transcript">
                {/* put the transcript here */}
            </div>
        </div>
        <div className='summary-section'>
            <div className="summary">
                <div className="label">
                    NOTES
                </div>
                {/* put the ai summary here */}
            </div>
        </div>
    </div>
    <div className="lower">
        <a href='/'><div className="back">BACK</div></a>
        <a href='/'><div className="flash">CARDS</div></a>
    </div>
    </div>

  )
}

export default File