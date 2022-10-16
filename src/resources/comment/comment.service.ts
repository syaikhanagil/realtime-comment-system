import commentModel from "./comment.model";

class CommentService {
    private comment = commentModel;

    public async createComment(
        username: string, 
        text: string
    ): Promise<any | Error> {
        try {
            const comment = await this.comment.create({
                username,
                comment: text
            });
            return comment;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    public async getComment(): Promise<any | Error> {
        try {
            const comment = await this.comment.find();
            return comment;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
};

export default CommentService;
