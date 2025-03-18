import { LucideArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";

const Preview = () => {
  const { savedEvents, clearEvents } = useEvents();
  const [latestEvent, setLatestEvent] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    if (savedEvents.length > 0) {
      setLatestEvent(savedEvents[savedEvents.length - 1]);
    }
  }, [savedEvents]);

  const handleNavigation = (direction) => {
    if (direction === 'back') {
      // Clear the event when going back
      clearEvents();
      Navigate('/create-album');
    } else if (direction === 'forward') {
      // Keep the event and proceed
      Navigate('/nextphase');
    }
  };

  if (!latestEvent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="space-y-6">
        <button
          onClick={() => handleNavigation('back')}
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
          {latestEvent.coverImage && (
            <div className="relative aspect-[4/3] p-1 overflow-hidden sm:flex-3">
              <img 
                src={latestEvent.coverImage}
                alt={latestEvent.eventTitle}
                className="w-full h-full object-center object-cover rounded-lg"
              />
            </div>
          )}

          <div className="p-6 flex-2 text-left">
            <h2 className="text-2xl font-bold mb-4">{latestEvent.eventTitle}</h2>

            <div className="space-y-4 mt-7">
              <div>
                <h3 className="text-lg font-semibold bg-[#c300f9] text-white mb-2 p-2 rounded">
                  About this Event
                </h3>
                <p className="text-gray-600 w-full">
                  {latestEvent.eventDescription}
                </p>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{latestEvent.eventType}</span>
                <span>{new Date(latestEvent.eventDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="px-6 pb-6 mt-7">
              <button 
                onClick={() => handleNavigation('forward')}
                className="w-full bg-black hover:bg-zinc-800 text-white py-3 rounded-lg border border-[#c300f9] shadow-[0_0_10px_rgba(168,85,247,0.15)]
                cursor-pointer transform transition-all duration-500 hover:scale-[1.05]"
              >
                Upload Your Album
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
