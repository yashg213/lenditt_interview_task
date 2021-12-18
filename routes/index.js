var express = require('express');
const router = express.Router();

const  {signupValidation}  = require('../middleware/index');
const { signupUser,logout,login } = require("../controller/index");
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('hiiiii')
  res.render('index', { title: 'Express' });
});
router.post('/signup', signupValidation, signupUser)
router.post('/signin',login)
router.post('/logout',logout)


module.exports = router;
