const express = require('express');
const cookieParser = require('cookie-parser'); // import cookie-parser

const app = express();
const port = 3000;

// Use cookie-parser middleware
app.use(cookieParser());

// ---------------------------
// Route to set a cookie
// ---------------------------
app.get('/set-cookie', (req, res) => {
    // Set a cookie named 'myCookie' with value 'hello'
    res.cookie('myCookie', 'hello', {
        maxAge: 900000,   // 15 minutes
        httpOnly: true    // cannot be accessed by client-side JS
    });

    res.send('Cookie has been set');
});

// ---------------------------
// Route to read the cookie
// ---------------------------
app.get('/read-cookie', (req, res) => {
    const myCookieValue = req.cookies.myCookie; // read the cookie

    if (myCookieValue) {
        res.send(`Cookie value: ${myCookieValue}`);
    } else {
        res.send('Cookie not found');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});