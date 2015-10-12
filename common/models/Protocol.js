var mongoose = require('mongoose');

var protocolSchema = mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Protocol', protocolSchema);
