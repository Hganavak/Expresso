const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const COFFEES = [
    { id: 1, name: 'Colombian' },
    { id: 2, name: 'Italian' },
    { id: 3, name: 'Ethiopian' },
];

app.get('/', (req, res) => {
    res.send('Welcome to the most advanced coffee API in the world');
});

app.get('/api/coffees', (req, res) => {
    res.send(COFFEES);
});

app.get('/api/coffees/:id', (req, res) => {
    const COFFEE = COFFEES.find(c => c.id === parseInt(req.params.id));
    if(!COFFEE) res.status(404).send('A coffee with the given ID was not found.');
    res.send(COFFEE);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));