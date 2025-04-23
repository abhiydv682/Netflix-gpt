import React from 'react'
import { PlayIcon } from "lucide-react";

const VideoTitle = ({ title, overview }) => {


  return (
     //here we  do extra changes
    <div className=' w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black -mt-24'>   
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className=' py-6 text-lg w-1/4'>{overview}</p>
      <div className='flex'>
        {/* <button className='bg-white text-black p-4 px-12 text-xl  rounded-lg mx-2 cursor-pointer hover:bg-white/80 '>Play</button> */}
        <button className="bg-white text-black p-4 px-12 text-xl rounded-lg mx-2 cursor-pointer hover:bg-white/80 flex items-center gap-2">
          <PlayIcon className="w-6 h-6" />
          <span>Play</span>
        </button>
        <button className='bg-neutral-600/60 text-white p-4 px-12 text-xl rounded-lg cursor-pointer hover:text-white/80 ' >More Info</button>

      </div>
    </div>
  )
}

export default VideoTitle;