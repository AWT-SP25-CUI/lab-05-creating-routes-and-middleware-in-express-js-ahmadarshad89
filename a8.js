const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));


app.post('/submit-form', (req, res) => {

 const name = req.body.name;
 const email = req.body.email;

 res.send(`Name: ${name}, Email: ${email}`);

});


app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});