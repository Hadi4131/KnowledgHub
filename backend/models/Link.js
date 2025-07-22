const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true }, // <-- ADDED THIS LINE
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Link', LinkSchema);