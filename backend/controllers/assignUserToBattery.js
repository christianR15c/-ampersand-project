const { User, Battery } = require('../models')

const assignUserToBattery = async (req, res) => {
    const { batteryId, userId } = req.body
    User.findByPk(userId).then((user) => {
        if (user) {
            user.update({
                batteryId
            }).then(updatedUser => {
                res.status(200).json(updatedUser)
            }).catch((error) => console.log(error))
        }
    }).catch((error) => console.log(error))
}

module.exports = { assignUserToBattery }