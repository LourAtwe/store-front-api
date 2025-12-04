import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import User_routes from './handlers/UserRoute';
import Product_routes from './handlers/ProductRoute';
import Order_Product_routes from './handlers/Order_ProductRouter';

import dotenv from 'dotenv';
dotenv.config();
console.log('TOKEN_SECRET:', process.env.TOKEN_SECRET);

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

User_routes(app);
Product_routes(app);
Order_Product_routes(app);


app.listen(3003, function () {
console.log(`Server running on http://localhost:${3003}`);});
export {app};