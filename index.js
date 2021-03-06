const Joi = require('joi');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * Our amazingly detailed array of coffees.
 */
const COFFEES = [
    { id: 1, name: 'Colombian' },
    { id: 2, name: 'Italian' },
    { id: 3, name: 'Ethiopian' },
];

/**
 * Get the homepage
 */
app.get('/', (req, res) => {
    res.send('Welcome to the most advanced coffee API in the world');
});

/**
 * Get all coffees
 */
app.get('/api/coffees', (req, res) => {
    res.send(COFFEES);
});


/**
 * Get a coffee with a specific ID
 */
app.get('/api/coffees/:id', (req, res) => {
    const coffee = COFFEES.find(c => c.id === parseInt(req.params.id));
    if(!coffee) return res.status(404).send('A coffee with the given ID was not found.');
    res.send(coffee);
});

/**
 * Add a new coffee
 */
app.post('/api/coffees', (req, res) => {

    const { error } = validateCoffee(req.body); // Destructured
    if (error) return res.status(400).send(error.details[0].message);

    const coffee = {
        id: COFFEES.length + 1,
        name: req.body.name
    };

    COFFEES.push(coffee);
    res.send(coffee);
});

/**
 * Update an existing coffee's name
 */
app.put('/api/coffees/:id', (req, res) => {
    const coffee = COFFEES.find(c => c.id === parseInt(req.params.id));
    if(!coffee) return res.status(404).send('A coffee with the given ID was not found.');

    const { error } = validateCoffee(req.body); // Destructured
    if(error) return res.status(400).send(error.details[0].message);

    coffee.name = req.body.name;
    res.send(coffee);
});

/**
 * Deleted an existing coffee
 */
app.delete('/api/coffees/:id', (req, res) => {
    const coffee = COFFEES.find(c => c.id === parseInt(req.params.id));
    if(!coffee) res.status(404).send('A coffee with the given ID was not found.');

    // Delete
    COFFEES.splice(COFFEES.indexOf(coffee));
    res.send(coffee);
});

/**
 * Return whether this is a valid coffee object
 */
function validateCoffee(coffee) {
    
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(coffee, schema);
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));