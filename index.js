const express = require('express');
const path = require('path');
const { parseFile, parse, YAMLCraftError } = require('yamlcraft');

const app = express();
const PORT = 3000;

// Middleware to parse text and json bodies
app.use(express.text({ type: ['text/yaml', 'text/plain', 'application/yaml'] }));
app.use(express.json());

// 1. Read YAML config file synchronously on startup
const config = parseFile(path.join(__dirname, 'config.yaml'));

// GET / - Returns parsed config from config.yaml
app.get('/', (req, res) => {
  res.json({
    message: 'Express server running with yamlcraft!',
    config,
  });
});

// POST /parse - Parses raw YAML string from request body
app.post('/parse', (req, res) => {
  try {
    const yamlString = typeof req.body === 'string' ? req.body : req.body?.yaml;

    if (!yamlString) {
      return res.status(400).json({ error: 'Please provide YAML content in the request body.' });
    }

    const data = parse(yamlString);
    res.json({ success: true, data });
  } catch (err) {
    if (err instanceof YAMLCraftError) {
      return res.status(400).json({
        error: err.message,
        line: err.line,
        column: err.column,
      });
    }
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
