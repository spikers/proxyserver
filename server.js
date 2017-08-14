const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/', (req, res) => {
  let options = { 
    method: 'GET',
    uri: req.body.uri,
    qs: {},
    headers: {
      'cache-control': 'no-cache' 
    }
  };

  // Add all the query string information to the options
    for (let i = 0, keys = Object.keys(req.body); i < keys.length; i++) {
    let restrictedKeyList = ['uri', 'url'];

    // This means we have a usable key (not restricted)
    if (restrictedKeyList.indexOf(keys[i]) == -1) {
      options.qs[keys[i]] = req.body[keys[i]];
    }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.end(body);
  });
});


app.listen(PORT, () => {
  console.log('Listening on PORT ', PORT);
});