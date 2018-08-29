var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');
var indexController = require('./controllers/index');
var db = require('../../lib/database')();

router.use(authMiddleware.staffHasAuth);
router.get('/', indexController);


//***************************************** */
//								PENDING													
//***************************************** */		

// VIEW
function viewPend(req, res, next) {
	db.query('SELECT u.*,m.*,cl.*,ct.*  FROM tbluser u inner join tblmemrates m ON u.memrateid=m.memrateid inner join tblmemclass cl ON m.memclass=cl.memclassid inner join tblcat ct ON m.memcat=ct.membershipID WHERE usertype=8 or usertype=9', function (err, results, fields) {
		if (err) return res.send(err);
		req.viewPend = results;
		return next();
	})
}



//***************************************** */
//					EXCLUSIVE MEMBERS												
//***************************************** */	

// VIEW
function viewRegular(req, res, next) {
  db.query('SELECT u.*, bn.branchname, memrate.memclassname, memrate.membershipname FROM tbluser u INNER JOIN tblbranch AS bn ON bn.branchid = u.branch INNER JOIN (select mr.memrateid, mc.memclassname, tc.membershipname FROM tblmemrates mr INNER JOIN tblmemclass AS mc ON mc.memclassid = mr.memclass INNER JOIN tblcat AS tc ON tc.membershipid = mr.memcat Group by mr.memrateid ) AS MemRate WHERE u.memrateid=memrate.memrateid and usertype=2 and branch=?',[req.session.staff.branch], function (err, results, fields) {
    if (err) return res.send(err);
    req.eMembers = results;
    return next();
  })
}

//***************************************** */
//					INTERBRANCH MEMBERS												
//***************************************** */	

// VIEW
function viewInterbranch(req, res, next) {
  db.query('select u.* ,mems.memrateid,ct.membershipname,cl.memclassname from tbluser u inner join tblmemrates mems ON u.memrateid=mems.memrateid inner join tblcat ct ON mems.memcat=ct.membershipID inner join tblmemclass cl ON mems.memclass= cl.memclassid where usertype=2 and u.branch IS NULL', function (err, results, fields) {
    if (err) return res.send(err);
    req.iMembers = results;
    return next();
  })
}



















// GENERAL
function s_dash(req, res) {
	res.render('staffs/general/views/dashboard');
}

function s_reports(req, res) {
	res.render('staffs/general/views/reports');
}

function s_user(req, res) {
	res.render('staffs/general/views/user');
}
	
// TRANSACTIONS
function s_freezed(req, res) {
	res.render('staffs/transactions/views/freezed');
}

function s_payment(req, res) {
	res.render('staffs/transactions/views/payment');
}

function s_pending(req, res) {
	res.render('staffs/transactions/views/pending', {
		pends: req.viewPend
	});
}
function s_personal(req, res) {
	res.render('staffs/transactions/views/personal');
}
function s_regular(req, res) {
	res.render('staffs/transactions/views/regular', {
		members: req.eMembers
	});
}
function s_interbranch(req, res) {
	res.render('staffs/transactions/views/t-interregular', {
		imembers: req.iMembers
	});
}
function s_classes(req, res) {
	res.render('staffs/transactions/views/t-classes', {
		
	});
}
function s_events(req, res) {
	res.render('staffs/transactions/views/t-event', {
		
	});
}

// ROUTERS

router.get('/', s_dash);
router.get('/reports', s_reports);
router.get('/user', s_user);
router.get('/freezed', s_freezed);
router.get('/payment', s_payment);
router.get('/pending', viewPend, s_pending);
router.get('/personal', s_personal);
router.get('/exclusive', viewRegular, s_regular);
router.get('/interbranch', viewInterbranch, s_interbranch);
router.get('/classes', s_classes);
router.get('/events', s_events);

exports.staffs = router