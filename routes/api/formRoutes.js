const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

let Form = require('../../models/Form');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.send(forms);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).send('Form not found');
        }
        res.send(form);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post(
    '/',
    auth,
    [
        // check('fname', 'First Name is required').not().isEmpty(),
        // check('lname', 'Last Name is required').not().isEmpty(),
        // check('addr1', 'Address is required').not().isEmpty(),
        // check('city', 'City is required').not().isEmpty(),
        // check('state', 'State is required').not().isEmpty(),
        // check('zip', 'Zip Code is required').not().isEmpty(),
        // check('email2', 'Email is required').not().isEmpty(),
        // check('phn', 'Contact Number is required').not().isEmpty(),
        // check('edu', 'Highest Education is required').not().isEmpty(),
        // check('field', 'Field of Study is required').not().isEmpty(),
        // check('gpa', 'GPA is required').not().isEmpty(),
        // check('clg', 'College is required').not().isEmpty(),

    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const newForm = new Form({
                user: req.user.id,
                fname: req.body.fname,
                lname: req.body.lname,
                addr1: req.body.addr1,
                addr2: req.body.addr2,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                email2: req.body.email2,
                phn: req.body.phn,
                edu: req.body.edu,
                field: req.body.field,
                gpa: req.body.gpa,
                clg: req.body.clg,
                edu2: req.body.edu2,
                field2: req.body.field2,
                gpa2: req.body.gpa2,
                clg2: req.body.clg2,


            });

            const result = await newForm.save();

            res.send(result);
        } catch (err) {
            res.status(500).send('Server error');
        }
    }
);

router.delete('/', async (req, res) => {
    try {
        const form = await form.findById(req.body.id);
        if (!form) {
            return res.status(404).json({ msg: 'Form not found' });
        }
        const result = await Form.findByIdAndDelete(req.body.id);
        res.send(result);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.put('/', async (req, res) => {
    try {
        const form = await Form.findById(req.body.id);
        if (!form) {
            return res.status(404).json({ msg: 'Form not found' });
        }


        form.fname = req.body.fname,
            form.lname = req.body.lname,
            form.addr1 = req.body.addr1,
            form.addr2 = req.body.addr2,
            form.city = req.body.city,
            form.state = req.body.state,
            form.zip = req.body.zip,
            form.email2 = req.body.email2,
            form.phn = req.body.phn,
            form.edu = req.body.edu,
            form.field = req.body.field,
            form.gpa = req.body.gpa,
            form.clg = req.body.clg,
            form.edu2 = req.body.edu2,
            form.field2 = req.body.field2,
            form.gpa2 = req.body.gpa2,
            form.clg2 = req.body.clg2,
            await form.save();
        res.send(form);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
