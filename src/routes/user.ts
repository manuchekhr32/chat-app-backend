import * as controller from '../controllers/user'

const routes: Array<any> = [
  {
    path: '/get/:username',
    controllers: [controller.get],
    method: 'get',
  }
]

export default {
  path: '/user',
  routes: routes,
  defaultMethod: 'post'
}