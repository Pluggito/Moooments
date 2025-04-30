import { useContext, useEffect, useState } from "react";
import AlbumItems from "../components/AlbumItems";
import PropTypes from "prop-types";
import { EventContext } from "../context/EventContext";

const ShareLinks = ({
  linkRef,
  handleCopyLink,
  currentUrl,
  button,
  albumId,
}) => {
  const { getAlbumDetails } = useContext(EventContext);
  const [albumTitle, setAlbumTitle] = useState("");

  const fetchAlbumName = async (albumId) => {
    if (!albumId) {
      console.log("No Album ID found.", albumId);
      return;
    }

    try {
      const albumDetails = await getAlbumDetails(albumId);
      if (!albumDetails) {
        console.log("No album details.", albumDetails);
        return;
      }
      console.log("Album details fetched:", albumDetails); // Debugging line

      setAlbumTitle(albumDetails.title || "Untitled Album");
    } catch (error) {
      console.error("Error fetching album details:", error);
      setAlbumTitle("Untitled Album"); // Setting a default title in case of error
    }
  };

  useEffect(() => {
    if (albumId) {
      fetchAlbumName(albumId);
    }
  }, [albumId]); // Runs when albumId changes

  return (
    <div className="min-h-full bg-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-4xl font-bold">
          Share Your Moooments!
        </h2>
        <AlbumItems
          handleCopyLink={handleCopyLink}
          linkRef={linkRef}
          currentUrl={currentUrl}
          button={button}
          albumId={albumId}
        />
      </div>
    </div>
  );
};

ShareLinks.propTypes = {
  linkRef: PropTypes.object.isRequired,
  handleCopyLink: PropTypes.func.isRequired,
  currentUrl: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  albumId: PropTypes.string.isRequired, // Add validation for albumId
};

export default ShareLinks;
