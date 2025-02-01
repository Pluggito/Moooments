import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    try {
      const events = JSON.parse(localStorage.getItem('events') || '[]');
      setSavedEvents(events);
    } catch (err) {
      console.error('Error loading saved events:', err);
    }
  }, []);

  const addEvent = (newEvent) => {
    const updatedEvents = [...savedEvents, newEvent];
    setSavedEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  return (
    <EventContext.Provider value={{ savedEvents, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useEvents = () => useContext(EventContext);

