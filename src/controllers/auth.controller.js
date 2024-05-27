const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const jwtExpiresIn = '1h'; // Token expiration time

const User = db.users;

exports.register = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const passwordMatch = await bcrypt.compare(req.body.password, hashedPassword);
    var user = {};
    var data = {};

    var whereCondition_userFindOne = {
        email: req.body.email
    };

    const userFindOne = await User.findOne({ where: whereCondition_userFindOne });

    if (userFindOne) {
        return res.status(400).json({
            code: 400,
            message: "Email been registed!",
            data: data,
        });
    }

    if (passwordMatch) {
        user = {
            email: req.body.email,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber || null,
            password: hashedPassword,
        }

        User.create(user)
            .then((data) => {
                res.status(200).json({
                    code: 200,
                    message: "User registered successfully.",
                    data: data,
                });
            })
            .catch((err) => {
               return res.status(500).json({
                    message: err.message || "Some error occurred while registering user.",
                    data: null,
                });
            });
    }
}

exports.login = async (req, res) => {
    const data = {};

    try {
        var whereCondition_userFindOne = {
            email: req.body.email
        };

        const userFindOne = await User.findOne({ where: whereCondition_userFindOne });

        if (!userFindOne) {
            return res.status(404).json({
                code: 404,
                message: "User not found !.",
                data: data,
            });
        }

        const hashedPassword = userFindOne.password;
        const matchPassword = await bcrypt.compare(req.body.password, hashedPassword);

        if (matchPassword) {
            data.token = jwt.sign({ userId: userFindOne.id, userName: userFindOne.name }, process.env.JWT_SECRET, { expiresIn: jwtExpiresIn });
            data.user = {
                name: userFindOne.name,
                email: userFindOne.email,
                phoneNumber: userFindOne.phoneNumber,
            };

            return res.status(200).json({
                code: 200,
                message: "User login successfully.",
                data: data,
            });
        } else {
            return res.status(400).json({
                code: 400,
                message: "Invalid credentials!.",
                data: data,
            });
        }

    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while login user.",
            data: null,
        });
    }


}