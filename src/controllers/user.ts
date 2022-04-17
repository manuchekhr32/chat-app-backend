import { User } from '../models';
import { serverError } from "../utils/error"
import { Request, Response } from 'express';

export const get = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: {
        username
      },
      attributes: ['firstName', 'lastName', 'username', 'id']
    })
    if (!user) return res.status(404).json({ message: `User (${username}) not found` });
    return res.status(200).json(user);
  }
  catch (err) {serverError(err, res)}
}