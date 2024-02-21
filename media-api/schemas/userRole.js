'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRoleSchema = Schema({
	name: {type: String, unique: true, required: true},
	_permissions: [{ type: Schema.ObjectId, ref: 'UserPermission' }],
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserRole', UserRoleSchema);