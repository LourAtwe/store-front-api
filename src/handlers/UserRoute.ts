import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/User';
import dotenv from 'dotenv';
import verifyAuthToken from '../middlewares/verifyAuthToken';
dotenv.config();

const store = new UserStore();
const Myindex = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};
const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Product id is required' });
    }
    const product = await store.show(id);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
const create = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };

    try {
        const newUser = await store.create(user);
       // const token =jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string)
        const token = jwt.sign({id: user.id,  user: newUser }, process.env.TOKEN_SECRET as string);
        res.json({ token });
    } catch (err) {
        res.status(400).json({
            error: err instanceof Error ? err.message : err,
            user
        });
    }
};
const User_routes = (app: express.Application) => {

  app.get('/users/index',verifyAuthToken,Myindex)
  app.get('/users/get/:id',verifyAuthToken, show);
  app.post('/users/create', create);
};
export default User_routes;

