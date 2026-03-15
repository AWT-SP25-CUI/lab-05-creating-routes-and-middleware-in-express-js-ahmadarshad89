const express = require('express');
const app = express();
const port = 3000;

app.get('/search', (req, res) => { 
    const query = req.query.q;
     res.send(`Search query: ${query}`);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});