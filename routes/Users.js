const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.get('/', (req, res) => {

    User.find()
        .then((result) => {
            res.status(200).send({success: true, message: 'Fetched Successfully', result});
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to get todo\n" + err.message);
            console.log("Error: Unable to get todo\n", err);
        })

})

users.post('/', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        contact_number: req.body.contact_number,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        student_id: req.body.student_id,
        designation: req.body.designation,
        status: req.body.status,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        //TODO bcrypt
        .then(user => {
            if (!user) {
                User.create(userData)
                    .then(user => {
                        const payload = {
                            _id: user._id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            contact_number: user.contact_number,
                            email: user.email,
                            role: user.role,
                            student_id: user.student_id,
                            designation: user.designation,
                        }
                        res.status(200).json({success: true, message: 'Create Successfully', result: payload})
                    })
                    .catch(err => {
                        res.send({success: false, message: '' + err})
                    })
            } else {
                res.json({success: false, message: 'User already exists'})
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                const payload = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    contact_number: user.contact_number,
                    email: user.email,
                    role: user.role,
                    student_id: user.student_id,
                    designation: user.designation,
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 14400
                })
                res.json({success: true, message: 'LoggedIn Successfully', token: token})
            } else {
                res.status(400).json({success: false, message: 'User does not exist'})
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.get('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const user = await User.findById({_id: id})
        if (user) {
            res.status(200).send({success: true, message: 'Fetched Successfully', result: user})
        } else {
            res.status(400).send({success: false, message: 'User doesn\'t exists'})
        }
    } catch (e) {
        res.status(500).send({success: false, message: '' + e.message})
    }

})

users.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        let user = await User.findByIdAndUpdate(id, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            student_id: req.body.student_id,
            contact_number: req.body.contact_number,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status
        })
        console.log({user})
        if (user) {
            res.status(200).send({success: true, message: 'Updated Successfully', result: user})
        }
    } catch (e) {
        res.status(500).send({success: false, message: '' + e.message})
    }
})

users.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        let user = await User.findByIdAndDelete(id)
        console.log({user})
        if (user) {
            res.status(200).send({success: true, message: 'Deleted Successfully', result: user})
        }
    } catch (e) {
        res.status(500).send({success: false, message: '' + e.message})
    }
})

module.exports = users
