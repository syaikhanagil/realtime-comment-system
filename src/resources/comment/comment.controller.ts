import { Router, Request, Response, NextFunction } from 'express';

import CommentService from '@/resources/comment/comment.service';

import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

class CommentController implements Controller {
    public path = '/comment';
    public router = Router();
    private comment = new CommentService();

    constructor() {
        this.router.get(`${this.path}`, this.getComment);
        this.router.post(`${this.path}`, this.createComment);
    }

    private createComment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { username, comment } = req.body;
            const create = await this.comment.createComment(username, comment);
            return res.status(200).json(create);
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    }

    private getComment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const create = await this.comment.getComment();
            return res.status(200).json(create);
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    }
};

export default CommentController;
