const express = require('express');
const app = express();
const port = 3000;

app.get('/products',(req,res)=>{
   const {category,maxPrice} = req.query;
   res.send(`Category: ${category}, Max Price: ${maxPrice}`);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});