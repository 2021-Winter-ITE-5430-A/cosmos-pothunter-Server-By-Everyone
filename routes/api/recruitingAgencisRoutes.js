const express = require('express');

let RecruitingAgencis = require('../../models/RecruitingAgencis');

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recruitingAgencis = await RecruitingAgencis.find();
        res.send(recruitingAgencis);
    }
    catch (err) {
        res.status(500).send('Server Error ' + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const recruitingAgencis = await RecruitingAgencis.findById(req.params.id);
        
        if (!recruitingAgencis) {
            res.status(404).send('Product not found');
        }

        res.send(recruitingAgencis);

    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('type', 'type is required').not().isEmpty(),
        check('description', 'description is required').not().isEmpty(),
        check('location', 'location is required').not().isEmpty()
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const newRecruitingAgencis = new RecruitingAgencis({
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                location: req.body.location,
                phone: req.body.phone,
                url: req.body.url,
                address: req.body.address,
                city: req.body.city,
                provinces: req.body.provinces,
                postCode: req.body.postCode
            });

            const result = await newRecruitingAgencis.save();
            res.send(result);
        }
        catch (err) {
            res.status(500).send('Server Error ' + err);
        }
    });

router.delete('/', auth, async (req, res) => {
    try {

        const recruitingAgencis = await RecruitingAgencis.findById(req.body.id);

        if (!recruitingAgencis) {
            res.status(404).send('Product not found');
        }    
            const result = await RecruitingAgencis.findByIdAndDelete(req.body.id);
            res.send(result);       

    }
    catch (err) {
        res.status(500).send('Server Error ' + err);

    }

});

router.put('/', auth, 
[
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'type is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    check('location', 'location is required').not().isEmpty()
],
async (req, res) => {
    try {

        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
        const recruitingAgencis = await RecruitingAgencis.findById(req.body.id);
        if (!recruitingAgencis) {
            res.status(404).send('Product Data not found');
        }      
      
        if (recruitingAgencis.user.equals(req.user.id)) {

            recruitingAgencis.name = req.body.name;
            recruitingAgencis.type = req.body.type;
            recruitingAgencis.description = req.body.description;
            recruitingAgencis.location = req.body.location;
            recruitingAgencis.phone = req.body.phone;
            recruitingAgencis.url = req.body.url;
            recruitingAgencis.address = req.body.address;
            recruitingAgencis.city = req.body.city;
            recruitingAgencis.provinces = req.body.provinces;            

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