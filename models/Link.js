const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    short: {type: String, required: true},
    url: {type: String, required: true},
    clicks: {type: Number, default: 0}
});

const Link = mongoose.model('link', linkSchema);

module.exports = Link;