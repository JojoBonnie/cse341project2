const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        display: function() {
            return `${this.user.firstName} <${this.user.lastName}>`;
        }
    },
    bio: String,
    profilePic: String,
    interests: [String],
    dateOfBirth: Date,
    gender: String,
    occupation: String,
    location: {
        city: String,
        state: String,
        country: String
    },
    social: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

profileSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

profileSchema.virtual('getAge').get(function() {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

profileSchema.virtual('fullName').get(function() {
    return `${this.user.firstName} ${this.user.lastName}`;
});

module.exports = mongoose.model('Profile', profileSchema);