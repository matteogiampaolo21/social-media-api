import { useState } from "react"
import Video from "./components/Video";

function App() {

  const [img,setImg] = useState({});
  const [playlists, setPlaylists] = useState([])

  const handleClick = async () => {
    console.log("button clicked.")
    // const partParams = ["snippet","contentDetails","statistics"]
    // const url = `https://youtube.googleapis.com/youtube/v3/channels?part=${partParams.join("%2C")}&id=UCQ59QpOnFZ8byWmE8ayTtaw&key=${import.meta.env.VITE_key}`;

    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCfR8HhkbpDAwvYxrecNg4Mg&maxResults=25&key=${import.meta.env.VITE_key}`
    
    console.log(url)

    try{

      const response = await fetch(url);
      if (!response.ok){
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json();
      setPlaylists(json.items);
      console.log(json.items)
      // console.log(json.items.length)
      // console.log(json.items[0].snippet.thumbnails);
      // setImg(json.items[0].snippet.thumbnails.high)

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-2">Hello World</h1> 
        <button className="border px-2 py-1 border-black mb-5 bg-blue-300" onClick={handleClick}>Click me</button>

        {/* <Video imgSrc={"ef"}  /> */}
        {playlists.map(playlist => {
          console.log(playlist)
          return(
            <div key={playlist.id} className=" bg-white">
              <Video title={playlist.snippet.title} videoID={playlist.id} thumbnail={playlist.snippet.thumbnails.standard} />
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default App
