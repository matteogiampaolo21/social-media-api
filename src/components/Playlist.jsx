import React from 'react'

function Playlist({title,thumbnail,playlistID}) {
  return (
    <div className='p-3 bg-white rounded-b-lg shadow h-full flex flex-col justify-between'>
      <div>
        <h1 className='text-2xl font-bold my-3'>{title}</h1>
        <a href={`https://www.youtube.com/playlist?list=${playlistID}`}>Link</a>
      </div>
      <img className='object-cover w-full' src={thumbnail.url} width={thumbnail.width} height={thumbnail.height} />
    </div>
  )
}

export default Playlist