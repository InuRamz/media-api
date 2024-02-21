const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThematicSchema = Schema({
	name: { type: String, unique: true, required: true },
	front: { type: String, required: true },
	_category: { type: Schema.ObjectId, ref: 'Category' },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thematic', ThematicSchema);