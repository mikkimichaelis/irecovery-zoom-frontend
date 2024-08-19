const audit = require('express-requests-logger');
const express = require('express');
const path = require('path');

const app = express();
// app.use(audit());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
});

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
    console.log("A new request received at " + Date.now());
    if (/(.ico|.js|.css|.jpg|.png|.map|.svg)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

app.use(express.static(path.join(__dirname, 'build')));

// app.use((req, res) => {
//     res.status(200).send('Hello, world!');
// });
// Start the server
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});