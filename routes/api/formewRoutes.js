const express = require('express');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();
let Formnew = require('../../models/Formnew');

router.get('/', async (req, res) => {
  try {
    const forms = await Formnew.find();
    res.send(forms);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const form = await Formnew.findById(req.params.id);
    if (!form) {
      return res.status(404).send('form not found');
    }
    res.send(form);
  } catch (err) {
    res.status(500).send('Server error');
  }
});




router.post(
  '/',
  // [
  //   check('name', 'Name is required').not().isEmpty(),

  // ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {

      const newForm = new Formnew({

        name: req.body.name,
        email: req.body.email,
        addr1: req.body.addr1,
        addr2: req.body.addr2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phn: req.body.phn,
        edu: req.body.edu,
        field: req.body.field,
        gpa: req.body.gpa,
        clg: req.body.clg,
        edu2: req.body.edu2,
        field2: req.body.field2,
        gpa2: req.body.gpa2,
        clg2: req.body.clg2,
        exp1: req.body.exp1,
      });
      await newForm.save();
      const payload = {
        form: {
          id: newForm.id,
          name: newForm.name,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);


// added delete and put/update form data

router.delete('/', auth, async (req, res) => {
  try {
    const form = await Formnew.findById(req.body.id);
    if (!form) {
      return res.status(404).json({ msg: 'Form not found' });
    }
    const result = await Formnew.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const form = await Formnew.findById(req.body.id);
    if (!form) {
      return res.status(404).json({ msg: 'Formnew not found' });
    }

    form.user = req.user.id,
      form.name = req.body.name;
    form.email = req.body.email;
    form.addr1 = req.body.addr1,
    form.addr2 = req.body.addr2,
    form.city = req.body.city;
    form.state = req.body.state;
    form.zip = req.body.zip,
    form.phn = req.body.phn,
    form.edu = req.body.edu,
    form.field = req.body.field,
    form.gpa = req.body.gpa,
    form.clg = req.body.clg,
    form.edu2 = req.body.edu2,
    form.field2 = req.body.field2,
    form.gpa2 = req.body.gpa2,
    form.clg2 = req.body.clg2,
    form.exp1 = req.body.exp1,

    await form.save();
    res.send(form);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
