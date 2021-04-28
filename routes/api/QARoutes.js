const express = require('express');

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth')
let QA = require('../../models/QA');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const qna = await QA.find();
    res.send(qna);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const qna = await QA.findById(req.params.id);
    if (!qna) {
      return res.status(404).send('qna not found');
    }
    res.send(qna);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/',auth,
[
  check('question', 'question is required').not().isEmpty(),
  check('answer', 'answer is required').not().isEmpty()
],

async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newQA = new QA({
      user: req.user.id,
      question: req.body.question,
      answer: req.body.answer
    });

    console.log(newQA)
    const result = await newQA.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/', async (req, res) => {
  try {
    const auth_user = req.body.id;
    
    const qna = await QA.findById(req.body.id);
    
    if (!qna) {
      return res.status(404).json({ msg: 'QA not found' });
    }
    if (qna.id.toString() === auth_user.toString()) {
      const result = await QA.findByIdAndDelete(req.body.id);
      res.send(result);
    }
    else {
      res.status(404).json({ msg: "User not authenticated" });
    }
    
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', async (req, res) => {
  try {

    const auth_user = req.body.id;
    const qna = await QA.findById(req.body.id);
    if (!qna) {
      return res.status(404).json({ msg: 'QA not found' });
    }
    if (qna.id.toString() === auth_user.toString()) {
    qna.question = req.body.question;
    qna.answer = req.body.answer;
    
    await qna.save();
    res.send(qna);
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;