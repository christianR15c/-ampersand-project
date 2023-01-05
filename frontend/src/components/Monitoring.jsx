import React, { useEffect, useState } from 'react'
import { Button, CssBaseline, FormControl, MenuItem, InputLabel, Grid, Box, Typography, Container, Select, TextField, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BatteryState } from '../context/BatteryContentProvider'
import axios from 'axios'


const theme = createTheme()

const Monitoring = () => {

  const coordinates = []

  const { users } = BatteryState()

  const [userId, setUserId] = useState()
  const [batteryId, setBatteryId] = useState()
  const [currentPosition, setCurrentPosition] = useState()
  const [previousPosition, setpreviousPosition] = useState()
  const [isDisabled, setIsDisabled] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [coords, setCoords] = useState()
  const [distance, setDistance] = useState()
  const [speed, setSpeed] = useState()
  const [userWithBatteries, setUserWithBatteries] = useState()
  const [swapStations, setSwapStations] = useState()
  const [stationId, setStationId] = useState()

  const startTracing = (e) => {
    setIsTracking(true)
    e.preventDefault()
    if (!userId) return alert('Please select user and battery to start tracing')
    navigator.geolocation.watchPosition(async (data) => {

      // create coordinates array that we can use if we want to track on map using mapbox 
      coordinates.push([data.coords.longitude, data.coords.latitude])

      window.localStorage.setItem('coordinates', JSON.stringify(coordinates))
      setSpeed(data.coords.speed)
      if (coordinates.length === 1) setCurrentPosition(coordinates[0])
      else if (coordinates.length > 1) {
        setCurrentPosition(coordinates[coordinates.length - 1])
        setpreviousPosition(coordinates[coordinates.length - 2])
        console.log(coordinates[coordinates.length - 2][1]);
      }

    },
      error => console.log(error),
      {
        enableHighAccuracy: true
      }
    )
    setIsDisabled(true)
  }

  // get all users & swapStation from database
  useEffect((e) => {
    setUserWithBatteries(users.filter(user => user.batteryId !== null))
    const getAllSwapStations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
          },
        };
        const { data } = await axios.get(
          "/api/swap-station", config
        );
        console.log('hereee');
        setSwapStations(data)
        console.log('stations', data);
      } catch (error) {
        console.log(error)
      }
    }
    getAllSwapStations()
  }, [])

  const handleChange = async (e) => {
    e.preventDefault()
    setUserId(e.target.value)

    const { data } = await axios.get(
      `/api/users/${e.target.value}`)
    setBatteryId(data.batteries.id);
  }

  // update battery location everytime location changes
  useEffect(() => {
    setCoords(JSON.parse(window.localStorage.getItem('coordinates')));

    let coordForDist = []
    if (coords) {
      for (let i = 0; i < coords.length; i++) {
        coordForDist.push({ lat: coords[i][1], lon: coords[i][0] })
      }
    }

    function degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    }

    function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
      var earthRadiusKm = 6371;

      var dLat = degreesToRadians(lat2 - lat1);
      var dLon = degreesToRadians(lon2 - lon1);

      lat1 = degreesToRadians(lat1);
      lat2 = degreesToRadians(lat2);

      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadiusKm * c;
    }

    let totalDistanceInKm = 0;

    for (let i = 0; i < coordForDist.length - 1; i++) {
      totalDistanceInKm += distanceInKmBetweenEarthCoordinates(coordForDist[i].lat, coordForDist[i].lon, coordForDist[i + 1].lat, coordForDist[i + 1].lon);
      setDistance(totalDistanceInKm)
    }


    const updateBattery = async () => {

      // let suppose at 1km it consumes 1watt this means the energy willl equal to distance * 1watt
      // let suppose 1watt cost 1k mease that price will be equal to energy * 1000

      try {
        console.log('stationId: ', stationId);
        const { data } = await axios.put(
          "/api/battery/update", {
          batteryId,
          previousLocation: previousPosition && previousPosition.toString() || null,
          location: currentPosition.toString(),
          distance,
          energyUsed: distance * 1,
          price: distance * 1 * 1000,
          swapStationId: stationId
        })
        console.log('updating data: ', data);
      } catch (error) {
        console.log(error);
      }
    }
    updateBattery()

  }, [currentPosition])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box >
            <Typography component="h1" variant="h5">
              Change User Battery
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <FormControl fullWidth sx={{ marginTop: 1, marginBottom: 2 }}>
                    <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={userId}
                      label="Age"
                      onChange={(e) => handleChange(e)}
                    >
                      {userWithBatteries ? (
                        userWithBatteries.map(user => (
                          <MenuItem
                            key={user.id}
                            value={user.id}
                          >
                            {user.name}
                          </MenuItem>
                        ))
                      ) : null}

                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ marginTop: 1, marginBottom: 2 }}>
                    <InputLabel id="demo-simple-select-helper-label">Swap Station</InputLabel>
                    <Select
                      labelId=""
                      id=""
                      value={stationId}
                      label="Station Name"
                      onChange={(e) => setStationId(e.target.value)}
                    >
                      {swapStations ? (
                        swapStations.map(station => (
                          <MenuItem
                            key={station.id}
                            value={station.id}
                          >
                            {station.name}
                          </MenuItem>
                        ))
                      ) : null}

                    </Select>
                  </FormControl>
                  <Box>
                    <Button
                      fullWidth
                      disabled={isDisabled}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={startTracing}
                    >
                      start tracking
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {isTracking && (
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={`Speed: ${speed} m/s`} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary={`Distance: ${distance} km`} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary={`Enedy: ${distance} Watts`} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary={`Price: ${distance * 1000} Rwf`} />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </Box>



        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Monitoring
