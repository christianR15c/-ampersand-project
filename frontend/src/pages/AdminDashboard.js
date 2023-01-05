import React, { useEffect, useState } from 'react'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import SignUp from '../components/Signup'
import CreateBattery from '../components/CreateBattery'
import AddSwapStation from '../components/AddSwapStation'
import axios from 'axios'
import { BatteryState } from '../context/BatteryContentProvider'
import AssignBattery from '../components/AssignBattery'
import Geocode from "react-geocode"
import Monitoring from '../components/Monitoring'


export default function LabTabs() {
    const [value, setValue] = useState('1');
    const { setBatteries, setUsers } = BatteryState()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getAllUsers = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                },
            };
            const { data } = await axios.get(
                "/api/users", config
            );
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllBattries = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                },
            };

            const { data } = await axios.get(
                "/api/battery", config
            );
            setBatteries(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect((e) => {
        Geocode.setApiKey('AIzaSyBdJx5v2uITk3_fTgq6On0QIISrjgoIe34')
        Geocode.fromLatLng("48.8583701", "2.2922926").then(
            (response) => {
                const address = response.results[0].formatted_address;
                console.log('address: ', address);
            },
            (error) => {
                console.error(error);
            }
        );
        getAllUsers()
        getAllBattries()
    }, [])

    return (
        <Box sx={{ width: '100%', typography: 'body1' }} mt={5}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="Users" value="1" />
                        <Tab label="Battery" value="2" />
                        <Tab label="Swap Stations" value="3" />
                        <Tab label="Assign Battery to a User" value="4" />
                        <Tab label="Tracing" value="5" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <SignUp />
                </TabPanel>
                <TabPanel value="2">
                    <CreateBattery />
                </TabPanel>
                <TabPanel value="3">
                    <AddSwapStation />
                </TabPanel>
                <TabPanel value="4">
                    <AssignBattery />
                </TabPanel>
                <TabPanel value="5">
                    <Monitoring />
                </TabPanel>
            </TabContext>
        </Box>
    );
}