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
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      setDb(db);
      
      // Load initial events
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        setSavedEvents(getAllRequest.result);
      };
    };
  }, []);

  const addEvent = (newEvent) => {
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(newEvent);

    request.onsuccess = () => {
      // Refresh the events list
      const getAllTransaction = db.transaction([STORE_NAME], 'readonly');
      const store = getAllTransaction.objectStore(STORE_NAME);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        setSavedEvents(getAllRequest.result);
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
    <EventContext.Provider value={{ savedEvents, addEvent, clearEvents }}>
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useEvents = () => useContext(EventContext);

