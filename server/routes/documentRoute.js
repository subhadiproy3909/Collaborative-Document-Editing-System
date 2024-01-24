const router = require('express').Router();


const { openDoc, saveDoc, fetchUserDoc, changeTitle } = require('./controllers/document');

router.get('/fetch/:owner', fetchUserDoc).post('/open', openDoc).put('/save', saveDoc).patch('/title', changeTitle);




module.exports = router;