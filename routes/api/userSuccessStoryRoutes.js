const express = require('express');

let UserSuccessStories = require('../../models/UserSuccessStories');

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recruitingAgencis = await UserSuccessStories.find();
        res.send(recruitingAgencis);
    }
    catch (err) {
        res.status(500).send('Server Error ' + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userSuccessStories = await UserSuccessStories.findById(req.params.id);
        
        if (!userSuccessStories) {
            res.status(404).send('Stories not found');
        }

        res.send(userSuccessStories);

    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('date', 'date is required').not().isEmpty(),
        check('storydetails', 'storydetails is required').not().isEmpty()        
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const newUserSuccessStories = new UserSuccessStories({
                name: req.body.name,
                date: req.body.date,
                storydetails: req.body.storydetails                
            });

            const result = await newUserSuccessStories.save();
            res.send(result);
        }
        catch (err) {
            res.status(500).send('Server Error ' + err);
        }
    });

router.delete('/',  async (req, res) => {
    try {

        const userSuccessStories = await UserSuccessStories.findById(req.body.id);

        if (!userSuccessStories) {
            res.status(404).send('Stories not found');
        }    
            const result = await UserSuccessStories.findByIdAndDelete(req.body.id);
            res.send(result);       

    }
    catch (err) {
        res.status(500).send('Server Error ' + err);

    }

});

router.put('/', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'type is required').not().isEmpty(),
    check('storydetails', 'storydetails is required').not().isEmpty()
],
async (req, res) => {
    try {

        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
        const userSuccessStories = await UserSuccessStories.findById(req.body.id);
        if (!userSuccessStories) {
            res.status(404).send('Product Data not found');
        }      
      
        if (userSuccessStories.user.equals(req.user.id)) {

            userSuccessStories.name = req.body.name;
            userSuccessStories.date = req.body.date;
            userSuccessStories.storydetails = req.body.storydetails;
                        

            const result = await recruitingAgencis.save();
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