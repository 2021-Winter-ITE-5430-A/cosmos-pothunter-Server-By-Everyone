const express = require('express');
const auth = require('../../middleware/auth');
let Mentor = require('../../models/Mentor');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.send(mentors);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.post(
  '/',
  auth,[
    check('name', 'mentorsName is required').not().isEmpty(),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newMentor = new Mentor({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      details: req.body.details
    });

    const result = await newMentor.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.delete('/', async (req, res) => {
    try {
      const auth_user = req.body.id;
      
      const mentor = await Mentor.findById(req.body.id);
      
      if (!mentor) {
        return res.status(404).json({ msg: 'Mentor not found' });
      }
      if (mentor.id.toString() === auth_user.toString()) {
        const result = await Mentor.findByIdAndDelete(req.body.id);
        res.send(result);
      }
      else {
        res.status(404).json({ msg: "User not authenticated" });
      }
      
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

module.exports = router;