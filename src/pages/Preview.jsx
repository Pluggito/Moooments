import { LucideArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Preview = () => {
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    try {
      const events = JSON.parse(localStorage.getItem('events') || '[]');
      // Get the most recently created event
      const latestEvent = events[events.length - 1];
      setPreview(latestEvent ? [latestEvent] : []);
    } catch (error) {
      console.error('Error loading event:', error);
    }
  }, []);

  const Navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="space-y-6">
        <NavLink
          to="/create-album"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <LucideArrowLeft className="w-4 h-4 mr-2" />
          Back
        </NavLink>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-[#c300f9]">Share Your Memories</h1>
          <p className="text-gray-600">
            Contribute your photos to the event album and make the moments unforgettable.
          </p>
        </div>

        {preview.map((event) => (
          <div key={event.id} className="border rounded-lg overflow-hidden shadow-md">
            {event.coverImage && (
              <div className="relative aspect-[16/9] w-full h-48">
                <img 
                  src={event.coverImage} 
                  alt={event.eventTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{event.eventTitle}</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#c300f9] mb-2">About this Event</h3>
                  <p className="text-gray-600">
                    {event.eventDescription}
                  </p>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{event.eventType}</span>
                  <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button 
                onClick={()=>Navigate('/dashboard')}
                className="w-full bg-black hover:bg-zinc-800 text-white py-3 rounded-lg border border-[#c300f9] shadow-[0_0_10px_rgba(168,85,247,0.15)]"
              >
                Upload Your Album
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
