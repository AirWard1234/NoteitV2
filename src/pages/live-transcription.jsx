import React, { useState, useEffect } from 'react'
import File from "../components/File/File";

 const LiveTranscription = () => {
  const [file, setFile] = useState("");
  useEffect(() => {
    setFile(localStorage.getItem('file'));
  }, [])
  return (
    <>
      <File />
      {/* {file}
      {} */}
    </>
  )
}
 export default LiveTranscription
