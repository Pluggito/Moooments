import { LucideArrowLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";
import PageLoader from "../components/PageLoader";

const Preview = () => {
    const navigate = useNavigate();
    const { getAlbum } = useContext(EventContext);
    const [savedEvents, setSavedEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEvents = async () => {
      setLoading(true);
      try {
          const events = await getAlbum();  
          
          if (events.length > 0) {
              const sortedEvents = events.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
              setSavedEvents([sortedEvents[0]]);
          }
      } catch (error) {
          console.error('Error fetching events:', error);
      } finally {
          setLoading(false);
      }
  };

   const handleNavigation = () => {
      setLoading(true)
      setTimeout(()=>
        {
          navigate('/nextphase')
          setLoading(false);
        }, 1500)
      navigate()
   }
  

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            {loading && <PageLoader />}
            <div className="space-y-6">
                <button
                    onClick={() => navigate('/create-album')}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <LucideArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>

                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-[#c300f9]">Share Your Memories</h1>
                    <p className="text-gray-600">
                        Contribute your photos to the event album and make the moments unforgettable.
                    </p>
                </div>

                <div className="rounded-lg overflow-hidden shadow-md flex-wrap md:flex-nowrap lg:flex w-full p-3 gap-3">
                    {savedEvents.length > 0 ? (
                        savedEvents.map((event, index) => (
                            <div key={index} className="relative aspect-[4/3] p-1 overflow-hidden sm:flex-3">
                                <img 
                                    src={event.album_picture}
                                    alt={event.title}
                                    className="w-full h-full object-center object-cover rounded-lg"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No events available.</p> // Handle empty state
                    )}

                    {savedEvents.length > 0 && (
                        <div className="p-6 flex-2 text-left">
                            <h2 className="text-2xl font-bold mb-4">{savedEvents[0].title}</h2>

                            <div className="space-y-4 mt-7">
                                <div>
                                    <h3 className="text-lg font-semibold bg-[#c300f9] text-white mb-2 p-2 rounded">
                                        About this Event
                                    </h3>
                                    <p className="text-gray-600 w-full">
                                        {savedEvents[0].description}
                                    </p>
                                </div>
                                
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>{savedEvents[0].event_type}</span>
                                    <span>{new Date(savedEvents[0].event_date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="px-6 pb-6 mt-7">
                                <button 
                                  onClick={handleNavigation}                                  
                                    className="w-full bg-black hover:bg-zinc-800 text-white py-3 rounded-lg border border-[#c300f9] shadow-[0_0_10px_rgba(168,85,247,0.15)]
                                    cursor-pointer transform transition-all duration-500 hover:scale-[1.05]"
                                >
                                    Upload Your Album
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Preview;
