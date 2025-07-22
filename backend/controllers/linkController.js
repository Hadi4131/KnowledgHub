const Link = require('../models/Link');
const User = require('../models/User');

exports.getLinks = async (req, res) => {
    try {
        const links = await Link.find().sort({ createdAt: -1 });
        res.json(links);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createLink = async (req, res) => {
    // We now expect 'category' from the frontend
    const { title, url, description, category } = req.body;
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newLink = new Link({
            title,
            url,
            description,
            category, // <-- ADDED THIS
            user: req.user.id,
            userName: user.name,
        });
        const link = await newLink.save();
        res.json(link);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteLink = async (req, res) => {
    try {
        let link = await Link.findById(req.params.id);
        if (!link) return res.status(404).json({ msg: 'Link not found' });
        if (link.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Link.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Link removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};