import * as express from "express";
import * as path from "path";

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
const basePath = path.join(__dirname, '..');

app.use(express.static(path.join(basePath, 'public')))
  .set('views', path.join(basePath, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({"msg": "Hello world"});
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
