import React, { useState, useEffect } from 'react'

 const LiveTranscription = () => {
  const [file, setFile] = useState("");
  useEffect(() => {
    setFile(localStorage.getItem('file'));
  }, [])
  return (
    <>
      LIVE TRANSCRIPTIONS
      <a href="/"> Back </a>
      {file}
      {}
    </>
  )
}
 export default LiveTranscription
