import express, { request } from 'express';
import knex from './database/connection';

import PointsController from "./controllers/PointsControllers";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index); 

routes.post('/points', pointsController.create);

export default routes;
