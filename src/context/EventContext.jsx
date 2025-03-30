import axios from "axios";
import { createContext } from "react";
import PropTypes from 'prop-types';
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";

const BASEURL = "https://mooment-prototype-v1.onrender.com/";

  export const EventContext = createContext();

 export const EventProvider = ({ children }) => {
 // const [loading, setLoading] = useState(false);
  const api = useAxios()
  const createAlbum = async (eventDetails, file, authToken) => {
    try { 
        const eventData = {
            title: eventDetails.eventTitle,
            description: eventDetails.eventDescription,
            event_type: eventDetails.eventType,
            event_date: eventDetails.eventDate,
            album_picture: file
        };

        const res = await axios.post(`${BASEURL}api/v1/list-create-album/`, eventData, {
            headers: {
                'Authorization': `Bearer ${authToken.access}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        
        const event = res.data;
        
        if (res.status === 201) {
            toast.success('event created');
            console.log(event);
        }else if(res.status === 400){
          toast.error('Error creating events')
        }
    } catch (error) {

        console.log('Error', error);
    }
  }

  const getAlbum = async () => { 
      const res = await api.get(`api/v1/list-create-album/`)
      console.log(res.data)
      return res.data        
  }

  //const deleteAlbum = async() =>{
    
  //}

  const value = {
    createAlbum,
    getAlbum
  }

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};


EventProvider.propTypes = {
  children: PropTypes.node.isRequired
};

