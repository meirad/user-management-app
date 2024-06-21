import React, { useState, useMemo, useEffect, createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import ResponsiveAppBar from './layout/ResponsiveAppBar';
import { UserContext, UserFavCardContext } from './UserContext';
import { GetUserContext } from './GetUserContext';
import { CardProvider } from './cardContext';
import MyBottomNavigation from './layout/FooterBar';
import AppRoutes from './routes/AppRoutes';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [profile, setProfile] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [searchInput, setSearchInput] = useState(''); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [mode, setMode] = useState(() => {
    const savedMode = window.localStorage.getItem('colorMode');
    return savedMode ? JSON.parse(savedMode) : 'light';
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          window.localStorage.setItem('colorMode', JSON.stringify(newMode));
          return newMode;
        });
      },
    }),
    [],
  );

  useEffect(() => {
    window.localStorage.setItem('colorMode', JSON.stringify(mode));
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'light' ? '#fff' : '#000',
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CardProvider>
          <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <GetUserContext.Provider value={{ profile, setProfile }}>
              <UserFavCardContext.Provider value={{ favoriteCards, setFavoriteCards }}>
                <Router>
                  <ResponsiveAppBar searchInput={searchInput} setSearchInput={setSearchInput} />
                  <div style={{ marginTop: '100px', marginBottom: '90px' }}>
                    <AppRoutes searchInput={searchInput} setSnackbarOpen={setSnackbarOpen} />
                  </div>
                  <Snackbar
                    open={snackbarOpen} 
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                      user created successfully!!!
                    </Alert>
                  </Snackbar>
                  <MyBottomNavigation />
                </Router>
              </UserFavCardContext.Provider>
            </GetUserContext.Provider>
          </UserContext.Provider>
        </CardProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
