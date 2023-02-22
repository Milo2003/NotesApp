const moongose = require('mongoose');
const { Schema } = moongose;

const NoteSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    date: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = moongose.model('Note', NoteSchema)
