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
      req.session.admin = response.admin;
      req.session.admin.loggedIn = true;
      res.redirect('/admin/admin-panel')
    } else {
      res.render('account/login', { account: true, admin: true, logginErr: "Invalid email or password" });
      req.session.admin.loggedIn = false
    }
  })
});

// admin panel render 
router.get('/admin-panel', verifyLogin, (req, res) => {
  res.render('admin/admin-panel', {admin: true})
})

router.post('/add-products', verifyLogin, (req, res) => {
  adminHelper.addProducts(req.body, (ProductId) => {
    let productImage = req.files.productImage;
    productImage.mv('./public/productsData/' + ProductId + 'Image.jpg', (err, done) => {});
    if (req.files && req.files.productImage) {
      console.log("have image");
    }
    if (req.files && req.files.productVideo) {
      let productVideo = req.files.productVideo;
      productVideo.mv('./public/productsData/' + ProductId + '.Video.mp4', (err, done) => {});
    }
  }) 
  res.render('admin/admin-panel', {admin: true, addedProduct: true})
})

router.get('/logout-adiministrator', (req, res) => {
  req.session.admin = null
  res.redirect('/admin/account-login')
});


module.exports = router;
