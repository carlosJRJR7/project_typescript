import express, { Express } from 'express'
import cors from 'cors';
import routes from '../routes';
import connectToMongoDB from '../database';

export default function appConfig(app: Express): void {

    connectToMongoDB()
    app.use(cors());
    app.use(express.json());
    app.use(routes)
    app.use('/imagens', express.static('imagens'));
}