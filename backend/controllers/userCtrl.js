const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
    console.log(req.body)
    //res.json(req.body)
    bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {
            console.log(hashedPassword)
            const newUser = new User({
                email: req.body.email,
                password: hashedPassword
            })
            console.log('user', newUser)
            newUser.save()
                .then(() => res.status(200).json({ message: 'User created !' }))
                .catch(err => res.status(400).json({ err: 'Cannot save user' }))
        })
        .catch(err => res.status(500).json({ err: 'Server Err' }))
}


exports.login = (req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user, req.body.password)
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) res.status(401).json({ message: 'Invalid password' })
                    const token = jwt.sign(
                        { userId: user._id },
                        'SECRET_KEY',
                        { expiresIn: '24h' }
                    )
                    res.status(200).json({
                        userId: user._id,
                        token
                    })
                })
                .catch(err => res.status(500).json({ 'err': err }))
        })
        .catch(err => res.status(404).json({ message: 'user not found' }))
}