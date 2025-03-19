import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const EventContext = createContext();
const DB_NAME = 'MooomentsDB';
const STORE_NAME = 'events';

export const EventProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
      console.error("Database error:", event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      setDb(db);
      loadEvents(db);
    };
  }, []);

  const loadEvents = (database) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      setSavedEvents(request.result);
    };
  };

  const addEvent = (newEvent) => {
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Generate new ID based on timestamp
    const newId = Date.now();
    const eventWithId = {
      ...newEvent,
      id: newId,
      createdAt: new Date().toISOString()
    };

    const request = store.add(eventWithId);

    request.onsuccess = () => {
      loadEvents(db);
    };
  };

  const addPhotoToEvent = async (eventId, photo) => {
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(eventId);

    request.onsuccess = () => {
      const event = request.result;
      if (!event.photos) {
        event.photos = [];
      }
      event.photos.push(photo);

      // Update the event with new photo
      const updateRequest = store.put(event);
      updateRequest.onsuccess = () => {
        loadEvents(db);
      };
    };
  };

  const clearEvents = () => {
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => {
      setSavedEvents([]);
    };
  };

  const deleteEvent = (eventId) => {
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(eventId);

    request.onsuccess = () => {
      loadEvents(db);
    };
  };

  return (
    <EventContext.Provider value={{ 
      savedEvents, 
      addEvent, 
      clearEvents,
      addPhotoToEvent,
      deleteEvent
    }}>
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useEvents = () => useContext(EventContext);

