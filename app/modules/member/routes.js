var router = require('express').Router();
var db = require('../../lib/database')();
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.memberHasAuth);

var indexController = require('./controllers/index');
router.get('/dashboard', indexController);

//******************************************************* */
//                      PROFILE
//******************************************************* */

// view
function viewProf(req, res, next) {
    db.query('select u.* ,mems.memrateid,ct.membershipname,cl.memclassname from tbluser u inner join tblmemrates mems ON u.memrateid=mems.memrateid inner join tblcat ct ON mems.memcat=ct.membershipID inner join tblmemclass cl ON mems.memclass= cl.memclassid where usertype= 2  AND userid = ?', [req.session.member.userid], function (err, results, fields) {
        if (err) return res.send(err);
        req.viewProf = results;
        //moments signdate
        for (var i = 0; i < req.viewProf.length; i++) {
            req.viewProf[i].signdate = moment(results[i].signdate).format("LL");
        }
        //moments expiration
        for (var i = 0; i < req.viewProf.length; i++) {
            req.viewProf[i].expiry = moment(results[i].expiry).format("LL");
        }
        return next();
    })
}

//******************************************************* */
//                     CLASSES
//******************************************************* */

// view
function viewClass(req, res, next) {
    db.query('select * from tblclass', function (err, results, fields) {
        if (err) return res.send(err);
        req.viewClass = results;
        return next();
    })
}

/* ----------------- T R I G G E R   N O T I F I C A T I O N S ----------------- */
// function triggerExpiryNotif(req, res, next){
//   db.query('SELECT * FROM tbluser WHERE curdate() = expiry - interval 7 day', [req.session.member.userid], function(err, results, fields){
//         if(err) return res.send(err);
//         if(results[0])
//         {
//             db.query('INSERT INTO tblnotifications (strNotifType, txtNotifContent, datNotifInstance, intuserid) VALUES ("?  ", "You only have 7 days left for this subscription, please renew account.", NOW(), req.session.member.userid',(err,results,fields)=>{
//                 if(err) return res.send(err);
//             })
//         }
//             return next();
//         })
// }

/* ----------------- S P R E A D   N O T I F I C A T I O N S ----------------- */
// function spreadExpiryNotif(req, res, next){
//   db.query('SELECT * FROM tbluser WHERE curdate() = expiry - interval 7 day', [req.session.member.userid], function(err, results, fields){
//         if(err) return res.send(err);
//         if(results[0])
//         {
//             for(var i = 0; i <= results.length; i++)
//             {

//             }
//         }
//             return next();
//         })
// }

// ---------- F U N C T I O N S ---------- //
function dashboard(req, res, next) {
    res.render('member/views/dashboard', {
        profs: req.viewProf
    })
    return next();
}

function profile(req, res, next) {
    res.render('member/views/profile', {
        profs: req.viewProf
    })
    return next();
}

function eventss(req, res, next) {
    res.render('member/views/events', {
        profs: req.viewProf
    });
    return next();
}

function classes(req, res, next) {
    res.render('member/views/classes', {
        profs: req.viewProf,
        classes: req.viewClass
    });
    return next();
}

function billing(req, res, next) {
    res.render('member/views/billing', {
        profs: req.viewProf
    });
    return next();
}

function trainer(req, res, next) {
    res.render('member/views/trainer', {
        profs: req.viewProf
    });
    return next();
}

// ------------- GET ---------------//
router.get('/', viewProf, dashboard);
router.get('/profile', viewProf, profile);
router.get('/events', viewProf, eventss); //triggerExpiryNotif
router.get('/trainers', viewProf, trainer);
router.get('/classes', viewProf, viewClass, classes);
router.get('/events', viewProf, eventss);
router.get('/billing', viewProf, billing);
exports.member = router;