// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
  console.log(req);
});

app.get("/api/:date", function (req, res) {
  let dateParam = req.params.date;
  let dateUTC;
  let dateUNIX;
  
  if (dateParam.includes("-")) {
    let [year, month, day] = dateParam.split("-").map(Number);
    dateUTC = new Date(Date.UTC(year, month-1, day)).toUTCString();
    dateUNIX = Date.parse(dateUTC);
  } else {
    dateUTC = new Date(Number(dateParam)).toUTCString();
    dateUNIX = dateParam;
  }
  
  let msg = {
    unix: dateUNIX,
    utc: dateUTC
  }
  
  res.send(msg)
  
})



// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
