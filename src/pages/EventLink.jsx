import { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";

const EventLink = ({ loading, setLoading }) => {
  const { getAlbumDetails } = useContext(EventContext);
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const extractUniqueId = (inputUrl) => {
    const match = inputUrl.match(/event-album-page\/([^\/]+)/) || inputUrl.match(/album\/([^\/]+)/);
    return match ? match[1] : null;
};


  const fetchEventsDetails = async () => {
    if (!url) {
      alert("Please enter an event link.");
      return;
    }

    const albumId = extractUniqueId(url);
    if (!albumId) {
      alert("Invalid event link format.");
      return;
    }

    setLoading(true);
    try {
      const retrievedAlbumData = await getAlbumDetails(albumId);
      if (retrievedAlbumData && albumId) {
        navigate(`/album/${albumId}`);
        console.log('On the page')
      } else {
        alert("Event album not found.");
      }
    } catch (error) {
      console.error("Error fetching event album:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center md:mx-auto lg:mx-auto max-w-xl py-38 lg:py-25 sm:h-full">
      {loading && <PageLoader />}
      <div className="flex flex-col justify-center items-center sm:h-[338px] h-[255px] mx-auto gap-5">
        <p className="text-3xl mb-2 font-semibold w-full text-center">
          Place Your Event Link Here!
        </p>
        <div className="flex flex-col justify-center items-center gap-4 px-3 py-20 w-3/4 bg-[#c300f9] rounded h-[50%]">
          <input
            type="text"
            className="w-full p-2 rounded-lg text-black hover:bg-slate-50 border border-gray-500 focus:outline-none bg-white"
            placeholder="Event Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={fetchEventsDetails}
            className="rounded sm:w-[101px] sm:h-[44px] w-1/2 font-bold hover:bg-gray-800 bg-black text-slate-100 hover:text-white transition-all duration-300 cursor-pointer shadow-md p-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventLink;
