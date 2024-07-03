import * as express from "express";
import * as path from "path";
import { HelloRequest } from "./proto-bundle";

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
const basePath = path.join(__dirname, '..');

const failObj = "";
const okObject = {name: 'World'};

app.use(express.static(path.join(basePath, 'public')))
  .set('views', path.join(basePath, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  const plainObj: any = Math.random() > 0.5 ? failObj : okObject;

  const errMsg = HelloRequest.verify(plainObj);
  if (errMsg)
    return res.status(400).send('API_ERROR: ' + errMsg);
  
  const messageFromPlain = HelloRequest.create(plainObj);
  const buffer = HelloRequest.encode(messageFromPlain).finish();
  const finalMessage = HelloRequest.decode(buffer);

  res.json(HelloRequest.toObject(finalMessage));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
