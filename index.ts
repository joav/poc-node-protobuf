import * as express from "express";
import * as path from "path";
import { HelloResponse } from "./proto-bundle";
import protoParser from "./proto.parser";
import proto, { ProtoRequest, ProtoResponse } from "./proto.middleware";

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
const basePath = path.join(__dirname, '..');

app.use(protoParser);

app.use(express.static(path.join(basePath, 'public')))
  .set('views', path.join(basePath, 'views'))
  .set('view engine', 'ejs');

app.get('/', (_, res) => {
  res.render('index');
});

app.post('/api', proto, (req: ProtoRequest, res: ProtoResponse) => {
  const messageFromPlain = HelloResponse.create({
    message: `Hello ${req.body.name}`
  });
  res.proto(messageFromPlain);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 
