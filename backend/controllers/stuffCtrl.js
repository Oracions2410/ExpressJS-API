const Thing = require('../models/thing')

exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => {
            res.status(200).json(things)
        })
        .catch(err => res.status(500).json(err))
}

exports.getOneThing = (req, res, next) => {

}

exports.createThing = (req, res, next) => {

    console.log(req.files)
    res.json({ files: req.files, body: req.body })



    // newThing.save()
    //     .then(() => res.status(201).json({ newThing }))
    //     .catch(err => res.status(400).json({ err }))
}

exports.modifyThing = (req, res, next) => {

}

exports.deleteThing = (req, res, next) => {

}