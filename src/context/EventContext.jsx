import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const EventContext = createContext();
const DB_NAME = 'MooomentsDB';
const STORE_NAME = 'events';

export const EventProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [db, setDb] = useState(null);

  // Initialize IndexedDB
  useEffect(() => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
      console.error("Database error:", event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        // Create indexes for searching
        store.createIndex('eventTitle', 'eventTitle', { unique: false });
        store.createIndex('eventDate', 'eventDate', { unique: false });
        // Add an array to store multiple photos
        store.createIndex('photos', 'photos', { unique: false, multiEntry: true });
      }
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

    // Ensure photos array exists
    const eventWithPhotos = {
      ...newEvent,
      photos: newEvent.photos || [],
      coverImage: newEvent.coverImage || null
    };

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(eventWithPhotos);

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

  return (
    <EventContext.Provider value={{ 
      savedEvents, 
      addEvent, 
      clearEvents,
      addPhotoToEvent 
    }}>
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useEvents = () => useContext(EventContext);

