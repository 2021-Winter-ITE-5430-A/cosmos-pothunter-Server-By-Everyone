const express = require('express');
const auth = require('../../middleware/auth');
let MentorsBio = require('../../models/MentorsBio');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const mentorsBio = await MentorsBio.find();
    res.send(mentorsBio);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.post(
  '/',
  auth,[
    check('mentorsName', 'mentorsName is required').not().isEmpty(),
    check('mentorsProf', 'mentorsProf is required').not().isEmpty(),
    check('mentorsLinkedInUrl', 'mentorsLinkedInUrlUrl is required').not().isEmpty()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newMentorsBio = new MentorsBio({
      user: req.user.id,
      mentorsName: req.body.mentorsName,
      mentorsProf: req.body.mentorsProf,
      mentorsLinkedInUrl: req.body.mentorsLinkedInUrl,
      imageUrl: req.body.imageUrl
    });

    const result = await newMentorsBio.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/', async (req, res) => {
  try {
    const auth_user = req.body.id;
    
    const mentorBios = await MentorsBio.findById(req.body.id);
    
    if (!mentorBios) {
      return res.status(404).json({ msg: 'Mentor not found' });
    }
    if (mentorBios.id.toString() === auth_user.toString()) {
      const result = await MentorsBio.findByIdAndDelete(req.body.id);
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