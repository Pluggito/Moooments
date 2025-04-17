import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EventContext } from "../context/EventContext";
import PageLoader from "../components/PageLoader";
import {
  XIcon,
  Share2Icon,
  CheckIcon,
  DownloadIcon,
  Plus,
  Trash2,
} from "lucide-react";

const Albums = ({ loading, setLoading }) => {
  const [displayImages, setDisplayImages] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const { getAlbumDetails, deleteAlbum } = useContext(EventContext);
  const { albumId } = useParams();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [copied, setCopied] = useState(false); // Track clipboard status
  const navigate = useNavigate();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const fetchAllDetails = async () => {
    if (!albumId) {
      console.log("No Album ID found in URL.");
      return;
    }

    setLoading(true);
    try {
      const albumDetails = await getAlbumDetails(albumId);

      if (!albumDetails || !albumDetails.images) {
        console.error("No images found in album details.");
        return;
      }

      setAlbumTitle(albumDetails.title || "Untitled Album");

      const sortedEvents = albumDetails.events
        ? albumDetails.events.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        : [];

      setSavedData(sortedEvents);

      const images = Array.isArray(albumDetails.images)
        ? albumDetails.images
        : [];

      setDisplayImages(images.length ? images : []);
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDetails();
  }, [albumId]);

  const deletePhoto = async (id) => {
    try {
      if (selectedImages.includes(selectedImages.id)) {
        await deleteAlbum(id);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleImageClick = (imageUrl) => {
    setPreviewUrl(imageUrl);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: albumTitle,
          text: `Check out this album: ${albumTitle}`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleSelectImage = (imageId) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageId)
        ? prevSelected.filter((id) => id !== imageId)
        : [...prevSelected, imageId]
    );
  };

  const handleSingleDownload = (imageUrl, index = 1) => {
    const imageName = `photo-${index}.jpg`;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.setAttribute("download", imageName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {loading && <PageLoader />}

      {/* Album Title & Share Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{albumTitle}</h1>
        <div className="flex items-center gap-4.5">
          <button
            className="cursor-pointer hover:text-[#a000c7] transition"
            onClick={() => navigate(`/share-link-album/${albumId}`)}
          >
            <Plus size={20} />
          </button>
          <button
            className="text-black cursor-pointer hover:text-[#a000c7] transition"
            onClick={() => setIsDeleteMode((prev) => !prev)}
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={handleShare}
            className="text-black cursor-pointer hover:text-[#a000c7] transition"
          >
            {copied ? <CheckIcon size={20} /> : <Share2Icon size={20} />}
          </button>
        </div>
      </div>

      {/* Album Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayImages.length > 0 ? (
          displayImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={image.image_url || "/placeholder.svg"}
                alt={`Album Image ${index + 1}`}
                loading="lazy"
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() =>
                  isDeleteMode
                    ? toggleSelectImage(image.id)
                    : handleImageClick(image.image_url)
                }
              />

              {isDeleteMode && (
                <div className="absolute top-2 right-2">
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      selectedImages.includes(image.id)
                        ? "bg-[#a000c7] border-[#a000c7]"
                        : "bg-white border-gray-400"
                    }`}
                  >
                    {selectedImages.includes(image.id) && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No images available.</p>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewUrl && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md p-4 overflow-hidden">
          <div className="relative max-w-3xl w-full max-h-[90vh] p-2 bg-transparent rounded-lg">
            <button
              className="absolute top-15 right-4 bg-[#c300f9] text-white rounded-full p-2 shadow-md hover:bg-[#a000c7] transition cursor-pointer"
              onClick={() => setPreviewUrl(null)}
              aria-label="Close Preview"
            >
              <XIcon size={20} />
            </button>
            <button
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200 transition cursor-pointer"
              onClick={() => handleSingleDownload(previewUrl)}
              aria-label="Download Image"
            >
              <DownloadIcon size={20} />
            </button>
            <img
              src={previewUrl}
              alt="Preview"
              loading="lazy"
              className="w-full h-auto max-h-[80vh] object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
