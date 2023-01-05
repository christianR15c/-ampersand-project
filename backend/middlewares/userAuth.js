const jwt = require('jsonwebtoken')

const { User } = require('../models')

const userExist = async (req, res, next) => {
    try {
        const { nationalId } = req.body
        const userexist = await User.findOne({
            where: {
                nationalId
            }
        })

        if (userexist) return res.status(400).json({ error: 'User with national identity already exists' })
    } catch (error) {
        console.log(error)
    }
}

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]

            //decodes token id
            const decoded = jwt.verify(token, process.env.adminSecretKey)

            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    }

    if (!token) {
        res.status(401).json({ error: "Not authorized, no token" })
    }
}

module.exports = {
    userExist,
    protect
}