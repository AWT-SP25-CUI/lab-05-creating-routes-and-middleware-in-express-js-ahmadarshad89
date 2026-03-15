const express = require('express');
const app = express();
const port = 3000;

app.get('/users/:id/orders/:orderId', (req,res)=>{
 	  res.send(`User ${req.params.id} Order ${req.params.orderId}`);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});