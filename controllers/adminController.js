const User = require('../models/User');
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');


const registerAdmin = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const admin = await User.create({ userId, password, isAdmin: true });
        res.status(201).json({
            _id: admin._id,
            userId: admin.userId,
            token: generateToken(admin._id)
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const loginAdmin = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const admin = await User.findOne({ userId, isAdmin: true });
        if (admin && await admin.matchPassword(password)) {
            res.json({
                _id: admin._id,
                userId: admin.userId,
                token: generateToken(admin._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid admin userId or password' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ admin: req.user.userId });
        res.json(assignments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const acceptAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
        res.json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const rejectAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
        res.json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerAdmin, loginAdmin, getAssignments, acceptAssignment, rejectAssignment };
