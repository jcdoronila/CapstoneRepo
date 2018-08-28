var router = require('express').Router();
var express = require('express');
var authMiddleware = require('../auth/middlewares/auth');
router.use(authMiddleware.trainerHasAuth);

var indexController = require('./controllers/index');
router.get('/', indexController);

// ---------- F U N C T I O N S ---------- //

// LOGOUT
function logout(req, res){
    res.render('auth/views/landing');
}

//    FUNCTION
function dashboard(req, res){
    res.render('trainer/views/dashboard');
}

function trainee(req, res){
    res.render('trainer/views/trainee');
}

function pending(req, res){
    res.render('trainer/views/pending');
}


//    ROUTER
router.get('/', dashboard);
router.get('/dashboard', dashboard);
router.get('/trainee', trainee);
router.get('/pending', pending);
router.get('/logout', logout);

exports.trainer = router;