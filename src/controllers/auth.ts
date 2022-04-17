import { serverError } from "../utils/error"
import { User, Message } from "../models"
import { hash, isEqual } from '../utils/bcrypt';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, _password } = req.body;
  
    const user: any = await User.findOne({
      where: { username: username },
    });
    if (!user) return res.status(401).json({ message: 'User not found' });
  
    const checkPass = await isEqual(_password, user._password);
    if (!checkPass) return res.status(401).json({ message: 'Password is incorrect' });
    
    const updatedPassword = await hash(_password);
    user._password = updatedPassword;
    const logedUser = await user.save();
    
    res.status(200).json(logedUser);
  }
  catch (err) {serverError(err, res)}
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, _password, firstName, lastName } = req.body;
    if (username.length < 3 || _password.length < 3 || firstName.length < 3 || lastName.length < 3) return res.status(406).json({ message: 'Invalid data! The characters must be least 3' });

    const user: any = await User.findOne({ 
      where: { username: username },
    });
    if (user) return res.status(303).json({ message: `The username ${username} is already exist` });
    
    const newUser = await User.create({
      username: username.toLowerCase(),
      firstName, lastName,
      _password: await hash(_password),
    })
    
    res.status(201).json(newUser)
  }
  catch (err) {serverError(err, res)}
}

export const check = async (req: Request, res: Response) => {
  try {
    const { username, _password } = req.body;
  
    const user: any = await User.findOne({ 
      where: { username: username, _password: _password },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json({ 'ok': true })
  }
  catch (err) {serverError(err, res)}
}