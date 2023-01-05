import { Box, Button, Container, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

const theme = createTheme()

const AddSwapStation = () => {

    const [stationName, setStationName] = useState()
    const [stationLocation, setStationLocation] = useState()

    const addSwapStation = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "/api/swap-station", {
                name: stationName, location: stationLocation
            })

            if (data) {
                alert('Successfully registered')
                setStationName('')
                setStationLocation('')
                // getAllBattries()
            }

        } catch (error) {
            alert(`Error: ${error.response.data.error}`)
            setStationName('')
            setStationLocation('')
        }
    }

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
                    <Box>
                        <Typography component="h1" variant="h5" mt={4}>
                            Add Swap Station
                        </Typography>
                        <Box component="form" noValidate onSubmit={addSwapStation} sx={{ mt: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={stationName}
                                    id="stationname"
                                    label="Station Name"
                                    name="stationName"
                                    autoComplete="Station Name"
                                    onChange={(e) => setStationName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} mt={2}>
                                <TextField
                                    required
                                    fullWidth
                                    value={stationLocation}
                                    id="stationlocation"
                                    label="Station Location"
                                    name="stationLocation"
                                    autoComplete="Station Location"
                                    onChange={(e) => setStationLocation(e.target.value)}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default AddSwapStation
