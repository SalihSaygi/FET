import { Document, Schema, model, Model, Types } from 'mongoose'

interface IComment extends Document {
    text: string;
    commentedBy: Types.ObjectId;
    likes: number;
    replies: this[];
}

const CommentSchema: Schema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    likes: {
        type: Number
    },
    replies: [ this ],
}, 
    {
    timestamps: true,
}) 

export const Comment: Model<IComment> = model('Comment', CommentSchema)