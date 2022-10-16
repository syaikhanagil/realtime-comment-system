import { Schema, model } from 'mongoose';
import Comment from '@/utils/interfaces/comment.interface';

const CommentSchema = new Schema<Comment>({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model('Comment', CommentSchema);
