const express = require('express');
const HarToPostman = require('./lib/har-to-postman.js');
const app = express();
const port = 3003;

app.use(express.json());

app.post('/convert', (req, res) => {
  const harContent = req.body.harContent;
  const includeTest = req.body.includeTest || false;
  const result = HarToPostman.createPostmanCollection(harContent, includeTest);
  res.json({ postmanCollection: result });
});

app.listen(port, () => {
  console.log(`Har2Postman service running on port ${port}`);
});

module.exports = HarToPostman;