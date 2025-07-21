import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0';

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('Hello! Server is running.');
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
