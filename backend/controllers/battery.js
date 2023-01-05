const { Battery } = require('../models')

const registerBattery = async (req, res) => {
    const { batteryName } = req.body
    const batteryExist = await Battery.findAll({
        where: {
            batteryName
        }
    })

    if (batteryExist.length > 0) {
        return res.status(400).json({ error: 'Battery already registered' })
    }
    return Battery.create({
        batteryName
    }).then(newBattery => {
        res.status(200).json(newBattery)
    }).catch(err => console.log(err))

}

const updateBattery = async (req, res) => {

    const { previousLocation, location, batteryId, distance, energyUsed,
        price, swapStationId } = req.body

    Battery.findOne({
        where: {
            id: batteryId
        }
    }).then(battery => {
        if (!battery) return res.status(400).json({ error: 'Battery not found' })
        battery.update({
            previousLocation,
            location,
            distance,
            energyUsed,
            price,
            swapStationId
        }).then(updatedBattery => {
            res.status(200).json(updatedBattery)
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

const getAllBatteries = (req, res) => {
    Battery.findAll().then(batteries => res.status(200).json(batteries)).catch(err => console.log(err))
}

module.exports = {
    registerBattery,
    getAllBatteries,
    updateBattery
}
