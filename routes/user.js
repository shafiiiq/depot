var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper')

// verify login 
const verifyLogin = (req, res, next) => {
  if (req.session.user && req.session.user.loggedIn) {
    next()
  } else {
    res.redirect('account')
  }
}

// verify is logged in and prevent to going to previous page
const isLoggedIn = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  if (req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', function (req, res, next) {
  userHelper.getCountedItems(20).then((productsCounted) => {
    res.render('index', { index: true, productsCounted});
  })
});

// user login page render 
router.get('/depot-account-login', isLoggedIn, (req, res) => {
  res.render('account/login', { account: true, userAccount: true, user: true })
})

// user sign up page render 
router.get('/depot-account-sign-in', (req, res) => {
  res.render('account/sign', { account: true, userAccount: true })
})

// user account creation signup
router.post('/depot-account-sign-in', (req, res) => {
  userHelper.signUp(req.body).then((response) => {
    if (response) {
      res.render('account/login', { account: true, userAccount: true })
    } else {
      res.render('account/sign', { account: true, userAccount: true, signErr: "Account is already exist" })
    }
  })
})

// user account login 
router.post('/login-to-depot', (req, res) => {
  userHelper.login(req.body).then((response) => {
    if (response.status) {
      req.session.user = response.user;
      req.session.user.loggedIn = true;

      // user session data 
      let user = req.session.user
      res.render('index', { index: true, user })
    } else {
      res.render('account/login', { account: true, user: true, logginErr: "Invalid email or password" });
      loggedIn = false
    }
  })
});

router.post('/search-products', (req, res) => {
  let searchKey = req.body.searchKey;
  console.log(searchKey);
  userHelper.searchResult(searchKey).then((products) => {
    let itemCount = products.length
    res.render('user/search-result', {searchKey, searchResult:true, userAction: true, products, itemCount})
  })
});

// user account logout 
router.get('/depot-account-user-logout', (req, res) => {
  req.session.user = null
  res.redirect('/')
});

module.exports = router;
