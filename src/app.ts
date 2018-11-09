import * as express from 'express'
import custom from './controllers/custom'
import service from './controllers/service'

const router: express.Router = express.Router({
  caseSensitive: true,
  mergeParams: false,
  strict: false,
});

// service handler (required)
router.use('/', service)

// custom handlers
router.use('/', custom)

const app: express.Express = express()
app.use(express.json())
app.use(router)

export default app
