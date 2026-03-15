const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Serve static files from 'public' (form.html etc.)
app.use(express.static('public'));

// Middleware to parse form data (Activity 8)
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse JSON data (Activity 9)
app.use(bodyParser.json());

// -------------------------
// Activity 8: Handle form POST
// -------------------------
app.post('/submit-form', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    // Send response back
    res.send(`Name: ${name}, Email: ${email}`);
});

// -------------------------
// Activity 9: Handle JSON POST
// -------------------------
app.post('/submit-json', (req, res) => {
    const data = req.body; // JSON object from client
    console.log(data);     // logs in terminal

    // Send JSON response
    res.json({
        message: 'JSON data received',
        data: data
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});