import * as controller from '../controllers/auth'

const routes: Array<any> = [
  {
    path: '/login',
    controllers: [controller.login]
  },
  {
    path: '/register',
    controllers: [controller.register]
  },
  {
    path: '/check',
    controllers: [controller.check]
  },
]

export default {
  path: '/auth',
  defaultMethod: 'post',
  routes
}