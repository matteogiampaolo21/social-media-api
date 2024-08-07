import { useEffect, useState } from "react"
import Video from "./components/Video";

function App() {

  const [playlists, setPlaylists] = useState([]);
  const [response, setResponse] = useState({});
  const [pageToken, setToken] = useState("");

  const fetchData = async (token) => {
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
  
  useEffect(() => {
    fetchData(pageToken);
  },[pageToken])


  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-2">Hello World</h1> 

        <div className="grid grid-cols-5 gap-5">
          {playlists.map(playlist => {
            return(
              <div key={playlist.id} className=" bg-white">
                <Video title={playlist.snippet.title} videoID={playlist.id} thumbnail={playlist.snippet.thumbnails.standard} />
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
    </div>
  )
}

export default App
