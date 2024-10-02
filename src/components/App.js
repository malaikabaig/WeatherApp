import { Box, Typography, TextField } from '@mui/material';
import logo from '../logo.png';
import bg from '../bg.png';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for the search field
  const [weatherData, setWeatherData] = useState(null);

  // Function to get the current time
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }); // Format: HH:MM:SS AM/PM
    setCurrentTime(timeString);
  };

  // Update the time every second
  useEffect(() => {
    updateTime(); // Initialize the current time
    const timer = setInterval(updateTime, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Handle change in search field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fetch weather data based on city name (using hardcoded coordinates for Faisalabad)
  const fetchWeather = async () => {
    const API_KEY = '8cfe1b826cd5f69311990f5e53688409';
    const lat = 31.5204; // Replace with Faisalabad's latitude
    const lon = 74.3587; // Replace with Faisalabad's longitude

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    try {
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      console.log(response);
      const wdata = await response.json();
      console.log(wdata);
      console.log(wdata.weather);
      console.log(wdata.weather[0].description);
      setWeatherData(wdata);
    } catch (error) {
      console.error(error); // Handle error (e.g., show a message)
    }
  };

  // Call fetchWeather where necessary
  useEffect(() => {
    fetchWeather(); // Fetch weather data for Faisalabad when the component mounts
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            width: { xs: '25%', sm: '30%', md: '40%', lg: '50%' },
            height: 500,
            borderColor: 'white',
            borderStyle: 'solid',
            borderWidth: 2,
            border: '1 px solid',
            mx: { xs: 5, sm: 10, md: 18, lg: 25 },
            mt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 5,
            px: 5,
          }}
        >
          <Typography sx={{ color: 'white', fontSize: 30 }}>
            Check Weather
          </Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <img style={{ width: 120 }} src={logo} alt="LOGO" />
            <Typography sx={{ color: 'white' }}>{currentTime}</Typography>
          </Box>

          {/* Search Field  */}
          <TextField
            variant="standard"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              marginTop: 2,
              width: '100%',
              border: '1px solid white', // Set a white border on all sides
              borderRadius: 1,
              '& .MuiInputBase-root': {
                border: '1px solid white', // Apply to all sides
              },
              '& .MuiInputLabel-root': {
                color: '#727272',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
          {fetchWeather}
        </Box>
      </Box>
    </>
  );
}
