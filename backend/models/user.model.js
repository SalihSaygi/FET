const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    email: {
        type: String,
        required: true,
        minlength: 7,
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 11,
    },
    currentRank: {
        type: String,
        required: true,
        enum: [
            'Newbie',
            'Experienced', 
            'Unfortunate', 
            'Main Character', 
            'Protector of Streets',
            'Detective', 
            'Sherlock']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    adress: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 2,
    },
    googleId: {
        type: String,
    },
    profilePhoto: {
        type: String
    },
    details: [
        {
        age: {
            type: Number,
            trim: true
        },
        pronons: {
            type: String,
            enum: ['he/him', 'she/her', 'others']
        },
        nationality: {
            type: String,
            trim: true
        }
},],
    reports: [{type: mongoose.Schema.Types.ObjectId, ref: 'Report'}]
}, {
    timestamps: true,
})

UserSchema.pre('save', function(next){
    if(!this.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
};

module.export = User = mongoose.model('User', UserSchema)