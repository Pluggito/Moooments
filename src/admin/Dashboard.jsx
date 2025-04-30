import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";
import PageLoader from "../components/PageLoader";

const Dashboard = ({ loading, setLoading }) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { getAlbum, deleteAlbum } = useContext(EventContext);
  const [savedEvents, setSavedEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const events = (await getAlbum()) || [];
      if (events.length > 0) {
        const sortedEvents = [...events].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setSavedEvents(sortedEvents);
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this album?");
    if (!confirmDelete) return;
  
    await deleteAlbum(id);
    fetchEvents();
  };
  

  return (
    <div className="min-h-screen flex flex-1">
      {loading && <PageLoader />}
      <div className="hidden lg:block w-20 xl:w-32 bg-gradient-to-br from-[#c300f9]/10 to-transparent">
        <div className="h-full w-full pattern-grid-lg opacity-20" />
      </div>
      <div className="flex-1 p-4 sm:p-6 lg:p-6 xl:p-8 bg-white text-black">
        <div className="max-w-5xl mx-auto">
          <div className="lg:w-[500px] xl:w-[570px]">
            <div className="bg-black text-white p-3 flex items-center gap-3 rounded-t-lg">
              <Image className="w-6 h-6" />
              <h1 className="text-xl font-semibold">Event Album</h1>
            </div>
          </div>
          <div className="flex flex-col lg:flex-col xl:flex-row justify-between items-start gap-4 xl:gap-6">
            <div className="w-full lg:w-[500px] xl:w-[570px] drop-shadow-md rounded-b-lg">
              <div className="w-full">
                <div className="grid grid-cols-2 border-b border-dotted border-[#c300f9]/30">
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`py-2 lg:py-3 text-sm sm:text-base transition-colors ${
                      activeTab === "upcoming"
                        ? "border-b-2 border-[#c300f9] font-medium"
                        : ""
                    }`}
                  >
                    Upcoming Event
                  </button>
                  <button
                    onClick={() => setActiveTab("published")}
                    className={`py-2 lg:py-3 text-sm sm:text-base transition-colors ${
                      activeTab === "published"
                        ? "border-b-2 border-[#c300f9] font-medium"
                        : ""
                    }`}
                  >
                    Published Event
                  </button>
                </div>
                <div className="p-3 lg:p-4 space-y-4">
                  {activeTab === "upcoming" &&
                    (savedEvents.length > 0 ? (
                      savedEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          id={event.id}
                          title={event.title}
                          description={event.description}
                          albumId={event.albumId}
                          image={event.album_picture}
                          navigate={navigate}
                          handleDeleteEvent={handleDeleteEvent}
                        />
                      ))
                    ) : (
                      <p>No Event created</p>
                    ))}
                  {activeTab === "published" &&
                    (savedEvents.length > 0 ? (
                      savedEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          id={event.id}
                          title={event.title}
                          image={event.album_picture}
                          description={event.description}
                          navigate={navigate}
                          activeTab={activeTab}
                          albumId={event.albumId}
                        />
                      ))
                    ) : (
                      <p>No Event created</p>
                    ))}
                </div>
              </div>
            </div>
            <div className="lg:static fixed bottom-0 left-0 right-0 p-4 bg-white lg:p-0 lg:bg-transparent z-10">
              <button
                onClick={() => navigate("/create-album")}
                className="w-full lg:w-auto border-3 border-[#030f0f] bg-white text-[#030f0f] hover:bg-[#030f0f] hover:text-white transition-colors px-4 lg:px-6 py-3 rounded-lg font-bold shadow-lg lg:shadow-none cursor-pointer"
              >
                Create New Event Album
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({
  id,
  image,
  title,
  description,
  navigate,
  handleDeleteEvent,
  activeTab,
  albumId,
}) => {
  return (
    <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/3">
        <img
          src={image || "/placeholder.jpg"}
          alt={title}
          loading="lazy"
          className="rounded-lg w-full h-[160px] sm:h-[120px] object-cover aspect-1/1"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-lg mb-2">
            {title || "Catalyst Book Club"}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {description || "Where stories spark change..."}
          </p>
        </div>
        {activeTab === "published" ? (
          <>
            <button
              className="self-start bg-[#c300f9] hover:bg-[#a000c7] text-white font-bold rounded-md px-3 py-2 transition-colors cursor-pointer"
              onClick={() => navigate(`/album/${albumId}`)}
            >
              View Album
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4 font-bold">
            <button
              className="self-start bg-[#c300f9] hover:bg-[#a000c7] text-white rounded-md px-3 py-2 transition-colors cursor-pointer"
              onClick={() => navigate(`/add-to-album/${albumId}`)}
            >
              Add Photos
            </button>
            <button
              onClick={() => handleDeleteEvent(id)}
              className="w-[150px] h-[40px] cursor-pointer flex items-center bg-black border-none rounded-md shadow-[1px_1px_3px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-gray-700 focus:outline-none group relative"
            >
              <span className="transform translate-x-[35px] text-white font-bold transition-all duration-200 group-hover:text-transparent">
                Delete
              </span>
              <span className="absolute border-l border-white transform translate-x-[110px] h-[40px] w-[40px] flex items-center justify-center transition-all duration-200 group-hover:w-[150px] group-hover:border-l-0 group-hover:translate-x-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  className="fill-[#eee] transition-transform duration-200 group-active:scale-80"
                >
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  navigate: PropTypes.func.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
};

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Dashboard;
