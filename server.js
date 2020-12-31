// NODE IMPORTS

// EXPRESS IMPORTS
const express = require('express');
const app = express();

// SERVER CONFIG
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
