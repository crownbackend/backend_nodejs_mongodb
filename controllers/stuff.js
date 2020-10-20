const Thing = require("../models/Thing")

exports.createThing = (req, res, next) => {
    delete req.body._id
    const thing = new Thing({
        ...req.body
    })
    thing.save()
        .then(() => res.status(201).json({message: "Objet enregistré"}))
        .catch(err => res.status(400). json({err}))
}

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({'_id': req.params.id}, {...req.body, '_id': req.params.id})
        .then(() => res.status(200).json({message:"objet modifier"}))
        .catch(err => res.status(400). json({err}))
}

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({"_id": req.params.id})
        .then(() => res.status(200).json({message: 'Objet supprimé'}))
        .catch(err => res.status(400). json({err}))
}

exports.getOneThing = (req, res, next) => {
    Thing.findOne({"_id": req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(err => res.status(404). json({err}))
}

exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(err => res.status(400). json({err}))
}