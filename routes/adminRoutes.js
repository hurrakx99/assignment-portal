const express = require('express');
const { registerAdmin, loginAdmin, getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const { protect, adminProtect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments', protect, adminProtect, getAssignments);  // Protected route for getting assignments tagged to the admin
router.post('/assignments/:id/accept', protect, adminProtect, acceptAssignment);  // Accept an assignment
router.post('/assignments/:id/reject', protect, adminProtect, rejectAssignment);  // Reject an assignment

module.exports = router;
