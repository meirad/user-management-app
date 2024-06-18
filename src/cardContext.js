
import React, { createContext, useState } from 'react';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
  
    return (
      <CardContext.Provider value={{ snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage }}>
        {children}
      </CardContext.Provider>
    );
  };