var express = require('express');
var router = express.Router();

var User = require('../models/user')

// Register page
router.get('/register', (req, res)=>{
    res.render('register');
});

// Login page
router.get('/login', (req, res)=>{
    res.render('login');
});


// ! This is the the input point for data from front-end server
// ! Here you should fetch data from react
// Register User
router.post('/register', (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors){
        res.render('register', {errors: errors});
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        User.createUser(newUser, (err, user) => {
            if(err) throw err;
            console.log('User was succesfully registered!');
        });
        
        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/users/login');
    }
});

module.exports = router;