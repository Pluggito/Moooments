import {
  ImageIcon,
  XIcon,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../context/EventContext";
import PageLoader from "../components/PageLoader";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

const AddPhotos = ({ loading, setLoading }) => {
  const { uploadImage, getAlbumDetails } = useContext(EventContext);
  const [latestAlbum, setLatestAlbum] = useState([]);
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const { albumId } = useParams();

  const validateAndSetFiles = (newFiles) => {
    const validFiles = newFiles.filter((file) =>
      file.type.match(/^image\/(jpeg|png|webp)$/)
    )

    if (validFiles.length === 0) {
      alert("Please upload only JPEG, PNG, or WebP files.");
      return;
    }

    if (files.length + validFiles.length > 30) {
      alert("You can upload a maximum of 7 photos.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviews]);
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length) {
      validateAndSetFiles(Array.from(e.target.files));
    }
  };

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
    validateAndSetFiles(Array.from(e.dataTransfer.files));
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previewUrls[index]);
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleUploadImages = async () => {
    if (files.length + latestAlbum[0].image_count > 30) {
      alert("Maximum limit exceeded");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    if (!latestAlbum.length) {
      alert("No album found. Please create an album first.");
      return;
    }

    setLoading(true);
    try {
      const retrievedAlbumData = await getAlbumDetails(albumId);
      if (!retrievedAlbumData) {
        alert("Album ID retrieval failed.");
        setLoading(false);
        return;
      }

      for (const file of files) {
        await uploadImage(albumId, file);
      }

      alert("Images uploaded successfully!");
      setLoading(false);
      navigate(`/album/${albumId}`);
      setFiles([]); // Clear uploaded files
      setPreviewUrls([]); // Reset previews
    } catch (error) {
      //console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!albumId) {
      alert("no id found");
      return;
    }
    fetchEvents();
  }, [albumId]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      //console.log("Fetching album details for albumId:", albumId);

      const albumData = await getAlbumDetails(albumId);
      // console.log("Album details response:", albumData);

      if (!albumData) {
        alert("No album found for this ID");
        return;
      }

      if (albumData) {
        setLatestAlbum([albumData]);
      } else {
        alert("No album found for this ID.");
      }
    } catch (error) {
      //console.error("Error fetching album details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      {loading && <PageLoader />}
      <main className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <h2 className="text-xl font-semibold text-purple-600">
            Share Your Memories
          </h2>
          <p className="text-gray-700 mb-5">
            Contribute your photos to the event album.
          </p>
          {latestAlbum.length > 0 && latestAlbum[0]?.album_picture ? (
            <div className=" relative">
              <img
                src={latestAlbum[0].album_picture}
                loading="lazy"
                alt="Latest Event"
                className="relative w-full object-cover aspect-4/3 rounded-lg"
              />
              <div className="absolute flex gap-1.5 items-center bottom-2 left-2 p-1 text-base text-white rounded bg-gray-800">
                <ImageIcon size={20} /> {latestAlbum[0].image_count}/30 Photos
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No Event created</p>
          )}
        </div>

        <div className="space-y-4 justify-center flex flex-col p-5">
          <h1 className="text-2xl font-bold text-gray-800">
            {latestAlbum[0]?.title || "No Event"}
          </h1>
          <p className="text-gray-700">
            {latestAlbum[0]?.description || "No description available"}
          </p>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging ? "border-[#c300f9] bg-[#c300f9]/5" : "border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload").click()}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileInput}
            />
            <ImageIcon className="h-10 w-10 text-gray-500" />
            <p className="text-sm text-gray-700">
              Drag & drop or{" "}
              <span className="text-[#c300f9] font-medium">
                click to upload
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Max 30 images (JPEG, PNG, WebP)
            </p>
          </div>

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    loading="lazy"
                    alt={`Preview ${index}`}
                    className="h-24 rounded-lg object-cover"
                  />
                  <XIcon
                    className="absolute top-1 right-1 text-xs p-1 rounded-full cursor-pointer bg-black text-slate-50"
                    size={27}
                    onClick={() => removeImage(index)}
                  />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleUploadImages}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white p-3 cursor-pointer font-bold rounded-lg"
          >
            Add photos to Album
          </button>
          <p>*Maximum of 30 photos</p>
        </div>
      </main>
    </div>
  );
};

AddPhotos.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default AddPhotos;
