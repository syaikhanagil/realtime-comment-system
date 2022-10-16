import { Document } from 'mongoose';

interface Comment extends Document {
    username: string,
    comment: string
};

export default Comment;
