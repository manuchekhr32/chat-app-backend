import { User } from "../models"
import { serverError } from "../utils/error"
import { Request, Response, NextFunction } from "express"

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, _password } = JSON.parse(req.headers.authorization);
    const user: any = await User.findOne({
      where: { username: username }
    })
    if (!user) return res.status(401).json({ error: 'User not found' })
    const passwordCheck = user._password === _password;
    if (!passwordCheck) return res.status(401).json({ error: 'Password incorrect' })
    req.user = user;
    next()
  }
  catch (err) {serverError(err, res)}
}