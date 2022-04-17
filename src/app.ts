import express from 'express';
import { Application } from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env'})
const app: Application = express();
import "./socket"
import cors from 'cors';
import './models';
import sedb from './utils/db';
import routes from './routes';

app.use(cors({
  origin: '*'
}))

declare module "express" { 
  export interface Request {
    user: any,
    headers: any
  }
}

app.use(express.json())
app.use(routes);

sedb.sync({
  force: false
})
.then(() => {
  app.listen(process.env.PORT || 9000);
})
.catch((err: any) => console.log(err))