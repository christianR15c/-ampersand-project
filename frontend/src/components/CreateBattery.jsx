import { Box, Button, Container, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

const theme = createTheme()

const CreateBattery = () => {

    const [batteryName, setBatteryName] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "/api/battery", {
                batteryName
            })

            if (data) {
                alert('Successfully registered')
                setBatteryName('')
            }

        } catch (error) {
            console.log(error);
            alert(`Error: ${error.response.data.error}`)
            setBatteryName('')
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
                            Add Battery
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={batteryName}
                                    id="batteryname"
                                    label="Battery Name"
                                    name="batteryName"
                                    autoComplete="Battery Name"
                                    onChange={(e) => setBatteryName(e.target.value)}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                create
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default CreateBattery