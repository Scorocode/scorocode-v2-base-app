
import { Response, Request, Router } from 'express';

const router: Router = Router();

// service handler (required) DON'T EDIT
router.get('/healthz', (_: Request, res: Response) => {
  res.status(200).send('OK')
})

export default router
