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

// VIEW
function initial(req, res, next) {
    db.query('select u.* ,mems.memrateid,ct.membershipname,cl.memclassname from tbluser u inner join tblmemrates mems ON u.memrateid=mems.memrateid inner join tblcat ct ON mems.memcat=ct.membershipID inner join tblmemclass cl ON mems.memclass= cl.memclassid where usertype= 2  AND userid = ?', [req.session.member.userid], function (err, results, fields) {
        if (err) return res.send(err);
        req.initial = results;
        //moments signdate
        for (var i = 0; i < req.initial.length; i++) {
            req.initial[i].signdate = moment(results[i].signdate).format("LL");
        }
        //moments expiration
        for (var i = 0; i < req.initial.length; i++) {
            req.initial[i].expiry = moment(results[i].expiry).format("LL");
        }
        return next();
    })
}

//******************************************************* */
//                     CLASSES
//******************************************************* */

// VIEW
function viewClass(req, res, next) {
    db.query('SELECT * FROM tblclass;', function (err, results, fields) {
        if (err) return res.send(err);
        req.viewClass = results;
        return next();
    })
}

//******************************************************* */
//                     EVENT
//******************************************************* */

// VIEW
function viewEvent(req, res, next) {
    db.query('select * from tbleventclass', function (err, results, fields) {
        if (err) return res.send(err);
        req.viewEvent = results;
        return next();
    })
}














// ---------- F U N C T I O N S ---------- //
function dashboard(req, res, next) {
    res.render('member/views/dashboard', {
        profs: req.initial
    })
    return next();
}

function profile(req, res, next) {
    res.render('member/views/profile', {
        profs: req.initial
    })
    return next();
}

function events(req, res, next) {
    res.render('member/views/events', {
        profs: req.initial,
        eves: req.viewEvent

    });
    return next();
}
    
function classes(req, res, next) {
    res.render('member/views/classes', {
        classes: req.viewClass, 
        profs: req.initial 
    });
    return next();
}

function billing(req, res, next) {
    res.render('member/views/billing', {
        profs: req.initial 
    });
    return next();
}

function trainer(req, res, next) {
    res.render('member/views/trainer', {
        profs: req.initial
    });
    return next();
}

function pending(req, res, next) {
    res.render('member/views/pending', {
        profs: req.initial
    });
    return next();
}

function accepted(req, res, next) {
    res.render('member/views/accepted', {
        profs: req.initial
    });
    return next();
}

function changeTrainer(req, res, next) {
    res.render('member/views/change-trainer', {
        profs: req.initial
    });
    return next();
}

// ------------- GET ---------------//
router.get('/', initial, dashboard);
router.get('/profile', initial, profile);
router.get('/events',viewEvent, initial, events);
router.get('/trainers', initial, trainer);
router.get('/classes', initial, viewClass, classes);
router.get('/events', initial, events);
router.get('/billing', initial, billing);
router.get('/pending', initial, pending);
router.get('/accepted', initial, accepted);
router.get('/changeTrainer', initial, changeTrainer);
exports.member = router;