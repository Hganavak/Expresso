const Joi = require('joi');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
    const coffee = COFFEES.find(c => c.id === parseInt(req.params.id));
    if(!coffee) res.status(404).send('A coffee with the given ID was not found.');
    res.send(coffee);
});

app.post('/api/coffees', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
    }
    const coffee = {
        id: COFFEES.length + 1,
        name: req.body.name
    };
    COFFEES.push(coffee);
    res.send(coffee);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));