const { generateToken, generateAdminToken } = require('../helpers/generateToken')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require('../models')

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, nationalId, batteryId, password, isAdmin } = req.body

        if (!name || !phone || !nationalId || !password) return res.status(400).json({ error: 'please enter all required fields' })

        const data = {
            name,
            email,
            phone,
            isAdmin,
            nationalId,
            batteryId,
            password: await bcrypt.hash(password, 10)
        }

        const newUser = await User.create(data)

        if (newUser) return res.status(200).json(newUser)

    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({
            where: {
                email
            },
        });

        if (userExist) {
            const isSame = await bcrypt.compare(password, userExist.password);

            if (isSame && userExist.isAdmin) {
                res.json({
                    id: userExist.id,
                    name: userExist.name,
                    email: userExist.email,
                    isAdmin: userExist.isAdmin,
                    token: generateAdminToken(userExist.id)

                })

            } else if (isSame && !userExist.isAdmin) {
                res.json({
                    id: userExist.id,
                    name: userExist.name,
                    email: userExist.email,
                    isAdmin: userExist.isAdmin,
                    token: generateToken(userExist.id)

                })
            }
            else {
                return res.status(401).json({ error: "Invalid Password" });
            }
        } else {
            return res.status(401).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        console.log(error);
    }
}

const getUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.userId
        }, include: ['batteries']
    }).then(user => {
        res.status(200).json(user)
    }).catch(error => console.log(error));
}

const getAllUsers = async (req, res) => {
    const users = await User.findAll({
        include: 'batteries'
    });
    res.status(200).json(users)
}


module.exports = {
    registerUser,
    login,
    getUser,
    getAllUsers
}