import axios from "axios";
import { createContext } from "react";
import PropTypes from "prop-types";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";

const BASEURL = "https://mooment-prototype-v1.onrender.com/";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const api = useAxios();
  const createAlbum = async (eventDetails, coverImage, authToken) => {
    try {
      const eventData = {
        title: eventDetails.eventTitle,
        description: eventDetails.eventDescription,
        event_type: eventDetails.eventType,
        event_date: eventDetails.eventDate,
        album_picture: coverImage,
      };

      const res = await axios.post(
        `${BASEURL}api/v1/list-create-album/`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const event = res.data;

      if (res.status === 201) {
        toast.success("event created");
        return event.albumId;
      } else if (res.status === 400) {
        toast.error("Error creating events");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getAlbum = async () => {
    const res = await api.get(`api/v1/list-create-album/`);
    return res.data;
  };

  const deleteAlbum = async (id) => {
    try {
      const res = await api.delete(`api/v1/update-delete-album/${id}/`);

      if (res.status === 204 || res.status === 200) {
        window.location.reload();
        return res.data;
      } else {
        return;
      }
    } catch (error) {}
  };

  const uploadImage = async (albumId, file) => {
    try {
      const res = await api.post(
        `api/v1/upload-image/${albumId}/`,
        {
          files: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {}
  };

  const getAlbumDetails = async (albumId) => {
    try {
      let res = await api.get(`api/v1/album-detail/${albumId}/`);
      return res.data;
    } catch (error) {}
  };

  const getAllAlbum = async () => {
    try {
      let res = await api.get(`api/v1/list-albums/`);
      return res.data;
    } catch (error) {}
  };

  const value = {
    createAlbum,
    getAlbum,
    deleteAlbum,
    uploadImage,
    getAlbumDetails,
    getAllAlbum,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
