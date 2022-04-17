import path from "path";
import { Request, Response, Router } from 'express';
const router: any = Router();

import auth from './auth'
import message from './message'
import user from './user'

const routes = [auth, message, user];

routes.forEach(route => {
  for (let ri of route.routes) {
    router[ri.method ? ri.method : route.defaultMethod](route.path + ri.path, [...ri.controllers])
  }
})

router.get('/files/:filename', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../uploads/', req.params.filename))
})

export default router;