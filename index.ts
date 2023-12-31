import 'dotenv/config';
import express from "express"
import cors from 'cors';

var app = express();


app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (_, res) {
  res.render('index');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  const ipaddress  = req.header('x-forwarded-for') ||
						req.socket.remoteAddress;
  const language = req.headers["accept-language"] 
  const software = req.headers["user-agent"]
  res.json({ ipaddress, language, software});
});

// listen for requests :)
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
