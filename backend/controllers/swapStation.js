const { SwapStation } = require('../models')

const registerSwapStation = async (req, res) => {
    const { name, location } = req.body
    const stationExist = await SwapStation.findAll({
        where: {
            name,
            location
        }
    })

    if (stationExist.length > 0) {
        return res.status(400).json({ error: 'Swap Station already registered' })
    }
    return SwapStation.create({
        name,
        location
    }).then(newStation => {
        res.status(200).json(newStation)
    }).catch(err => console.log(err))

}

const getAllSwapStations = (req, res) => {
    SwapStation.findAll().then(stations => res.status(200).json(stations)).catch(err => console.log(err))
}

module.exports = {
    registerSwapStation,
    getAllSwapStations
}