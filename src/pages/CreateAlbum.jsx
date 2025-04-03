import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../index.css'
import { EventContext } from "../context/EventContext"
import { AuthContext } from "../context/AuthContext"
import PageLoader from "../components/PageLoader"

const CreateAlbum = ({loading, setloading}) => {
  const navigate = useNavigate()
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    eventType: "",
    eventDate: "",
  })
  const [coverImage, setCoverImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const {createAlbum} = useContext(EventContext);
  const {authToken} = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEventDetails({
      ...eventDetails,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setCoverImage(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const validate = () => {
    if (!eventDetails.title || !eventDetails.description || !eventDetails.eventDate || !eventDetails.eventType || !coverImage) {
      console.error('Please fill all fields');
      return false;
    }
    return true;
  }

  const handleSubmit = async(e) => {
  e.preventDefault();
  
  if (!validate()) {
    return; 
  }
  
  if (!authToken) {
    console.error('Not verified logged in');
    return;
  }
  
  setloading(true);
  try {
    await createAlbum(eventDetails, coverImage, authToken);
    navigate('/preview');
  } catch (error) {
    console.error('Sorry, could not process the information');
  } finally {
    setloading(false);
  }
}

  return (
      <main className="flex-1 container mx-auto max-w-5xl px-2 py-8">
        {loading && <PageLoader/>}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 hover:text-[#c300f9]  mb-8 group transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>

        <div className="text-black rounded-2xl dropshadow-custom p-4 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">
              Start a collection of memories that lasts a lifetime.
            </h1>
            <p className="text-gray-700 ">
              Event Details - Help everyone recognize your special occasion.
            </p>
          </div>

          <form  className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Event Title <span className="text-[#c300f9">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={eventDetails.title}
                onChange={handleInputChange}
                placeholder="Give your event a name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 ">
                Event Description <span className="text-[#c300f9]">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={eventDetails.description}
                onChange={handleInputChange}
                placeholder="Describe the event"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
                  Event Type <span className="text-[#c300f9]">*</span>
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={eventDetails.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-gray-300 border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700 appearance-none bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill=`` viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundPosition: "right 0.5rem center",
                    backgroundSize: "1.5em 1.5em",
                  }}
                  required
                >
                  <option value="" disabled>
                    Select an event type
                  </option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="graduation">Graduation</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="conference">Conference</option>
                  <option value="party">Party</option>
                  <option value="meeting">Meeting</option>
                  <option value="family_reunion">Family Reunion</option>
                  <option value="corporate_event">Corporate Event</option>
                  <option value="charity_event">Charity Event</option>
                  <option value="concert">Concert</option>
                  <option value="festival">Festival</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2 ">
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 ">
                  Event Date <span className="text-[#c300f9]">*</span>
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={eventDetails.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-purple-500 text-gray-700 border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 ">
                Upload Cover Image - Give your album a personal touch with a banner.
              </label>
              <div
                className={`border-2 w-3/4 mx-auto border-dashed rounded-lg p-8 text-center ${isDragging ? "border-purple-500 bg-purple-50 /20" : "border-gray-300 "} transition-colors`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Cover preview"
                      className="mx-auto max-h-48 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(null)
                        setImagePreview(null)
                      }}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                    >
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
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#c300f9]"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 ">
                        Drag an image here or{" "}
                        <label className="text-purple-600 hover:text-purple-700 cursor-pointer">
                          <span>click to upload</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/jpeg, image/png"
                            onChange={handleImageChange}
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">*Images must be JPEG or PNG</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                type="submit"
                className=" cursor-pointer w-3/4 py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Create Album
              </button>
            </div>
          </form>
        </div>
      </main>
  )
}

export default CreateAlbum

