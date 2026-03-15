const express = require('express');
const app = express();
const port = 3000;


const loggerMiddleware = (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next(); 
};


const authMiddleware = (req, res, next) => {
  
  const isAuthenticated = false;

  if (isAuthenticated) {
    next(); 
  } else {
    res.status(401).send('Unauthorized'); 
  }
};

// Use middleware
app.use(loggerMiddleware);
app.use(authMiddleware);

// Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});