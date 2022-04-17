import { serverError } from "../utils/error"
import { User, Message } from "../models"
import { Request, Response } from 'express';

export const send = async (req: Request, res: Response) => {
  const { to } = req.params;
  const text = req.body.text;
  const messageObj = await req.user.createMessage({
    to: to,
    text: text,
  })
  res.status(201).json(messageObj);
}

export const getByUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    if (username == req.user.username) return res.status(406).json({ error: 'You cannot send message to yourself' });

    const user: any = await User.findOne({
      where: { username: username.toLowerCase() },
      attributes: ['username', 'firstName', 'lastName', 'id']
    })
    if (!user) return res.status(404).json({ error: 'User not found' });
    const userMessages = await Message.findAll({
      where: {
        from: req.user.id,
        to: user.id
      },
    })
    const messagesOtherSide: any = await Message.findAll({
      where: {
        from: user.id,
        to: req.user.id,
      },
    })
    const messages = [...userMessages, ...messagesOtherSide].sort((a, b) => {return a.id - b.id})
    res.status(200).json({
      messages: messages,
      user: user
    });
  }
  catch (err) {serverError(err, res)}
}