const express = require('express');
const path = require('path');
const structures = require('./data/structures');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// API: return all listicle items
app.get('/api/structures', (req, res) => {
  res.json(structures);
});

// API: return one item by slug
app.get('/api/structures/:slug', (req, res) => {
  const structure = structures.find(
    (item) => item.slug === req.params.slug.toLowerCase()
  );

  if (!structure) {
    return res.status(404).json({ error: 'Structure not found' });
  }

  res.json(structure);
});

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Detail page for each list item.
// We check the slug here so an invalid item URL gets a real 404 page.
app.get('/structures/:slug', (req, res) => {
  const structure = structures.find(
    (item) => item.slug === req.params.slug.toLowerCase()
  );

  if (!structure) {
    return res
      .status(404)
      .sendFile(path.join(__dirname, 'public', '404.html'));
  }

  res.sendFile(path.join(__dirname, 'public', 'details.html'));
});

// Catch every route that was not matched above.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Structural Landmarks is running at http://localhost:${PORT}`);
});
