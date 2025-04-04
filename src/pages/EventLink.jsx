import { useContext, useState } from "react"
import { EventContext } from "../context/EventContext"
import { useNavigate } from "react-router-dom"
import PageLoader from "../components/PageLoader"
import PropTypes from 'prop-types'

const EventLink = ({ loading, setLoading }) => {
  const { getAlbumDetails } = useContext(EventContext)
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  const extractUniqueId = (inputUrl) => {
    const match = inputUrl.match(/event-share-page\/([^/]+)/) || inputUrl.match(/album\/([^/]+)/)
    return match ? match[1] : null
  }

  const fetchEventsDetails = async () => {
    if (!url) {
      alert("Please enter an event link.")
      return
    }

    const albumId = extractUniqueId(url)
    if (!albumId) {
      alert("Invalid event link format.")
      return
    }

    setLoading(true)
    try {
      const retrievedAlbumData = await getAlbumDetails(albumId)
      if (retrievedAlbumData && albumId) {
        const path = url.includes("event-share-page") ? 
          `/add-to-album/${albumId}` : 
          `/album/${albumId}`;
        navigate(path);
      } else {
        alert("Event album not found.")
      }
    } catch (error) {
      //console.error("Error fetching event album:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-xl py-12 md:py-16 lg:py-20 px-4">
      {loading && <PageLoader />}
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Place Your Event Link Here!</h1>
          <p className="text-gray-500 dark:text-gray-400">Connect with your guests by sharing your event link</p>
        </div>

        {/* Card with gradient border */}
        <div className="w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-500 p-1 shadow-lg">
          <div className="p-6 bg-[#c300f9] rounded-lg">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span>Paste your event link below</span>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-3 h-12 text-base rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-gray-700 bg-slate-50 text-black dark:focus:border-purple-500"
                  placeholder="Event Link"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />

                <button
                  onClick={fetchEventsDetails}
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium h-12 rounded-md transition-colors duration-200 flex items-center justify-center"
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Access your event album and share memories with your guests
          </p>
        </div>
      </div>
    </div>
  )
}


EventLink.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default EventLink

