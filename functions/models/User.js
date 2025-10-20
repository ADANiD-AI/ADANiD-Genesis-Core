// --- Start of functions/models/User.js ---
const mongoose = require('mongoose');
const { SECURITY } = require('../config/settings');

// We use mongoose to define the structure of the Super ID record
const UserSchema = new mongoose.Schema({
    // Primary ADANiD Identifier (The SHA3-512 Hash)
    superID: { 
        type: String, 
        required: true, 
        unique: true,
        index: true 
    },
    // Biometric Hashes (Layer 1-5 data, for verification)
    biometricHashes: {
        type: Object,
        required: true,
    },
    // CNIC/SSN Shards (Encrypted fragments for security)
    cnicShards: {
        type: [String],
        required: true,
        // Validation check for the 5-shard security model
        validate: [
            val => val.length === SECURITY.CNIC_SHARDS_TOTAL, 
            `CNIC shards must be exactly ${SECURITY.CNIC_SHARDS_TOTAL}.`
        ]
    },
    // Governance and Status
    isAccountLocked: { 
        type: Boolean, 
        default: false 
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'FROZEN', 'PENDING_VERIFICATION'],
        default: 'ACTIVE'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', UserSchema);
// --- End of functions/models/User.js ---
