// users controllers
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User .findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.status(200).send({ user, token });
    }
    catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    register,
    login
};  