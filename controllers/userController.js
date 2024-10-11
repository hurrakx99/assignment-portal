const User = require('../models/User');
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await User.create({ userId, password });
        res.status(201).json({
            _id: user._id,
            userId: user.userId,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const loginUser = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await User.findOne({ userId });
        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                userId: user.userId,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid userId or password' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const uploadAssignment = async (req, res) => {
    const { task, admin } = req.body;
    try {
        const assignment = await Assignment.create({ userId: req.user.userId, task, admin });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ isAdmin: true });
        res.json(admins);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerUser, loginUser, uploadAssignment, getAllAdmins };
