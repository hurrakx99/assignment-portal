const express = require('express');
const { registerUser, loginUser, uploadAssignment, getAllAdmins } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', protect, uploadAssignment);  // Protected route for uploading assignments
router.get('/admins', getAllAdmins);

module.exports = router;
