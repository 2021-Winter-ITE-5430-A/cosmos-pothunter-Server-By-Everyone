const express = require('express');
const auth = require('../../middleware/auth');
let Toolkit = require('../../models/Toolkit');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const toolkit = await Toolkit.find();
    res.send(toolkit);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.post(
  '/',
  auth,[
    check('name', 'name is required').not().isEmpty(),
    check('webPreviewUrl', 'webPreviewUrl is required').not().isEmpty()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newToolkit = new Toolkit({
      user: req.user.id,
      name: req.body.name,
      webPreviewUrl: req.body.webPreviewUrl
    });

    const result = await newToolkit.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;