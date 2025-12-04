import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {ProductModel} from '../models/Product';
import verifyAuthToken from '../middlewares/verifyAuthToken.js';

const store = new ProductModel();

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

export const create = async (req: Request, res: Response) => {
  // إنشاء المنتج الجديد
  const product = await store.create(req.body)
  res.json(product)
}

const Product_routes = (app: express.Application) => {
  
  app.get('/products/index', Myindex)
  app.get('/products/get/:id', show);
  app.post('/products/create', verifyAuthToken, create);
};
export default Product_routes;
/*
import express, { Request, Response } from 'express';
import verifyAuthToken from '../middlewares/verifyAuthToken.js';
import { ProductModel } from '../models/Product';

const store = new ProductModel();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  const product = await store.create(req.body);
  res.json(product);
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

export default productRoutes;*/

