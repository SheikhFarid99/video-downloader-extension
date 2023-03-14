import React, { useState } from 'react'
import BounceLoader from 'react-spinners/BounceLoader'
import axios from 'axios'
const Download = () => {
    const [link, setLink] = useState('')
    const [videoInfo, setVideoInfo] = useState('')
    const [resu, setResu] = useState('')
    const [loader, setLoader] = useState(false)

    const get_video_details = async (e) => {
        e.preventDefault()

        const videoId = link.split('https://youtu.be/')[1]
        try {
            setLoader(true)
            const { data } = await axios.get(`http://localhost:5000/api/get-video-info/${videoId}`)
            setLoader(false)
            setVideoInfo(data.videoInfo)
            setResu(data.videoInfo.lastResu)
        } catch (error) {
            console.log(error.response)
        }
    }

    const video_download = () => {
        const videoId = link.split('https://youtu.be/')[1]
        const url = `http://localhost:5000/video-download?id=${videoId}&resu=${resu}`
        window.location.href = url
    }
    return (
        <div className='w-[600px] h-[500px] bg-slate-800 flex justify-start items-center flex-col p-4 border-orange-500 border-[8px] relative'>
            <h2 className='text-white text-4xl pb-6 pt-4'>Youtube Video Downloader</h2>
            <div className='mb-8'>
                <form onSubmit={get_video_details}>
                    <div className='w-[380px] flex h-[40px] relative px-3 rounded-md border-indigo-500 border overflow-hidden'>
                        <input onChange={(e) => setLink(e.target.value)} className='text-white outline-none w-full bg-transparent' type="text" placeholder='Input youtube video link here' required />
                        <button className='bg-indigo-500 absolute right-0 h-full px-5 text-white'>Click</button>
                    </div>
                </form>
            </div>
            <div>
                {
                    loader ? <div className='w-full py-5 text-center'>
                        <BounceLoader color='#fff' />
                    </div> : videoInfo && <div className='flex gap-3 px-4'>
                        <img className='max-w-[200px] rounded-md h-[150px]' src={videoInfo.thumbnailUrl} alt="" />
                        <div className='text-white flex gap-2 flex-col'>
                            <h3>{videoInfo.title.slice(0, 70)}</h3>
                            <span>Time : 33.43</span>
                            <div className='flex gap-3 mt-4'>
                                <select onChange={(e) => setResu(e.target.value)} className='px-3 py-2 outline-none bg-slate-800 border-indigo-500 border rounded-md' name="" id="">
                                    {
                                        videoInfo.videoResu.length > 0 && videoInfo.videoResu.map((v, i) => <option key={i} value={v}>{v}p</option>)
                                    }
                                </select>
                                <button onClick={video_download} className='px-3 py-2 bg-indigo-500 text-white rounded-md'>Download</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Download