const express = require('express')
const router = express.Router()
const cors = require('cors')

const Book = require('../models/Book')
const StudentBook = require('../models/StudentBooks')
router.use(cors())

process.env.SECRET_KEY = 'secret'

// request Book
router.post('/requestBook', (req, res) => {
    const data = {
        student_id: req.body.student_id,
        book_id: req.body.book_id,
        // issuance_date: req.body.issuance_date,
        // return_date: req.body.return_date,
        // charges: req.body.charges,
        request_status: req.body.request_status
    }

    try {
        StudentBook.find()
            .where('student_id').equals(data.student_id)
            .exec((error, result) => {
                if (result && result.length >= 2) {
                    res.status(400).send({success: false, message: 'Already borrowed 2 books.'})
                } else if (result.some((x) => x.book_id === data.book_id)) {
                    res.status(400).send({success: false, message: 'Already requested for selected book.'})
                } else {
                    StudentBook.create(data)
                        .then(result => {
                            res.status(200).send({
                                success: true,
                                message: 'Book borrow request sent to librarian',
                                result
                            });
                        })
                        .catch(err => {
                            res.status(400).send({success: false, message: '' + err})
                        })
                }
            })
    } catch (e) {
        res.status(500).send({success: false, message: '' + e})
    }

})
router.put('/approveBookRequest', async (req, res) => {
    const data = {
        id: req.body._id,
        student_id: req.body.student_id,
        book_id: req.body.book_id,
        request_status: req.body.request_status,
        /*issuance_date: new Date(Date.now()),
        return_date: req.body.request_status === 'APPROVED'
            ? new Date(Date.now() + 12096e5)
            : req.body.request_status === 'RETURNED'
                ? new Date.now()
                : ''*/
        // charges: req.body.charges,
    }

    try {
        const result = await StudentBook.findById(data.id);
        if (data.request_status === 'APPROVED') {
            result.issuance_date = new Date(Date.now())
            result.return_date = new Date(Date.now() + 12096e5)
        }
        if (data.request_status === 'RETURNED') {
            result.return_date = new Date(Date.now())
        }
        result.request_status = data.request_status;
        const updated = await StudentBook.updateOne({_id: data.id}, result)
        if (updated.modifiedCount > 0) {
            res.status(200).send({success: true, message: `${data.request_status} Successfully`})
        }
        /*StudentBook.find()
            .where('student_id').equals(data.student_id)
            // .or([{request_status: 'APPROVED'}, ])
            .exec((error, result) => {
                /!*if (result && result.length >= 2) {
                    res.status(400).send({success: false, message: 'User already borrowed 2 books.'})
                } else if (result.some((x) => x.book_id === data.book_id)) {
                    res.status(400).send({success: false, message: 'User already borrowed selected books.'})
                } else {*!/
                StudentBook.update(
                    {_id: data.id},
                    data,
                    {},
                    function (err, task) {
                        if (err) {
                            res.status(500).send({success: false, message: '' + err})
                        }
                        res.json({success: true, message: `Request ${data.request_status} Successfully!`})
                    }
                )
                // }
            })*/
    } catch (e) {
        res.status(500).send({success: false, message: '' + e})
    }

})
router.get('/allBookRequests', (req, res) => {
    try {
        StudentBook.find()
            .populate('book_id')
            .populate('student_id')
            .exec((error, result) => {
                if (result && result.length > 0) {
                    res.status(200).send({
                        success: true,
                        message: 'Returning Book Requests',
                        result
                    })
                } else {
                    res.status(200).send({success: true, message: 'No Records to Show', result})
                }
            })
    } catch (e) {
        res.status(500).send({success: false, message: '' + e})
    }
})

// Book CRUD
router.post('/create', (req, res) => {
    const today = new Date()
    const userData = {
        book_name: req.body.book_name,
        book_author: req.body.book_author,
        book_price: req.body.book_price,
        book_qty: req.body.book_qty,
        book_isbn: req.body.book_isbn,
        book_status: req.body.book_status,
        created: today
    }

    Book.findOne({
        book_name: req.body.book_name
    })
        //TODO bcrypt
        .then(user => {
            if (!user) {
                Book.create(userData)
                    .then(user => {
                        res.status(200).send({success: true, message: 'Book created successfully', user});
                    })
                    .catch(err => {
                        res.status(500).send({success: false, message: '' + err})
                    })
            } else {
                res.status(400).json({success: false, message: 'Book already exists'})
            }
        })
        .catch(err => {
            res.status(500).send({success: false, message: '' + err})
        })
})

router.get('/', (req, res) => {

    Book.find()
        .then((result) => {
            res.status(200).send({success: true, message: 'Fetched Successfully', result});
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to get todo\n" + err.message);
            console.log("Error: Unable to get todo\n", err);
        })

})
router.get('/:id', (req, res) => {
    var id = req.params.id;
    Book.findById(id)
        .then((result) => {
            res.status(200).send({success: true, message: 'Fetched Successfully', result});
        })
        .catch((err) => {
            res.status(500).send({success: false, message: '' + err.message})
            console.log("Error: Unable to get todo\n", err);
        })

})
router.put('/update/:id', (req, res) => {
    var id = req.params.id;

    Book.findById(id)
        .then((result) => {
            var todo = req.body
            var updTask = {}
            if (todo != null) {
                updTask.book_name = todo.book_name
                updTask.book_author = todo.book_author
                updTask.book_status = todo.book_status
                updTask.book_price = todo.book_price
                updTask.book_qty = todo.book_qty
                updTask.book_isbn = todo.book_isbn
            }
            if (!updTask) {
                res.status(400).json({
                    success: false,
                    message: 'Bad Request!'
                })

            } else {
                Book.update(
                    {_id: id},
                    // {_id: mongojs.ObjectId(id)},
                    updTask,
                    {},
                    function (err, task) {
                        if (err) {
                            res.status(500).send({success: false, message: '' + err})
                        }
                        res.json({success: true, message: "Book Updated Successfully!"})
                    }
                )
            }

        })
        .catch((err) => {
            res.status(500).send({success: false, message: '' + err.message})
            console.log("Error: Unable to get book\n", err);
        })

})
router.delete('/:id', (req, res) => {
    var id = req.params.id;
    Book.findByIdAndRemove(id)
        .then((result) => {
            res.status(200).send({success: true, message: 'Book deleted successfully', result});
            //  Send the result (updated course object) back to user
            console.log("Deleted todo: ", result.book_name);
        })
        .catch((err) => {
            res.status(500).send({success: false, message: '' + err.message})
            console.log("Error: Unable to delete book\n", err);
        });
})


router.get('/userBooks/:id', (req, res) => {
    var id = req.params.id;
    try {
        StudentBook.find()
            .where('student_id').equals(id)
            .populate('book_id')
            .populate('student_id')
            .exec((error, result) => {
                res.status(200).send({
                    success: true,
                    message: 'Returning Books',
                    result
                });
            })
    } catch (e) {
        res.status(500).send({success: false, message: '' + e})
    }

})


module.exports = router
