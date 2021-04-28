const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

let Job = require('../../models/Jobs');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.send(jobs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).send('Job not found');
    }
    res.send(job);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  auth,
  [
    check('jobid', 'Job ID is required').not().isEmpty(),
  

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newJob = new Job({
        jobid: req.body.jobid,
        title: req.body.title,
        cmpny: req.body.cmpny,
        location: req.body.location,
        ref: req.body.ref,
        jd: req.body.jd,
      
       
      });

      const result = await newJob.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    const job = await Job.findById(req.body.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    const result = await Job.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', async (req, res) => {
  try {
    const job = await Job.findById(req.body.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    job.jobid = req.body.jobid;
    job.title = req.body.title;
    job.cmpny = req.body.cmpny;
    job.location = req.body.location;
    job.ref = req.body.ref;
    job.jd = req.body.jd;
    await job.save();
    res.send(job);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;