import { useState } from "react"

function App() {

  const [img,setImg] = useState({})

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
      console.log(json.items[0].snippet.thumbnails);
      setImg(json.items[0].snippet.thumbnails.high)

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-2">Hello World</h1> 
        <button className="border px-2 py-1 border-black" onClick={handleClick}>Click me</button>
        {img ? 
          <img src={img.url} width={img.width} height={img.height} alt="" />
        : <></>}
      </div>
    </>
  )
}

export default App
