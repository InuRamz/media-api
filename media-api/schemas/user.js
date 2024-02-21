'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	userName: {type: String, unique: true, required: true},
	email: { type : String, unique : true, required: true},
	_role: { type: Schema.ObjectId, ref: 'UserRole', required: true },
	password: {type: String, select: false},
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);