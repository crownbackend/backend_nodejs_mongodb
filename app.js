const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const Thing = require("./models/Thing")

const app = express();

mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())

app.post("/api/stuff", (req, res, next) => {
    delete req.body._id
    const thing = new Thing({
        ...req.body
    })
    thing.save()
        .then(() => res.status(201).json({message: "Objet enregistré"}))
        .catch(err => res.status(400). json({err}))
    next()
})

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({"_id": req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(err => res.status(404). json({err}))
})

app.get('/api/stuff', (req, res, next) => {
   Thing.find()
       .then(things => res.status(200).json(things))
       .catch(err => res.status(400). json({err}))
});

module.exports = app