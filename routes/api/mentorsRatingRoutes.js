const express = require('express');

let MentorsRating = require('../../models/MentorsRating');

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const mentorsRating = await MentorsRating.find();
        res.send(mentorsRating);
    }
    catch (err) {
        res.status(500).send('Server Error ' + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const mentorsRating = await MentorsRating.findById(req.params.id);
        
        if (!mentorsRating) {
            res.status(404).send('Stories not found');
        }

        res.send(mentorsRating);

    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('mentorsName', 'mentorsName is required').not().isEmpty(),
        check('rate', 'rate is required').not().isEmpty()        
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const newMentorsRating = new MentorsRating({
                name: req.body.name,
                mentorsName: req.body.mentorsName,
                rate: req.body.rate                
            });

            const result = await newMentorsRating.save();
            res.send(result);
        }
        catch (err) {
            res.status(500).send('Server Error ' + err);
        }
    });

router.delete('/', auth, async (req, res) => {
    try {

        const mentorsRating = await MentorsRating.findById(req.body.id);

        if (!mentorsRating) {
            res.status(404).send('Stories not found');
        }    
            const result = await MentorsRating.findByIdAndDelete(req.body.id);
            res.send(result);       

    }
    catch (err) {
        res.status(500).send('Server Error ' + err);

    }

});

router.put('/', auth, 
[
    check('name', 'Name is required').not().isEmpty(),
    check('mentorsName', 'type is required').not().isEmpty(),
    check('rate', 'rate is required').not().isEmpty()
],
async (req, res) => {
    try {

        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
        const mentorsRating = await MentorsRating.findById(req.body.id);
        if (!mentorsRating) {
            res.status(404).send('Product Data not found');
        }      
      
        if (mentorsRating.user.equals(req.user.id)) {

            mentorsRating.name = req.body.name;
            mentorsRating.mentorsName = req.body.mentorsName;
            userSuccessStories.rate = req.body.rate;
                        

            const result = await mentorsRating.save();
            res.send(result);
        }
        else {
            res.status(403).send('User donot have permission to update data.');
        }
    }
    catch (err) {
        res.status(500).send('Server Error '+err);
    }
});

module.exports = router;