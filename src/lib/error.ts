import { Response } from 'express';

export class Error {
  private code: number
  private message: string

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }

  public toRes(res: Response) {
    res.status(this.code).send(this.message)
  }
}

export function isError(val: Error | any): boolean {
  return (val instanceof Error)
}
