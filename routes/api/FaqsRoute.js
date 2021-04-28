const express = require('express');
const auth = require('../../middleware/auth');
let Faqs = require('../../models/Faqs');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const faqs = await Faqs.find();
    res.send(faqs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.post(
  '/', [
  check('question', 'question is required').not().isEmpty(),
  check('answer', 'answer is required').not().isEmpty()
],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newFaqs = new Faqs({
        quesId: req.body.quesId,
        question: req.body.question,
        answer: req.body.answer
      });

      const result = await newFaqs.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

module.exports = router;