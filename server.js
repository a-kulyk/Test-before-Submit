var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.post('/index', function(req, res) {
    var iputData = req.body.value;
    console.log(iputData);
    if (iputData && /^[a-zA-Z\s]+$/.test(iputData)) {
      res.json({"testResult": "OK"});
    } else res.json({"testResult": "KO", "testResultDetail": "Incorrect input!"});
});

var port = 8000;
app.listen(port, function() {
  console.log("Listening on port 8000");
});

