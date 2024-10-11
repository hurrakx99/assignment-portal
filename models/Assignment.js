const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.String,
            ref: 'User',  
            required: true,
        },
        task: {
            type: String,
            required: true,
        },
        admin: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
