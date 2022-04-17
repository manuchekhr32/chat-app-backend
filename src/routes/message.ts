import * as controller from '../controllers/message';
import isAuthenticated from '../middlewares/auth'

const routes: Array<any> = [
  {
    path: '/send/:to',
    controllers: [isAuthenticated, controller.send],
    method: 'post',
  },
  {
    path: '/get/:username',
    controllers: [isAuthenticated, controller.getByUser],
  },

]

export default {
  path: '/message',
  routes: routes,
  defaultMethod: 'get'
}