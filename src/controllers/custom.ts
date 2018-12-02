
import { Response, Request, Router } from 'express';
import { join } from 'path';

const router: Router = Router();

router.get('/', (_: Request, res: Response) => {
  const wd = process.cwd()
  res.sendFile(join(wd, '/templates/hello.html'));
});

export default router
