const router = require('express').Router();

const { signup, login, checkAuth } = require('./controllers/user');
const auth = require('../middlewares/authorization');

router.post('/signup', signup).post('/login', login).get('/auth', auth, checkAuth);


module.exports = router;