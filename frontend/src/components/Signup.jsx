import React, { useEffect, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { BatteryState } from '../context/BatteryContentProvider';

const theme = createTheme();

const SignUp = () => {

    const { setBatteries } = BatteryState()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [nationalId, setNationalId] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!name) {
                alert('Please enter a name')
                return
            }


            const { data } = await axios.post(
                "/api/users/register", {
                name,
                email,
                phone,
                nationalId,
                password
            })

            if (data) {
                alert('Successfully registered')
                setName('')
                setEmail('')
                setPhone('')
                setNationalId('')
                setPassword('')
            }

        } catch (error) {
            console.log(error)
        }
    };

    const getAllBatteries = async () => {
        try {
            const { data } = await axios.get(
                "/api/battery"
            );
            setBatteries(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllBatteries()
    }, [])


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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={name}
                                    id="name"
                                    label="Names"
                                    name="name"
                                    autoComplete="name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    value={email}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={phone}
                                    id="phone"
                                    label="Phone number"
                                    name="phone"
                                    autoComplete="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={nationalId}
                                    id="nationalId"
                                    label="National Id"
                                    name="nationalId"
                                    autoComplete="nationalId"
                                    onChange={(e) => setNationalId(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                value={password}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignUp