import { Request } from 'express';
import { Error } from '../lib/error'

// read json from request body
export function readReqJSON(req: Request): Error | any {

  if (req.headers['content-type'] !== 'application/json') {
    return new Error(400, 'invalid content-type')
  }

  const body = req.body
  if (!body) {
    return new Error(400, 'invalid body')
  }

  return body
}
