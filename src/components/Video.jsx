import React from 'react'

function Video({title,thumbnail,videoID}) {
  return (
    <div className='p-2 shadow-sm border-black border mb-10'>
        <h1 className='text-2xl font-bold my-3'>{title}</h1>
        <a href={`https://www.youtube.com/playlist?list=${videoID}`}>Link</a>
        <img className='object-cover w-full' src={thumbnail.url} width={thumbnail.width} height={thumbnail.height} />
    </div>
  )
}

export default Video