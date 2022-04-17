import { Response } from "express"

export const serverError = (err: any, res: Response) => {
  res.status(500).json({
    msg: 'Internal server error',
    details: err
  })
}