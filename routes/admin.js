var express = require('express');
const adminHelper = require('../helper/admin-helper');
var router = express.Router();

// verify login middleware 
const verifyLogin = (req, res, next) => {
  if (req.session && req.session.admin && req.session.admin.loggedIn) {
    next()
  } else {
    res.redirect('account-login')
  }
}

// verify is logged in and prevent to going to previous page
const isLoggedIn = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  if (req.session && req.session.admin) {
    res.redirect('/admin/admin-panel');
  } else {
    next();
  }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/account-login', isLoggedIn, (req, res) =>{
  res.render('account/login', {admin: true, account: true})
})

router.post('/login-to-home-page', (req, res) => {
  adminHelper.login(req.body).then((response) => {
    if (response.status) {
      console.log(req.session);
      req.session.admin = response.admin;
      req.session.admin.loggedIn = true;
      res.redirect('/admin/admin-panel')
    } else {
      res.render('account/login', { account: true, admin: true, logginErr: "Invalid email or password" });
      req.session.admin.loggedIn = false
    }
  })
});

router.get('/admin-panel', verifyLogin, (req, res) => {
  res.render('admin/admin-panel', {admin: true})
})

router.get('/logout-adiministrator', (req, res) => {
  req.session.admin = null
  res.redirect('/admin/account-login')
});


module.exports = router;
