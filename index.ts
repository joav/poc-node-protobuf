import * as express from "express";
import * as path from "path";
import { HelloRequest, HelloResponse } from "./proto-bundle";
import * as $protobuf from "protobufjs";

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
const basePath = path.join(__dirname, '..');

app.use(express.raw({type: 'application/protobuf; proto=com.joav.HelloRequest'}))

app.use(express.static(path.join(basePath, 'public')))
  .set('views', path.join(basePath, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api', (req, res) => {
  try {
    console.log( req.body )
    console.log(req.headers)
    const helloRequest = HelloRequest.decode(req.body);
    const messageFromPlain = HelloResponse.create({
      message: `Hello ${helloRequest.name}`
    });
    const buffer = HelloResponse.encode(messageFromPlain).finish();
    res.header('Content-Type', 'application/protobuf; proto=com.joav.HelloResponse');
    res.send(buffer);
  } catch (error) {
    if (error instanceof $protobuf.util.ProtocolError) {
      res.status(400)
        .send('API_ERROR: ' + error.message+typeof req.body);
      return;
    }
    res.status(500)
      .send('API_ERROR: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 
