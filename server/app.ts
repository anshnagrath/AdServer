
import * as express from "express";
import { json } from "body-parser";
import * as morgan from 'morgan';
import { AuthRouter } from './routes/auth/auth.controller';
import { join} from 'path'
;const app = express();
app.use(json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,*');
  next();
});
app.use(morgan("dev"));
app.use(express.static(join(__dirname, 'public')));
app.use('/api', new AuthRouter().getRouter());
app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {
  console.log('Error Occured:',err)
  response.status(err.status || 500);
  response.json({
    status: {
      code: 500,
      message: "Error",
      error: err
    }
  })
});
const server = app.listen(4000, () => console.log("server is up"));
export { server };
