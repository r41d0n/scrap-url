var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IndexSchema = new Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    texto: {
        type: String
    },
    palabras: {
        type: Number
    }
});

module.exports = mongoose.model('Index', IndexSchema);