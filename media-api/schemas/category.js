const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = Schema({
	name: { type: String, unique: true, required: true },
	type: { type: String, required: true }, // File, Text, URL
	ext: [{ type: String }],
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);