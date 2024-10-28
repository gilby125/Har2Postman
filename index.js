const express = require('express');
const cors = require('cors');
const HarToPostman = require('./lib/har-to-postman.js');

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.static('public'));

// Main conversion endpoint
app.post('/api/convert', (req, res) => {
  try {
      const harContent = req.body.harContent;
      const includeTest = req.body.includeTest || false;
        
      if (!harContent) {
          return res.status(400).json({ error: 'HAR content is required' });
      }

      const postmanCollection = HarToPostman.createPostmanCollection(harContent, includeTest);
      res.json({ collection: postmanCollection });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Har2Postman service running on port ${port}`);
});