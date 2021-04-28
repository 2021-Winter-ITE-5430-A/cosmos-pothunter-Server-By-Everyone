const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

let Word = require('../../models/Word');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.send(words);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) {
      return res.status(404).send('Word not found');
    }
    res.send(word);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  auth,
  [
    check('term', 'Term is required').not().isEmpty(),
    check('sentence', 'Sentence is required').not().isEmpty(),

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newWord = new Word({
        user:req.user.id,
        term: req.body.term,
        sentence: req.body.sentence,
      
       
      });

      const result = await newWord.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    const word = await Word.findById(req.body.id);
    if (!word) {
      return res.status(404).json({ msg: 'Word not found' });
    }
    const result = await Word.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', async (req, res) => {
  try {
    const word = await Word.findById(req.body.id);
    if (!word) {
      return res.status(404).json({ msg: 'Word not found' });
    }

    word.term = req.body.term;
    word.sentence = req.body.sentence;
    await word.save();
    res.send(word);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
