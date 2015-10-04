var mongoose = require('mongoose');

var protocolSchema = mongoose.Schema({
    title: String
});

module.exports = mongoose.model('Protocol', protocolSchema);
