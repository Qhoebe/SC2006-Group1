import React, { createContext, useContext, useState } from 'react';

const UpdateContext = createContext();

export const useUpdate = () => useContext(UpdateContext);

export const UpdateProvider = ({ children }) => {
  const [updateFlag, setUpdateFlag] = useState(false);

  const triggerUpdate = () => {
    setUpdateFlag(prevFlag => !prevFlag); // Toggle the flag to notify updates
  };

  return (
    <UpdateContext.Provider value={{ updateFlag, triggerUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
};
