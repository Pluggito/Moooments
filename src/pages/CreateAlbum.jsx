import { useContext, useEffect, useState } from "react";
import {  Upload, ChevronDown } from "lucide-react"; 
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EventContext } from "../context/EventContext";
import { AuthContext } from "../context/AuthContext";
import PageLoader from "../components/PageLoader";



const CreateAlbum = () => {
 const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const { createAlbum } = useContext(EventContext);
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    id: 1, // Default starting ID
    eventTitle: '',
    eventDescription: '',
    eventType: '',
    eventDate: '',
    createdAt: new Date().toISOString(),
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      alert("Please upload a JPEG, PNG, or WebP file");
      return;
    }    
    setFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEventDetails = (e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!eventDetails.eventTitle || !eventDetails.eventDescription || 
        !eventDetails.eventType || !eventDetails.eventDate || !file) {
      setError('Please fill in all required fields');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    return true;
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!authToken) {
        setError('Please login first');
        return;
    }
    setLoading(true);
    try {
         await createAlbum(eventDetails, file, authToken);
         setLoading(false);
          navigate('/preview');
        
    } catch (error) {
        console.error('Events not created', error);
        setLoading(false);
        setError('Failed to create event. Please try again.');
        
    } 

    setEventDetails('')
    setFile('')
    setError('')
  };

  // Set initial ID when component mounts
  useEffect(() => {
    setEventDetails(prev => ({
      ...prev
    }));
  }, []);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
      <div className='max-w-7xl items-center mx-auto p-4 sm:p-4'>
        {loading && <PageLoader />}
        <div className="mb-5">
        <NavLink
          to="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-slate-50 transition-colors border-2 hover:bg-black duration-500 ease-in-out rounded p-2  font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </NavLink>
        </div>
        <div className='justify-center sm:w-[708px] mx-auto mb-4'>
        <p className='text-center font-semibold text-3xl '>Start a collection of memories 
        that lasts a lifetime.</p>
        </div>
        {/*------Event Details----- */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <p className="font-medium mb-4">Event Details - Help everyone recognize your special occasion.</p>
          {/*------Events data------- */} 
          <div className="w-full">
            <div className="p-2">
              <label htmlFor="eventTitle" className="text-gray-600">
             <span className="text-[#c300f9]">*</span>Event Title
                <input 
                placeholder="Give your event a name"
                id="eventTitle"
                name="eventTitle"
                type='text'
                value={eventDetails.eventTitle}
                onChange={handleEventDetails}
                className="w-full p-2 text-gray-700 border-2 border-gray-600  rounded-lg hover:border-fuchsia-700"/>
              </label>
            </div>

            <div className="p-2">
              <label htmlFor="eventDescription" className="text-gray-600">
              <span className="text-[#c300f9]">*</span>Event Description
                <input 
                placeholder="Describe the event"
                id="eventDescription"
                name="eventDescription"
                type="text"
                value={eventDetails.eventDescription}
                onChange={handleEventDetails}
                className="w-full p-2 text-gray-700 border-2 border-gray-600  rounded-lg hover:border-fuchsia-700"/>
              </label>
            </div>

            <div className="p-2">
              <label htmlFor="eventType" className="text-gray-600">
              <span className="text-[#c300f9]">*</span>Event Type
                <div className="relative">
                  <select
                    id="eventType"
                    name="eventType"
                    value={eventDetails.eventType}
                    onChange={handleEventDetails}
                    className="w-full p-2 text-gray-700 border-2 border-gray-600 rounded-lg hover:border-fuchsia-700 appearance-none bg-white cursor-pointer"
                  >
                    <option value="" disabled>What type of event</option>
                    <option value="concert">Concert</option>
                    <option value="festival">Festival</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="fashion">Retreats</option>
                    <option value="fashion">Fashion Shows</option>
                    <option value="art">Art Shows</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="family">Family Gathering</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none h-5 w-5" />
                </div>
              </label>
            </div>

            <div className="p-2">
              <label htmlFor="eventDate" className="text-gray-600">
              <span className="text-[#c300f9]">*</span>Event Date
                <input 
                id="eventDate"
                name="eventDate"
                type="date"
                value={eventDetails.eventDate}
                onChange={handleEventDetails}
                className="w-full p-2 text-gray-700 border-2 border-gray-600  rounded-lg hover:border-fuchsia-700"/>
              </label>
            </div>
          </div>

          {/*------image Upload----- */}
          <div>
            <div>
              <p className="font-medium my-4 text-gray-700 text-sm">
                Upload Cover Image - Give your album a personal touch with a banner.
              </p>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragging ? "border-[#c300f9] bg-[#c300f9]/5" : "border-gray-400"}
                hover:border-[#c300f9] hover:bg-[#c300f9]/5`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {previewUrl ? (
                <div className="flex flex-col items-center gap-4">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-48 rounded-lg object-contain"
                  />
                  <p className="text-sm text-gray-500">Click or drag to change image</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-gray-500" />
                  <p className="text-sm text-gray-700">
                    Drag an image here or <span className="text-[#c300f9] font-medium">click to upload</span>
                  </p>
                  <p className="text-sm text-gray-500">*Images must be JPEG or PNG</p>
                </div>
              )}
                <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png"
                onChange={handleFileInput}
              />
            </div>
          </div>

          <div className="items-center text-center w-3/4 my-6 p-1 mx-auto">
          <button 
            onClick={handleSubmit}
            type="submit"
            className="cursor-pointer w-full h-[40px] text-slate-100 bg-black border hover:border-[#C300F9]
           shadow-[0_0_10px_rgba(168,85,247,0.15)] rounded-lg"
           
          >
            Create Album
          </button>
          </div>

          
        </form>
      </div>
  )
}


export default CreateAlbum;
