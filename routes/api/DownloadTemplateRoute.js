const express = require('express');
const auth = require('../../middleware/auth');
let Resume = require('../../models/DownloadTemplate');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const resume = await Resume.find();
    res.send(resume);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.post(
  '/', [
  check('image', 'image is required').not().isEmpty(),
  check('title', 'title is required').not().isEmpty(),
  check('ref', 'reference is required').not().isEmpty()
],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newResume = new Resume({
        image: req.body.image,
        title: req.body.title,
        ref: req.body.ref
      });

      const result = await newResume.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

module.exports = router;