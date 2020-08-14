import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'
import UsersController from './controllers/UsersController'



const routes = express.Router()

const classesControllers = new ClassesController()
const connectionControllers = new ConnectionsController()
const usersController = new UsersController()

routes.post('/classes', classesControllers.create)
routes.get('/classes', classesControllers.index)

routes.post('/connections', connectionControllers.create)
routes.get('/connections', connectionControllers.index)

routes.post('/signup', usersController.create)
routes.post('/update-user', usersController.update)
routes.get('/login', usersController.index)


export default routes