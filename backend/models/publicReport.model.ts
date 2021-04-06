import { Document, model, Schema, Model, Types } from 'mongoose';
 
interface IPublicReport extends Document {
    title: string;
    animalType: number;
    location: string;
    extraInfo: string;
    imageOrVideo: Buffer;
    updatedAt: Date;
    comments: Types.ObjectId[];
}

const PublicReportSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    animalType: {
        type: Number,
        required: true,
        trim: true,
        select: false
    },
    location: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    extraInfo: {
        type: String,
        required: false,
        trim: true,
        select: false
    },
    imageOrVideo: {
        data: Buffer,
        contentType: String
    },
    updatedAt: { 
        type: Date, default: Date.now
    },
    comments: [{
        type: Schema.Types.ObjectId, ref: 'Comment',
    }],
    likes: {
        type: Number
    }
}, 
    {
    timestamps: true,
})

export const PublicReport: Model<IPublicReport> = model('PublicReport', PublicReportSchema)
