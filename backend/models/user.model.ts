import mongoose, { Document, Schema, model, Model, Types, Mongoose } from 'mongoose'
import { NextFunction } from 'express'
import bcrypt from 'bcrypt'

// mongoose.set('toJSON', { virtuals: true });

//ENUMS

enum currentRank {
    Newbie = 'Newbie',
    AnimalLover = 'Animal Lover',
    FinderOfTheLosts = 'Finder of the Losts',
    AnimalDetective = 'Animal Detective',
}

enum role {

}

enum pronouns {
    
}

export interface IUserSchema extends Document {
    nickname: string;
    firstName: string;
    lastName: string;
    password: string;
    hash: string;
    salt: string;
    googleId: string;
    email: string;
    phoneNumber: number;
    currentRank: currentRank;
    role: string;
    adress: string;
    numberOfFindings: number;
    profilePhoto: Buffer;
    reports: Types.ObjectId;
    age: number;
    pronouns: string;
    bio: string;
}

const UserSchema: Schema = new Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    firstName: {
        type: String,
        required: true,
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
    hash: String,
    salt: String,
    googleId: String,
    email: {
        type: String,
        required: true,
        minlength: 7,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 11,
        unique: true
    },
    currentRank: {
        type: String,
        required: true,
        enum: [
            'Newbie',
            'Animal Lover',
            'Finder of the Losts',
            'Animal Detective',
        ]
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'developer', 'animalControl', 'dbModerator'],
        required: true
    },
    adress: {
        type: String,
        required: false,
        trim: true,
        minlength: 1,
        maxlength: 2,
    },
    numberOfFindings: {
        type: Number,
        required: true,
    },
    profilePhoto: {
        data: Buffer,
        contentType: String
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PublicReport'
    }],
    age: {
        type: Number,
        trim: true,
        required: false
    },
    pronouns: {
        type: String,
        enum: ['he/him', 'she/her', 'others'],
        required: false
    },
    bio: {
        type: String,
        required: false
    },
}, {
    timestamps: true,
})

UserSchema.virtual('fullName').
  get(function() { return `${this.firstName} ${this.lastName}`; }).
  set(function(v) {
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
})

UserSchema.pre<IUserSchema>('save', async function(next: NextFunction){
    const user = this
    if(!this.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)
        bcrypt.hash(UserSchema.password, salt, (err: mongoose.Error, hash) => {
            if(err) return next(err)
            UserSchema.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb): void {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
};

export const User: Model<IUserSchema> = mongoose.model('User', UserSchema)