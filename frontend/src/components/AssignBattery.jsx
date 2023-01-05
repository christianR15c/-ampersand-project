import { Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, ThemeProvider, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BatteryState } from '../context/BatteryContentProvider'

const theme = createTheme()

const AssignBattery = () => {

    const { batteries, users } = BatteryState()
    const [batteryId, setBatteryId] = useState()
    const [userId, setUserId] = useState()
    const [batteryName, setBatteryName] = useState()

    console.log('batteries: ', batteries);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(
                "/api/assign", {
                userId,
                batteryId
            })
            if (data) {
                alert('Successfully registered')
                setBatteryName('')
            }

        } catch (error) {
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
                    <Box >
                        <Typography component="h1" variant="h5">
                            Assign Battery to User
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <FormControl fullWidth sx={{ marginTop: 1, marginBottom: 2 }}>
                                        <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={userId}
                                            label="Age"
                                            onChange={(e) => setUserId(e.target.value)}
                                        >
                                            {users ? (
                                                users.map(user => (
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
                                        <InputLabel id="demo-simple-select-helper-label">Battery</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={batteryId}
                                            label="Age"
                                            onChange={(e) => setBatteryId(e.target.value)}
                                        >
                                            {batteries ? (
                                                batteries.map(battery => (
                                                    <MenuItem
                                                        key={battery.id}
                                                        value={battery.id}
                                                    >
                                                        {battery.batteryName}
                                                    </MenuItem>
                                                ))
                                            ) : null}

                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Assign
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default AssignBattery
