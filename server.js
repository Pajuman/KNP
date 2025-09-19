const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files from dist
app.use(express.static(path.join(__dirname, 'dist/knp')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/knp/browser/index.html'));
});

// Use Railway's PORT environment variable
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
