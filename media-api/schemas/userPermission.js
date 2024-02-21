'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPermissionSchema = Schema({
	slug: {type: String, unique: true, required: true},
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserPermission', UserPermissionSchema);