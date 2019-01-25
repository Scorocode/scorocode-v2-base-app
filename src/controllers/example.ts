import { Router, Request, Response } from 'express';
import { readReqJSON } from '../lib/request'
import { isError } from '../lib/error'
import example from '../models/entity/example'

const router: Router = Router();

// add new item
router.post('/example', (req: Request, res: Response) => {

  const body = readReqJSON(req)
  if (isError(body)) {
    body.toRes(res)
    return
  }

  if (!body.ftext || !body.fbyte) {
    res.status(400).send('invalid body')
    return
  }

  const item = new example()
  item.ftext = body.ftext
  item.fbyte = Buffer.from(body.fbyte)

  item.save().then((val) => {
    res.status(200).send(val)
  }).catch((err) => {
    console.log("error:", err)
    res.status(500).send('internal error')
  })
})

export default router
