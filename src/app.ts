import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';

import Controller from '@/utils/interfaces/controller.interface';
import errorMiddleware from '@/middlewares/error.middleware';

import io from '@/utils/io';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeDatabaseConnection();
        this.initializeSocketConnection();
        this.initializeErrorHandler();
    }

    private initializeMiddleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((c: Controller) => {
            this.express.use('/api', c.router);
        })
    }

    private initializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASS, MONGO_PATH } = process.env;

        /**
         * use docker container
         */
        // mongoose.connect(`mongodb://${MONGO_PATH}`, {
        //     user: MONGO_USER,
        //     pass: MONGO_PASS
        // })

        /**
         * use mongodb compas
         */
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_PATH}`)
    }

    private initializeSocketConnection(): void {
        io.on('connection', (socket) => {
            console.log(`New Connection ${socket.id}`)

            socket.on('comment', (data) => {
                data.time = Date();
                socket.broadcast.emit('comment', data);
            })

            socket.on('typing', (data) => {
                socket.broadcast.emit('typing', data)
            })
        });
    }

    private initializeErrorHandler(): void {
        this.express.use(errorMiddleware);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log('App running on => ', `http://localhost:${this.port}`)
        });
    }
}

export default App;
