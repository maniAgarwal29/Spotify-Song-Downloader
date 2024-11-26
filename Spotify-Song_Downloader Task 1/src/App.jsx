import { SlSocialSpotify } from "react-icons/sl";
import axios from "axios"
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

function App() {
  const [URL, setURL] = useState("")
  const [loading, setLoading] = useState(false);
  const [songName, setSongName] = useState("");

  const handleURL = (e) => {
    e.preventDefault()
    setURL(e.target.value)
  }

  console.log(URL)

  const downloadSong = async () => {
    setLoading(true);
    setSongName("");
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: {
        songId: `${URL}`
      },
      headers: {
        'x-rapidapi-key': '2fd11a857amshf6b5a747cb04647p10da87jsnab1af97b1e37',
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
      }
    };

    try {
      const rspn = await axios.request(options)
      window.location.href = rspn.data.data.downloadLink
      setSongName(rspn.data.data.title);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="h-screen w-screen bg-gradient-to-br from-black via-green-900 to-black flex items-center justify-center flex-col gap-y-8 p-5"
    >
      <div
        className="flex items-center justify-center gap-x-3 text-2xl font-extrabold text-white shadow-lg p-3 rounded-lg bg-opacity-80 bg-black"
      >
        <SlSocialSpotify size={60} className="text-green-400"/>
        <p>Song Downloader</p>
      </div>

      <div
        className="flex gap-x-3"
      >
        <input type="url" className="h-12 w-[450px] border-none outline-none px-5 rounded-lg shadow-md focus:ring-2 focus:ring-green-400"
          onChange={handleURL} value={URL}
        />
        <button className="bg-white h-12 px-4 rounded-lg font-bold hover:bg-black hover:text-white transition duration-300 ease-in-out shadow-md flex items-center justify-center"
          onClick={downloadSong}
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Download"}
        </button>
      </div>

      {songName && (
        <div className="text-white text-lg mt-4">
          {`Song "${songName}" downloaded successfully!`}
        </div>
      )}
    </div>
  )
}

export default App