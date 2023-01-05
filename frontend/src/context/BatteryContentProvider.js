import { createContext, useContext, useEffect, useState } from 'react'

const BatteryContent = createContext()

const BatteryContentProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [batteries, setBatteries] = useState()
    const [users, setUsers] = useState()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)
    }, [])

    return (
        <BatteryContent.Provider
            value={{ user, setUser, batteries, setBatteries, users, setUsers }}
        >
            {children}
        </BatteryContent.Provider>
    )
}


export const BatteryState = () => {
    return useContext(BatteryContent)
}

export default BatteryContentProvider