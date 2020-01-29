const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the most advanced coffee API in the world');
});

app.get('/api/coffees', (req, res) => {
    res.send([
        { id: 1, coffee: 'Colombian'}
    ]);
});



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));