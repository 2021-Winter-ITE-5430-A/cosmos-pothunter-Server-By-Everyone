const express = require('express');
const auth = require('../../middleware/auth');
let MenteesQuestion = require('../../models/MenteesQuestion');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const menteesQuestions = await MenteesQuestion.find();
    res.send(menteesQuestions);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.post(
  '/',[
    check('name', 'mentorsName is required').not().isEmpty(),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newQuestion = new MenteesQuestion({
      name: req.body.name,
      question: req.body.question,
      email: req.body.email,
      website: req.body.website
    });

    const result = await newQuestion.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;