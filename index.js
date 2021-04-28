const express = require('express');
const cors = require('cors');

//APIs created by Shelcy formRoutes, formewRoutes, wordRoutesDB, jobsRoutes
const formRoutes = require('./routes/api/formRoutes');
const formewRoutes = require('./routes/api/formewRoutes');
const wordRoutesDB = require('./routes/api/wordRoutesDB');
const jobsRoutes = require('./routes/api/jobsRoutes');

//APIs created by Loveleen toolKitRoutes, resumeRoutes, faqs 
const toolKitRoutes = require('./routes/api/ToolKitRoutes');
const resumeRoutes = require('./routes/api/DownloadTemplateRoute');
const faqs = require('./routes/api/FaqsRoute');

//APIs created by Soumitra recagenchy, userstory, mentorsrating
const recagenchy = require('./routes/api/recruitingAgencisRoutes');
const userstory = require('./routes/api/userSuccessStoryRoutes');
const mentorsrating= require('./routes/api/mentorsRatingRoutes');

//APIs created by Mary qaRoutes, mentorsBioRoute, mentorRoute, menteesQuestion
const qaRoutes = require('./routes/api/QARoutes');
const mentorsBioRoute = require('./routes/api/mentorsBioRoute');
const mentorRoute = require('./routes/api/mentorsRoute');
const menteesQuestion = require('./routes/api/menteesQuestionRoutes');

//APIs created by Ismaila  userRoute, templateRoutes, aboutRoutes, authRoutes
const authRoutes = require('./routes/api/authRoutes'); 
const templateRoutes = require('./routes/api/templateRoutes-DB');
const userRoute = require('./routes/api/userRoute');
const aboutRoutes = require('./routes/api/aboutRoutes');

const connectDB = require('./config/connectDB');
const { db } = require('./models/User');

const app = express();

///connect to db
connectDB();

//set a middleware to parse dat
app.use(express.json());
app.use(cors());




//APIs created by Shelcy
app.use('/api/forms', formRoutes);
app.use('/api/formnew', formewRoutes);
app.use('/api/words', wordRoutesDB);
app.use('/api/jobs', jobsRoutes);
// ******************************
//APIs created by Loveleen
app.use('/api/toolkit', toolKitRoutes);
app.use('/api/faqs', faqs);
app.use('/api/resume',resumeRoutes);

//APIs created by Soumitra
app.use('/api/story', userstory);
app.use('/api/rating',mentorsrating);
app.use('/api/recagency', recagenchy);

//APIs created by Mary
app.use('/api/mentorsBio', mentorsBioRoute);
app.use('/api/mentors', mentorRoute);
app.use('/api/menteesQuestion', menteesQuestion);
app.use('/api/qa', qaRoutes);

//APIs created by Ismaila 
app.use('/api/templates',templateRoutes);
app.use('/api/user', userRoute);
app.use('/api/abouts',aboutRoutes);
app.use('/api/auth', authRoutes);


 

//in index.js make sure prot point to process .env port
app.listen(5000, () => {
  console.log('Server started');
});
