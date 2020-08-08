import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'



const routes = express.Router()

const classesControllers = new ClassesController()
const connectionControllers = new ConnectionsController()

routes.post('/classes', classesControllers.create)
routes.get('/classes', classesControllers.index)

routes.post('/connections', connectionControllers.create)
routes.get('/connections', connectionControllers.index)

export default routes