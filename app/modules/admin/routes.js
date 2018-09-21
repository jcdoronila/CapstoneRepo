var express = require('express');
var db = require('../../lib/database')();
var router = express.Router();
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuth);

//insert staff
var indexController = require('./controllers/index');
router.get('/', indexController);

router.post('/staff', (req, res) => {
    
      db.query("INSERT INTO tbluser ( userfname, userlname, usermobile, useremail, usertype,statusfront,userpassword,userusername) VALUES ( ?, ?, ?, ?, 4,'Inactive',?,?)",[req.body.sfirstName, req.body.slastName, req.body.smobNum, req.body.semail, req.body.pass, req.body.username],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/staff');
        }
        });
      
  });

 //edit staff
var indexController = require('./controllers/index');

router.post('/staff/edit', (req, res) => {
     db.query("UPDATE tbluser SET userfname=?, userlname=?, usermobile=?, useremail=?, userpassword=?, userusername=? WHERE userid=?",[req.body.sfirstName, req.body.slastName, req.body.smobNum, req.body.semail, req.body.pass, req.body.username, req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
       else{
         res.redirect('/staff');
       }
       });
      
 });

 //delete staff
var indexController = require('./controllers/index');

router.post('/staff/delete', (req, res) => {
    
     db.query("DELETE FROM tbluser WHERE statusfront='Inactive' and userid=?",[req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
       else{
         res.redirect('/staff');
       }
       });
      
 });


//view Staff
function viewStaff(req, res, next){
  db.query('SELECT * FROM tbluser WHERE usertype = 4',function(err, results, fields){
    if(err) return res.send(err);
    req.viewStaff = results;
    return next();
  })
}


//insert program
var indexController = require('./controllers/index');

router.post('/program', (req, res) => {
    
      db.query("INSERT INTO tblprogram ( progname, progdesc,status) VALUES ( ?, ?,'1')",[req.body.progname, req.body.progdesc],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/program');
        }
        });
      
  });


//insert classes
var indexController = require('./controllers/index');

router.post('/classes', (req, res) => {
    
      db.query("INSERT INTO tblclass ( classname, classdesc,status) VALUES ( ?, ?,1)",[req.body.classname, req.body.classdesc],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/classes');
        }
        });
      
  });

//edit classes
var indexController = require('./controllers/index');

router.post('/classes/edit', (req, res) => {
    
     db.query("UPDATE tblclass SET classname=?, classdesc=? WHERE classID=?",[req.body.classname, req.body.classdesc,req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
        else{
         res.redirect('/classes');
        }
        });
      
  });

 //delete class
var indexController = require('./controllers/index');

router.post('/classes/delete', (req, res) => {
    
     db.query("UPDATE tblclass SET status=2 WHERE classid=?",[req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
       else{
         res.redirect('/classes');
       }
       });
      
 });

//view classes
function viewClass(req, res, next){
  db.query('SELECT * FROM tblclass WHERE status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewClass = results;
    return next();
  })
}

//insert special
var indexController = require('./controllers/index');

router.post('/specs', (req, res) => {
    
      db.query("INSERT INTO tblspecial ( specialname, specialdesc,status) VALUES ( ?, ?,1)",[req.body.specialname, req.body.specialdesc],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/specialization');
        }
        });
      
  });

//edit special
var indexController = require('./controllers/index');

router.post('/specs/edit', (req, res) => {
    
     db.query("UPDATE tblspecial SET specialname=?, specialdesc=? WHERE specialID=?",[req.body.specialname, req.body.specialdesc,req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
        else{
          res.redirect('/specialization');
        }
        });
      
  });

 //delete special
var indexController = require('./controllers/index');

router.post('/specs/delete', (req, res) => {
    
     db.query("UPDATE tblspecial SET status=2 WHERE specialID=?",[req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
       else{
         res.redirect('/specialization');
       }
       });
      
 });

//view special
function viewSpecial(req, res, next){
  db.query('SELECT * FROM tblspecial WHERE status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewSpecial = results;
    return next();
  })
}

//insert discount
var indexController = require('./controllers/index');

router.post('/discount', (req, res) => {
    
      db.query("INSERT INTO tblpromo ( promoname,startdate,enddate,discount,status,statusback) VALUES ( ?, ?, ?, ?, ?,1)",[req.body.promoname, req.body.startdate, req.body.enddate, req.body.discount, req.body.status],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/discount');
        }
        });
      
  });

//edit discount
var indexController = require('./controllers/index');

router.post('/discount/edit', (req, res) => {
    
     db.query("UPDATE tblpromo SET promoname=?, startdate=?, enddate=?, discount=?, status=? WHERE promoID=?",[req.body.promoname, req.body.startdate, req.body.enddate,req.body.discount,req.body.status,req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
        else{
          res.redirect('/discount');
        }
        });
      
  });

 //delete discount
var indexController = require('./controllers/index');

router.post('/discount/delete', (req, res) => {
    
     db.query("UPDATE tblpromo SET statusback=2 WHERE promoID=?",[req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
       else{
         res.redirect('/discount');
       }
       });
      
 });

//view discount
function viewDiscount(req, res, next){
  db.query('SELECT * FROM tblpromo WHERE statusback=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewDiscount = results;
    return next();
  })
}

//insert branch
var indexController = require('./controllers/index');

router.post('/branch',addid, (req, res) => {
    
    db.query("INSERT INTO tblbranch ( branchname,branchstreetnum,branchstreetname,branchcity,user) VALUES (?, ?, ?, ?, ?)",[req.body.branchname, req.body.stnum, req.body.st, req.body.city,req.body.user],(err, results, fields)=>{
        db.query("UPDATE tbluser SET branch=?,statusfront='Active'  WHERE userid=?",[req.newid, req.body.user],(err, results, fields)=>{  
          if (err)
            console.log(err);
          else{
            res.redirect('/branch');
          }
          });
      
  });
        });


//function addid
function addid(req, res, next){
  db.query('SELECT (branchID+1)id FROM tblbranch ORDER BY branchID DESC LIMIT 1  ',function(err, results, fields){
    if(err) return res.send(err)
    req.newid=results[0].id
    console.log('puta')
    console.log(req.newid)
    return next();
    })
}

//edit branch
var indexController = require('./controllers/index');

router.post('/branch/edit', (req, res) => {
    
     db.query(`UPDATE tblbranch SET branchname=?,branchstreetnum=?,branchstreetname=?,branchcity=?,user= ${req.body.user} WHERE branchID=${req.body.id}`,[req.body.branch, req.body.stnum, req.body.st, req.body.city],(err, results, fields)=>{
      db.query("UPDATE tbluser SET branch=    NULL, statusfront='Inactive' WHERE userid=?",[req.body.oldid],(err, results, fields)=>{
        db.query("UPDATE tbluser SET branch=?,statusfront='Active'  WHERE userid=?",[req.body.id, req.body.user],(err, results, fields)=>{
          if (err)
            console.log(err);
         else{
            res.redirect('/branch');
       }
       });
      });
      
 });
      });

 //delete branch
var indexController = require('./controllers/index');

router.post('/branch/delete', (req, res) => {
    
    db.query("UPDATE tbluser SET branch=    NULL, statusfront='Inactive' WHERE userid=?",[req.body.oldid],(err, results, fields)=>{
      db.query(`UPDATE tblbranch SET user= NULL WHERE branchID=?`,[req.body.id],(err, results, fields)=>{
        db.query(`DELETE FROM tblbranch WHERE branchID=?`,[req.body.id],(err, results, fields)=>{
            if (err)
            console.log(err);
            else{
            res.redirect('/branch');
       }
       });
      
 });
     });
         });

//view staff dropdowns
function viewStaffDropdown(req, res, next){
  db.query('SELECT * FROM tbluser WHERE usertype=4 AND statusfront="Inactive"',function(err, results, fields){
    if(err) return res.send(err);
    req.viewStaffDropdown = results;
    return next();
  })
}


//view branch
function viewBranch(req, res, next){
  db.query('SELECT u.*, b.* from tbluser u join tblbranch b ON u.userid = b.user where u.usertype = 4  ',function(err, results, fields){
      console.log(results)
      if(err) return res.send(err);
      req.viewBranch = results;
      return next();
    })
}


//insert membership
var indexController = require('./controllers/index');

router.post('/category', (req, res) => {
    
      db.query("INSERT INTO tblcat ( membershipname,membershipdesc, status) VALUES (?, ?,1)",[req.body.catname, req.body.catdesc],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/category');
        }
        });
      
  });

/*edit membership*/
var indexController = require('./controllers/index');

router.post('/category/edit', (req, res) => {
    
     db.query("UPDATE tblcat SET membershipname=?,membershipdesc=? WHERE membershipID=?",[req.body.catname, req.body.catdesc,req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
       else{
         res.redirect('/category');
       }
       });
      
 });

 //delete category
var indexController = require('./controllers/index');

router.post('/category/delete', (req, res) => {
    
     db.query("UPDATE tblcat SET status=2 WHERE membershipID=?",[req.body.id],(err, results, fields)=>{
       if (err)
         console.log(err);
       else{
         res.redirect('/category');
       }
       });
      
 });

//view membership
function viewCategory(req, res, next){
  db.query('SELECT * FROM tblcat WHERE status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewCategory = results;
    return next();
  })
}

//insert trainer
var indexController = require('./controllers/index');

router.post('/trainer', (req, res) => {
    
      db.query("INSERT INTO tbluser ( userfname, userlname,userbday,usergender,useraddress,usermobile,useremail,userschedule,usertype,branch,specialization,userpassword,userusername) VALUES ( ?, ?, ?, ?, ?, ? ,?, ?, 3, ?, ?, ?, ?)",[req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.sched.toString(), req.body.branchid, req.body.specialid, req.body.password, req.body.username],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/trainer');
        }
        });
      
  });

//view branch dropdowns
function viewbranchdrop(req, res, next){
  db.query('SELECT * FROM tblbranch ',function(err, results, fields){
    if(err) return res.send(err);
    req.viewbranchdrop = results;
    return next();
  })
}

//view specialization dropdowns
function viewspecialdrop(req, res, next){
  db.query('SELECT * FROM tblspecial WHERE status=1 ',function(err, results, fields){
    if(err) return res.send(err);
    req.viewspecialdrop = results;
    return next();
  })
}

//edit trainer
var indexController = require('./controllers/index');

router.post('/trainer/edit', (req, res) => {
    
      db.query("UPDATE tbluser SET userfname=?, userlname=?,userbday=?,usergender=?,useraddress=?,usermobile=?,useremail=?,userschedule=?,branch=?,specialization=?,userpassword=?,userusername=? WHERE userid=?",[req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.sched.toString(), req.body.branchid, req.body.specialid, req.body.password, req.body.username, req.body.id],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/trainer');
        }
        });
  });

//delete trainer
var indexController = require('./controllers/index');

router.post('/trainer/delete', (req, res) => {
    
      db.query("DELETE FROM tbluser WHERE userid=?",[req.body.id],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/trainer');
        }
        });
      
  });

//view Trainers
function viewTrainer(req, res, next){
  db.query('SELECT u.*, b.*,s.* FROM tbluser u inner JOIN tblbranch b on u.branch=b.branchID JOIN tblspecial s ON s.specialID =u.specialization where u.usertype=3 ',function(err, results, fields){
    if(err) return res.send(err);
    req.viewTrainer = results;
    return next();
  })
}

//insert facility
var indexController = require('./controllers/index');

router.post('/facility', (req, res) => {
    
      db.query("INSERT INTO tblfacilities ( facilitiesname, fee, period, UOM) VALUES ( ?, ?, ?, ?)",[req.body.facname, req.body.price, req.body.dura, req.body.uom],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/facility');
        }
        });
      
  });

//edit facility
var indexController = require('./controllers/index');

router.post('/facility/edit', (req, res) => {
    
      db.query("UPDATE tblfacilities SET facilitiesname=?, fee=?, period=?, UOM=? WHERE facilitiesID=?",[req.body.facname, req.body.price, req.body.dura, req.body.uom, req.body.id],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/facility');
        }
        });
      
  });

//delete facility
var indexController = require('./controllers/index');

router.post('/facility/delete', (req, res) => {
    
      db.query("DELETE FROM tblfacilities WHERE facilitiesID=?",[req.body.id],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/facility');
        }
        });
      
  });

//view facilities
function viewFac(req, res, next){
  db.query('SELECT * FROM tblfacilities',function(err, results, fields){
    if(err) return res.send(err);
    req.viewFac = results;
    return next();
  })
}

//insert general fee
var indexController = require('./controllers/index');

router.post('/general', (req, res) => {
    
      db.query("INSERT INTO tblgenera ( genname, fee, genperiod, UOM) VALUES ( ?, ?, ?, ?)",[req.body.genname, req.body.fee, req.body.dura, req.body.uom],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/facility');
        }
        });
      
  });

//edit general fee
var indexController = require('./controllers/index');

router.post('/general/edit', (req, res) => {
    
      db.query("UPDATE tblgenera SET genname=?, fee=?, genperiod=?, UOM=? WHERE generalID=? ",[req.body.genname, req.body.fee, req.body.dura, req.body.uom, req.body.id],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/general');
        }
        });
      
  });

//view general
function viewGen(req, res, next){
  db.query('SELECT * FROM tblgenera',function(err, results, fields){
    if(err) return res.send(err);
    req.viewGen = results;
    return next();
  })
}

//insert membership
var indexController = require('./controllers/index');

router.post('/membership', (req, res) => {
    
      db.query("INSERT INTO tblmemrates ( memname, memfee, memperiod, memcat) VALUES ( ?, ?, ?, ?)",[req.body.memname, req.body.memfee, req.body.memdura, req.body.category],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/membership');
        }
        });
      
  });

//view category dropdowns
function viewcatdrop(req, res, next){
  db.query('SELECT * FROM tblcat WHERE status=1 ',function(err, results, fields){
    if(err) return res.send(err);
    req.viewcatdrop = results;
    return next();
  })
}

//edit membership
var indexController = require('./controllers/index');

router.post('/membership/edit', (req, res) => {
    
      db.query("UPDATE tblmemrates SET  memname=?, memfee=?, memperiod=?, memcat=? WHERE memrateid=?",[req.body.memname, req.body.memfee, req.body.memdura, req.body.category, req.body.id],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/membership');
        }
        });
      
  });

//delete membership
var indexController = require('./controllers/index');

router.post('/membership/delete', (req, res) => {
    
      db.query("DELETE FROM tblmemrates WHERE memrateid=? ",[req.body.id],(err, results, fields)=>{
        if (err)
          console.log(err);
        else{
          res.redirect('/membership');
        }
        });
      
  });

//view membership
function viewMembership(req, res, next){
  db.query('SELECT u.*, b.* from tblmemrates u join tblcat b ON u.memcat = b.membershipID where b.status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewMembership = results;
    return next();
  })
}


//A-TEAM FITNESS FUNCTIONS

// GENERAL
function reports(req,res){
    res.render('admin/general/views/reports');
}
function userd(req,res){
    res.render('admin/general/views/user');
}
function utils(req,res){
    res.render('admin/general/views/utils');
}

// MAINTENANCE
function branch(req,res){
    res.render('admin/maintenance/views/m-branch',{branches: req.viewBranch,drops: req.viewStaffDropdown});
}
function category(req,res){
    res.render('admin/maintenance/views/m-category', {cats: req.viewCategory});
}
function classes(req,res){
    res.render('admin/maintenance/views/m-classes',{classes: req.viewClass});
}
function discount(req,res){
    res.render('admin/maintenance/views/m-discount',{discounts: req.viewDiscount});
}
function facility(req,res){
    res.render('admin/maintenance/views/m-facility',{facs: req.viewFac});
}
function general(req,res){
    res.render('admin/maintenance/views/m-general',{gens: req.viewGen});
}
function membership(req,res){
    res.render('admin/maintenance/views/m-membership',{drops: req.viewcatdrop, mems: req.viewMembership});
}
function specs(req,res){
    res.render('admin/maintenance/views/m-specialization',{specials: req.viewSpecial});
}
function staff(req,res){
    res.render('admin/maintenance/views/m-staff', {staffs: req.viewStaff});
}
function trainer(req,res){
    res.render('admin/maintenance/views/m-trainer',{drops: req.viewbranchdrop,spes: req.viewspecialdrop, trains: req.viewTrainer});
}

//A-TEAM FITNESS GETS

//GENERAL
router.get('/reports', reports);
router.get('/user', userd);
router.get('/utilities', utils);

//MAINTENANCE
router.get('/branch',viewBranch,viewStaffDropdown,branch);
router.get('/category', viewCategory,category);
router.get('/classes', viewClass, classes );
router.get('/discount', viewDiscount,discount);
router.get('/facility',viewFac, facility);
router.get('/general',viewGen, general);
router.get('/membership',viewMembership,viewcatdrop, membership);
router.get('/specialization', viewSpecial,specs);
router.get('/staff', viewStaff,staff );
router.get('/trainer',viewTrainer,viewspecialdrop,viewbranchdrop, trainer);


/**
 * Here we just export said router on the 'index' property of this module.
 */
exports.index = router;