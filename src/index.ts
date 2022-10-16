import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import CommentController from './resources/comment/comment.controller';

const app = new App([
    new CommentController()
], Number(process.env.PORT));

app.listen();
