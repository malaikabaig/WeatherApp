import { Box, Typography, TextField } from '@mui/material';
import logo from '../logo.png';
import bg from '../bg.png';
import React, { useState, useEffect } from 'react';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CloudQueueSharpIcon from '@mui/icons-material/CloudQueueSharp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AirIcon from '@mui/icons-material/Air';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const matches = useMediaQuery('(min-width:800px)');
  console.log('matches', matches);

  // Create a custom theme
  const theme = createTheme({
    typography: {
      allVariants: {
        color: 'white', // Set all Typography colors to vibrant white
      },
    },
  });

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

  // Fetch weather data based on city name (using hardcoded coordinates for Faisalabad)
  const fetchWeather = async () => {
    const API_KEY = '8cfe1b826cd5f69311990f5e53688409';
    const lat = 31.5204; // Replace with Faisalabad's latitude
    const lon = 74.3587; // Replace with Faisalabad's longitude

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      console.log(response);
      const wdata = await response.json();
      console.log(wdata);
      console.log(wdata.weather);
      console.log(wdata.main);
      console.log(wdata.weather[0].description);
      setWeatherData(wdata);

      // Fetch forecast data
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) throw new Error('Forecast data not found');
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData); // Set forecast data in state
      console.log(forecastData);
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
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundImage: `url(${bg})`,
            height: matches ? '100vh' : '100%',
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
              width: { xs: '70%', sm: '70%', md: '70%', lg: '50%' },
              // height: 600,
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column', // Column layout for extra-small and small screens
                  sm: 'column', // Column layout for small screens
                  md: 'row', // Row layout for medium and larger screens
                },
                mt: 2,
                width: '100%',
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>
                  CURRENT WEATHER
                </Typography>

                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 2,
                    }}
                  >
                    <Typography>FAISALABAD</Typography>
                    <Typography>Temperature</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 4,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography>{currentTime}</Typography>
                    <Typography>
                      {weatherData
                        ? (weatherData.main.temp - 273.5).toFixed(0) + ' ◦C'
                        : 'Loading'}
                    </Typography>
                    <Typography>
                      {weatherData
                        ? weatherData.main.humidity + ' %'
                        : 'Loading'}
                    </Typography>
                  </Box>
                </Box>

                {/* second section */}
                <Box sx={{ mt: 5 }}>
                  <Typography sx={{ textAlign: 'center' }}>
                    AIR CONDITIONS
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <Typography>
                        <DeviceThermostatIcon fontSize="small" />
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>Real Feel </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <Typography>
                        <AirIcon fontSize="small" />
                      </Typography>
                      <Typography>Wind</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <Typography>
                        <CloudQueueSharpIcon fontSize="small" />
                      </Typography>
                      <Typography>Clouds</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <Typography>
                        <WaterDropOutlinedIcon fontSize="small" />
                      </Typography>
                      <Typography>Humidity</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography>
                      {weatherData
                        ? (weatherData.main.temp - 273.5).toFixed(0) + ' ◦C'
                        : 'Loading'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography>
                        {weatherData
                          ? weatherData.wind.speed + ' m/s'
                          : 'Loading'}{' '}
                      </Typography>
                    </Box>
                    <Typography>
                      {weatherData ? weatherData.clouds.all + ' %' : 'Loading'}{' '}
                    </Typography>
                    <Typography>
                      {weatherData
                        ? weatherData.main.humidity + ' %'
                        : 'Loading'}{' '}
                    </Typography>
                  </Box>
                </Box>

                {/* third section */}
                <Box
                  sx={{
                    mt: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    TODAY'S FORECAST
                  </Typography>
                  <Box sx={{}}>
                    {forecastData ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        {/* Show hourly forecast */}
                        {forecastData.list
                          .slice(0, 4) // Show first 4 forecast entries (or adjust based on your needs)
                          .map((forecast, index) => (
                            <Box
                              key={index}
                              sx={{
                                marginBottom: 1,
                                paddingTop: 2,
                                alignItems: 'center',
                                border: '1px solid white',
                                px: 2,
                                height: 100,
                                width: 50,
                                borderRadius: '10px',
                                backgroundColor: '#123D6F',
                                alignContent: 'start',
                              }}
                            >
                              <Box>
                                <Typography sx={{ fontSize: 12 }}>
                                  {/* Display the specific hour */}
                                  {new Date(forecast.dt_txt).toLocaleTimeString(
                                    'en-US',
                                    {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    }
                                  )}
                                </Typography>
                                <Typography>
                                  <CloudQueueIcon />
                                </Typography>
                                <Typography>
                                  {forecast.main.temp.toFixed(0)}°C
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                      </Box>
                    ) : (
                      <Typography>Loading forecast data...</Typography>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ padding: 2, width: '100%' }}>
                <Typography sx={{ textAlign: 'center', mb: 2 }}>
                  WEEKLY FORECAST
                </Typography>
                {forecastData ? (
                  <Box>
                    {console.log('forecastData.list', forecastData?.list)}
                    {/* Show the forecast for the next 5 days */}
                    {forecastData.list
                      .filter((item) => item.dt_txt.includes('9:00:00')) // Only show data for 12:00 PM
                      .slice(0, 7)
                      .map((forecast, index) => (
                        <Box
                          key={index}
                          sx={{
                            marginBottom: 1,
                            alignItems: 'center',
                            border: '1px solid white',
                            px: 2,
                            height: 70,
                            borderRadius: '10px',
                            backgroundColor: '#123D6F',
                            alignContent: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography>
                              {new Date(forecast.dt_txt).toLocaleDateString(
                                'en-US',
                                { weekday: 'long' }
                              )}
                            </Typography>
                            <Typography>
                              {forecast.main.temp.toFixed(0)}°C
                            </Typography>
                            <Typography>{forecast.wind.speed} m/s</Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography>
                              {forecast.weather[0].description}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 1,
                              }}
                            >
                              <Typography>
                                <CloudQueueIcon fontSize="small" />
                              </Typography>
                              <Typography>{forecast.clouds.all}%</Typography>
                            </Box>
                            <Typography>{forecast.main.humidity}%</Typography>
                          </Box>
                        </Box>
                      ))}
                  </Box>
                ) : (
                  <Typography>Loading forecast data...</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

// {
//   weatherData ? (
//     <Box>
//       <Typography>City: {weatherData.name}</Typography>
//       <Typography>Temperature: {weatherData.main.temp}°C</Typography>
//       <Typography>Condition: {weatherData.weather[0].description}</Typography>
//       <CloudQueueIcon />
//     </Box>
//   ) : (
//     <Typography>Loading weather data...</Typography>
//   );
// }
