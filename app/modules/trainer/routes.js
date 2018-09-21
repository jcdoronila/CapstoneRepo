var router = require('express').Router();
var db = require('../../lib/database')();
var authMiddleware = require('../auth/middlewares/auth');
var indexController = require('./controllers/index');


router.use(authMiddleware.trainerHasAuth);
router.get('/', indexController); 


//View Pending Request 
function viewPend(req, res, next){
    db.query('SELECT u.*, mr.*, mc.*, m.*,t.*,pt.* from tbluser u join tblmemrates mr on u.memrateid=mr.memrateid inner join tblcat mc on mc.membershipid=mr.memcat inner join tblmemclass m on mr.memclass=m.memclassid inner join tbppt pt on pt.memid=u.userid inner join tbltrainer t on t.trainerid=pt.trainid where pt.trainid=? and pt.status=2',[req.session.trainer.trainerid], function(err, results, fields){
      if(err) return res.send(err);
      req.viewPend = results;
      return next();
    })
  }

//accept pending
router.post('/accept', (req, res) => {
  db.query("UPDATE tbppt SET status=1, statusfront='Accepted' WHERE trainid=? and memid=?", [req.session.trainer.trainerid, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trainee');
    }
  });
});

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
    res.render('trainer/views/pending',{
    pends:req.viewPend
    });
}


//    ROUTER
router.get('/', dashboard);
router.get('/dashboard', dashboard);
router.get('/trainee', trainee);
router.get('/pending', viewPend, pending);
router.get('/logout', logout);

exports.trainer = router;