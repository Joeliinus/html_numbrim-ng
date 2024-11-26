const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a random number between 1 and 10
const randomNumber = Math.floor(Math.random() * 10) + 1;

app.post('/kontrolli_arvamus', (req, res) => {
    const arvamus = req.body.arvamus;

    // Check if the guess is valid (between 1 and 10)
    if (!arvamus || arvamus < 1 || arvamus > 10) {
        return res.json({ sonum: "Sisesta arv vahemikus 1 kuni 10!" });
    }

    // Check if the guess is correct, too low, or too high
    if (arvamus == randomNumber) {
        res.json({ sonum: "Õige! Sa arvasid numbri ära!" });
    } else if (arvamus < randomNumber) {
        res.json({ sonum: "Vale! Arv on suurem." });
    } else {
        res.json({ sonum: "Vale! Arv on väiksem." });
    }
});

// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`Server kuulab porti ${port}`);
});
