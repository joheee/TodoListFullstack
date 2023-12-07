import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { TodoRoute } from './routes/TodoRoute';
import bodyParser from 'body-parser';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors())

app.use('/todo', bodyParser.json(), TodoRoute)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});