const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.post('/results', (req, res) => {
  const data = req.body;
  const resultsDir = path.join(__dirname, 'saved_results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
  }

  const filePath = path.join(resultsDir, `results_${Date.now()}_${data.userId || 'anon'}.json`);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error('Failed to save results', err);
      res.status(500).json({ status: 'error' });
    } else {
      res.json({ status: 'ok' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
