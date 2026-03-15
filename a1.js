const express = require('express');
const app = express();
const port = 3000;

app.get('/users/:id', (req, res) => { const userId = req.params.id;
     res.send(`User ID: ${userId}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});