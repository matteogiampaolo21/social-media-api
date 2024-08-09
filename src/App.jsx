import { useEffect, useState } from "react"
import Playlist from "./components/Playlist";

function App() {

  const [playlists, setPlaylists] = useState([]);
  const [videos, setVideos] = useState(null);
  const [response, setResponse] = useState({});
  const [pageToken, setToken] = useState("");

  const fetchPlaylists = async (token) => {
    console.log("button clicked.")
    // const partParams = ["snippet","contentDetails","statistics"]
    // const url = `https://youtube.googleapis.com/youtube/v3/channels?part=${partParams.join("%2C")}&id=UCQ59QpOnFZ8byWmE8ayTtaw&key=${import.meta.env.VITE_key}`;

    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCfR8HhkbpDAwvYxrecNg4Mg&pageToken=${token}&maxResults=10&key=${import.meta.env.VITE_key}`
    
    console.log(url)

    try{
      const response = await fetch(url);
      if (!response.ok){
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json();
      setResponse(json);
      setPlaylists(json.items);
      console.log("special",json)
      
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchVideos = async (playlistID) => {
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=10&playlistId=${playlistID}&key=${import.meta.env.VITE_key}`


    try{
      const response = await fetch(url);
      if (!response.ok){
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json();
      setVideos(json);
      console.log("special 2",json)
      
    } catch (error) {
      console.error(error.message)
    }
  }
  
  useEffect(() => {
    fetchPlaylists(pageToken);
  },[pageToken])


  return (
    <div>
      <div id="Playlists" className="p-5 mb-10">
        <h1 className="text-2xl font-bold mb-2">All Playlists</h1> 

        <div className="grid grid-cols-5 gap-5">
          {playlists.map(playlist => {
            return(
              <div key={playlist.id} className="h-full flex flex-col justify-between">
                <button onClick={() => {fetchVideos(playlist.id)}} className="bg-red-500 py-2 text-lg hover:bg-red-700 duration-150 text-white font-bold rounded-t-lg">See Playlist</button>
                <Playlist title={playlist.snippet.title} playlistID={playlist.id} thumbnail={playlist.snippet.thumbnails.standard} />
              </div>

            )
          })}
        </div>

        {response.items !== null ?
          <div className="flex flex-row gap-3 mt-5">
            <button onClick={() => {setToken(response.prevPageToken)}} className="disabled:bg-neutral-400 disabled:border-neutral-500 disabled:text-neutral-600 hover:bg-neutral-200 bg-white border-black border px-2 py-1" disabled={response.prevPageToken == null}>Previous</button>
            <button onClick={() => {setToken(response.nextPageToken)}} className="disabled:bg-neutral-400 disabled:border-neutral-500 disabled:text-neutral-600 hover:bg-neutral-200 bg-white border-black border px-2 py-1" disabled={response.nextPageToken == null}>Next</button>
          </div>
        :
          <></>
        }
      </div>

      <div id="Videos" className="p-5">
        <h1 className="text-2xl font-bold">Videos</h1>
        {videos !== null ?
          <div className="grid grid-cols-2 gap-5">
            {videos.items.map((video) => {
              return(
                <div key={video.id} className="border-black border p-3">
                  <img src={video.snippet.thumbnails.standard.url} alt="" />
                  <h1 className="text-lg"> {video.snippet.title} </h1>
                </div>
              )
            })}
          </div>
        :
          <></>
        }
      </div>
    </div>
  )
}

export default App
