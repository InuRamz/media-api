const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
	title: { type: String, required: true, unique: true },
	content: { type: String },
	_thematic: { type: Schema.ObjectId, ref: 'Thematic', required: true },
	_owner: { type: Schema.ObjectId, ref: 'User', required: true },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);