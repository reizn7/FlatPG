import { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';      // <-- unique ID generator

const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([
    {
      id: uuidv4(),
      title: '2BHK Flat in Noida',
      location: 'Sector 62, Noida',
      price: '₹15,000/mo',
      image:
        'https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg',
    },
    {
      id: uuidv4(),
      title: 'PG for Boys',
      location: 'Karol Bagh, Delhi',
      price: '₹6,500/mo',
      image:
        'https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg',
    },
  ]);

  // ---------- addListing: pushes new listing with fresh uuid ----------
  const addListing = (newListing) => {
    const listingWithId = { ...newListing, id: uuidv4() };
    setListings((prev) => [...prev, listingWithId]);
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing }}>
      {children}
    </ListingsContext.Provider>
  );
};

// Custom hook
export const useListings = () => useContext(ListingsContext);
