var router = require('express').Router();
var express = require('express');
var authMiddleware = require('../auth/middlewares/auth');
var indexController = require('./controllers/index');

router.use(authMiddleware.staffHasAuth);
router.get('/', indexController);





















//LOGOUT
function logout(req, res){
    res.render('auth/views/landing');
}

// GENERAL
function s_dash(req,res){
    res.render('staffs/general/views/dashboard');
}
function s_reports(req,res){
    res.render('staffs/general/views/reports');
}
function s_user(req,res){
    res.render('staffs/general/views/user');
}

// TRANSACTIONS
function s_freezed(req,res){
    res.render('staffs/transactions/views/t-freezed');
}

function s_payment(req,res){
    res.render('staffs/transactions/views/t-payment');
}

function s_pending(req,res){
    res.render('staffs/transactions/views/t-pending');
}

function s_personal(req,res){
    res.render('staffs/transactions/views/t-personal');
}

function s_classes(req,res){
    res.render('staffs/transactions/views/t-classes');
}

function s_event(req,res){
    res.render('staffs/transactions/views/t-event');
}

function s_regular(req,res){
    res.render('staffs/transactions/views/t-regular');
}

// ROUTERS

router.get('/', s_dash);
router.get('/reports', s_reports);
router.get('/user', s_user);
router.get('/freezed', s_freezed);
router.get('/payment', s_payment);
router.get('/pending', s_pending);
router.get('/classes', s_classes);
router.get('/event', s_event);
router.get('/personal', s_personal);
router.get('/regular', s_regular);

exports.staffs = router;