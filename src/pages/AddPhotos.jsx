import { ImageIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../context/EventContext";
import PageLoader from "../components/PageLoader";

const AddPhotos = ({ loading, setLoading }) => {
  const { getAlbum } = useContext(EventContext);
  const [latestAlbum, setLatestAlbum] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const events = await getAlbum();
      if (events.length > 0) {
        const sortedEvents = events.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setLatestAlbum(sortedEvents[0]); // Only store the latest album
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      {loading && <PageLoader />}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Image and Header */}
        <div className="relative">
          <div className="z-10 p-4 ">
            <h2 className="text-xl font-semibold text-purple-600">Share Your Memories</h2>
            <p className="text-gray-700">
              Contribute your photos to the event album and make the moments unforgettable.
            </p>
          </div>
          {latestAlbum ? (
            <div key={latestAlbum.id} className="relative rounded-lg overflow-hidden mt-16 md:mt-0 drop-shadow-lg">
              {latestAlbum.album_picture ? (
                <img src={latestAlbum.album_picture} alt="Latest Event" className="w-full object-cover aspect-4/3" />
              ) : (
                <p className="text-gray-500 text-center p-4">No Cover Image</p>
              )}
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-3 py-1 rounded-md text-sm">
                <span className="font-medium">{latestAlbum.photos?.length || 0}</span> photos
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No Event created</p>
          )}
        </div>

        {/* Right Column - Event Details and Upload */}
        <div className="space-y-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Catalyst Book Club</h1>

          <div className="bg-purple-600 text-white py-2 px-4 rounded-md">
            <h3 className="font-medium">About this Event</h3>
          </div>

          <p className="text-gray-700">
            Where stories spark change and ideas ignite growth. Join a community of passionate readers exploring books
            that inspire, challenge, and transform.
          </p>

          <div className="mt-8 space-y-2">
            <p className="font-medium">Upload Cover Image - Give your album a personal touch with a banner.</p>
            <p className="text-sm text-purple-600">*Images must be JPEG or PNG</p>

            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
              <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm">
                Drag an image here or <button className="text-purple-600 hover:underline">click to upload</button>
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <button className="w-full border-gray-300">Preview Photos</button>
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded cursor-pointer font-bold">Add photos to Album</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPhotos;
