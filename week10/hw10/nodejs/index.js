
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic route with redirect to root URL
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// Serve static files
app.use(express.static('./'));

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: './' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Access your website at http://localhost:${port}/`);
  
});
