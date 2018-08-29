var express = require('express');
var db = require('../../lib/database')();
var router = express.Router();
var authMiddleware = require('../auth/middlewares/auth');
var moment = require('moment');

router.use(authMiddleware.hasAuth);

var indexController = require('./controllers/index');
router.get('/', indexController);

//insert staff

router.post('/staff', (req, res) => {
  db.query("INSERT INTO tbluser ( userfname, userlname, usermobile, useremail, usertype,statusfront,userpassword,userusername) VALUES ( ?, ?, ?, ?, 4,'Inactive',?,?)", [req.body.sfirstName, req.body.slastName, req.body.smobNum, req.body.semail, req.body.pass, req.body.username], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff'); 
    }
  });
});

//edit staff

router.post('/staff/edit', (req, res) => {
  db.query("UPDATE tbluser SET userfname=?, userlname=?, usermobile=?, useremail=?, userpassword=?, userusername=? WHERE userid=?", [req.body.sfirstName, req.body.slastName, req.body.smobNum, req.body.semail, req.body.pass, req.body.username, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff');
    }
  });
});

//delete staff

router.post('/staff/delete', (req, res) => {
  db.query("DELETE FROM tbluser WHERE statusfront='Inactive' and userid=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff');
    }
  });

});


//view Staff
function viewStaff(req, res, next) {
  db.query('SELECT * FROM tbluser WHERE usertype = 4', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewStaff = results;
    return next();
  })
}


//insert classes

router.post('/classes', (req, res) => {
  db.query("INSERT INTO tblclass ( classname, classdesc,status) VALUES ( ?, ?,1)", [req.body.classname, req.body.classdesc], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/classes');
    }
  });
});

//edit classes

router.post('/classes/edit', (req, res) => {
  db.query("UPDATE tblclass SET classname=?, classdesc=? WHERE classID=?", [req.body.classname, req.body.classdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/classes');
    }
  });
});

//delete class

router.post('/classes/delete', (req, res) => {
  db.query("UPDATE tblclass SET status=2 WHERE classid=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/classes');
    }
  });
});

//view classes

function viewClass(req, res, next) {
  db.query('SELECT * FROM tblclass WHERE status=1', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewClass = results;
    return next();
  })
}

//insert special

router.post('/specs', (req, res) => {
  db.query("INSERT INTO tblspecial ( specialname, specialdesc,status) VALUES ( ?, ?,1)", [req.body.specialname, req.body.specialdesc], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/specialization');
    }
  });
});

//edit special

router.post('/specs/edit', (req, res) => {

  db.query("UPDATE tblspecial SET specialname=?, specialdesc=? WHERE specialID=?", [req.body.specialname, req.body.specialdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/specialization');
    }
  });
});

//delete special

router.post('/specs/delete', (req, res) => {

  db.query("UPDATE tblspecial SET status=2 WHERE specialID=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/specialization');
    }
  });
});

//view special
function viewSpecial(req, res, next) {
  db.query('SELECT * FROM tblspecial WHERE status=1', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewSpecial = results;
    return next();
  })
}

//insert discount

router.post('/discount', (req, res) => {

  db.query("INSERT INTO tblpromo ( promoname,startdate,enddate,discount,status,statusback) VALUES ( ?, ?, ?, ?, ?,1)", [req.body.promoname, req.body.startdate, req.body.enddate, req.body.discount, req.body.status], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/discount');
    }
  });
});

//edit discount

router.post('/discount/edit', (req, res) => {

  db.query("UPDATE tblpromo SET promoname=?, startdate=?, enddate=?, discount=?, status=? WHERE promoID=?", [req.body.promoname, req.body.startdate, req.body.enddate, req.body.discount, req.body.status, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/discount');
    }
  });
});

//delete discount

router.post('/discount/delete', (req, res) => {

  db.query("UPDATE tblpromo SET statusback=2 WHERE promoID=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/discount');
    }
  });
});

//view discount
function viewDiscount(req, res, next) {
  db.query('SELECT * FROM tblpromo WHERE statusback=1', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewDiscount = results;
    return next();
  })
}

//function branchaddid
function addid(req, res, next) {
  db.query('SELECT (branchID+1)id FROM tblbranch ORDER BY branchID DESC LIMIT 1', function (err, results, fields) {
    if (err) return res.send(err)
    req.newid = results[0].id
    console.log('puta')
    console.log(req.newid)
    return next();
  })
}

//insert branch

router.post('/branch', addid, (req, res) => {
  db.query("INSERT INTO tblbranch ( branchname,branchstreetnum,branchstreetname,branchcity,user) VALUES (?, ?, ?, ?, ?)", [req.body.branchname, req.body.stnum, req.body.st, req.body.city, req.body.user], (err, results, fields) => {
    db.query("UPDATE tbluser SET branch=?,statusfront='Active' WHERE userid=?", [req.newid, req.body.user], (err, results, fields) => {
      if (err)
        console.log(err);
      else {
        res.redirect('/branch');
      }
    });
  });
});

//edit branch

router.post('/branch/edit', (req, res) => {
  db.query(`UPDATE tblbranch SET branchname=?,branchstreetnum=?,branchstreetname=?,branchcity=?,user= ${req.body.user} WHERE branchID=${req.body.id}`, [req.body.branch, req.body.stnum, req.body.st, req.body.city], (err, results, fields) => {
    db.query("UPDATE tbluser SET branch=NULL, statusfront='Inactive' WHERE userid=?", [req.body.oldid], (err, results, fields) => {
      db.query("UPDATE tbluser SET branch=?,statusfront='Active'  WHERE userid=?", [req.body.id, req.body.user], (err, results, fields) => {
        if (err)
          console.log(err);
        else {
          res.redirect('/branch');
        }
      });
    });
  });
});

//delete branch

router.post('/branch/delete', (req, res) => {

  db.query("UPDATE tbluser SET branch=    NULL, statusfront='Inactive' WHERE userid=?", [req.body.oldid], (err, results, fields) => {
    db.query(`UPDATE tblbranch SET user= NULL WHERE branchID=?`, [req.body.id], (err, results, fields) => {
      db.query(`DELETE FROM tblbranch WHERE branchID=?`, [req.body.id], (err, results, fields) => {
        if (err)
          console.log(err);
        else {
          res.redirect('/branch');
        }
      });

    });
  });
});

//view staff dropdowns
function viewStaffDropdown(req, res, next) {
  db.query('SELECT * FROM tbluser WHERE usertype=4 AND statusfront="Inactive"', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewStaffDropdown = results;
    return next();
  })
}


//view branch
function viewBranch(req, res, next) {
  db.query('SELECT u.*, b.* from tbluser u join tblbranch b ON u.userid = b.user where u.usertype = 4  ', function (err, results, fields) {
    console.log(results)
    if (err) return res.send(err);
    req.viewBranch = results;
    return next();
  })
}


//insert membership

router.post('/category', (req, res) => {
  db.query("INSERT INTO tblcat ( membershipname,membershipdesc, status) VALUES (?, ?,1)", [req.body.catname, req.body.catdesc], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/category');
    }
  });
});

/*edit membership*/

router.post('/category/edit', (req, res) => {

  db.query("UPDATE tblcat SET membershipname=?,membershipdesc=? WHERE membershipID=?", [req.body.catname, req.body.catdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/category');
    }
  });
});

//delete category

router.post('/category/delete', (req, res) => {

  db.query("UPDATE tblcat SET status=2 WHERE membershipID=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/category');
    }
  });
});

//view category
function viewCategory(req, res, next) {
  db.query('SELECT * FROM tblcat WHERE status=1', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewCategory = results;
    return next();
  })
}

//insert trainer

router.post('/trains', (req, res) => {
  db.query("INSERT INTO tbluser ( userfname, userlname,userbday,usergender,useraddress,usermobile,useremail,userschedule,usertype,branch,specialization,userpassword,userusername) VALUES ( ?, ?, ?, ?, ?, ? ,?, ?, 3, ?, ?, ?, ?)", [req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.sched.toString(), req.body.branchid, req.body.specialid, req.body.password, req.body.username], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trainer');
    }
  });
});

//view branch dropdowns
function viewbranchdrop(req, res, next) {
  db.query('SELECT * FROM tblbranch ', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewbranchdrop = results;
    return next();
  })
}

//view specialization dropdowns
function viewspecialdrop(req, res, next) {
  db.query('SELECT * FROM tblspecial WHERE status=1 ', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewspecialdrop = results;
    return next();
  })
}

//edit trainer

router.post('/trains/edit', (req, res) => {
  db.query("UPDATE tbluser SET userfname=?, userlname=?,userbday=?,usergender=?,useraddress=?,usermobile=?,useremail=?,userschedule=?,branch=?,specialization=?,userpassword=?,userusername=? WHERE userid=?", [req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.sched.toString(), req.body.branchid, req.body.specialid, req.body.password, req.body.username, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trainer');
    }
  });
});

//delete trainer

router.post('/trains/delete', (req, res) => {
  db.query("DELETE FROM tbluser WHERE userid=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trainer');
    }
  });
});

//view Trainers
function viewTrainer(req, res, next) {
  db.query('SELECT u.*, b.*,s.* FROM tbluser u inner JOIN tblbranch b on u.branch=b.branchID JOIN tblspecial s ON s.specialID =u.specialization where u.usertype=3 ', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewTrainer = results;
    return next();
  })
}

//insert facility

router.post('/facility', (req, res) => {
  db.query("INSERT INTO tblfacilities ( facilitiesname, fee, period, UOM) VALUES ( ?, ?, ?, ?)", [req.body.facname, req.body.price, req.body.dura, req.body.uom], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/facility');
    }
  });
});

//edit facility

router.post('/facility/edit', (req, res) => {
  db.query("UPDATE tblfacilities SET facilitiesname=?, fee=?, period=?, UOM=? WHERE facilitiesID=?", [req.body.facname, req.body.price, req.body.dura, req.body.uom, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/facility');
    }
  });
});

//delete facility

router.post('/facility/delete', (req, res) => {
  db.query("DELETE FROM tblfacilities WHERE facilitiesID=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/facility');
    }
  });
});

//view facilities
function viewFac(req, res, next) {
  db.query('SELECT * FROM tblfacilities', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewFac = results;
    return next();
  })
}

//insert general fee

router.post('/general', (req, res) => {
  db.query("INSERT INTO tblgenera ( genname, fee, genperiod, UOM) VALUES ( ?, ?, ?, ?)", [req.body.genname, req.body.fee, req.body.dura, req.body.uom], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/general');
    }
  });
});

//edit general fee

router.post('/general/edit', (req, res) => {

  db.query("UPDATE tblgenera SET genname=?, fee=?, genperiod=?, UOM=? WHERE generalID=? ", [req.body.genname, req.body.fee, req.body.dura, req.body.uom, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/general');
    }
  });
});

//view general
function viewGen(req, res, next) {
  db.query('SELECT * FROM tblgenera', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewGen = results;
    return next();
  })
}

//insert membership

router.post('/membership', (req, res) => {

  db.query("INSERT INTO tblmemrates ( memclass, memfee, memperiod, memcat) VALUES ( ?, ?, ?, ?)", [req.body.class, req.body.memfee, req.body.memdura, req.body.category], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/membership');
    }
  });
});

//view category dropdowns
function viewcatdrop(req, res, next) {
  db.query('SELECT * FROM tblcat WHERE status=1 ', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewcatdrop = results;
    return next();
  })
}

//view class dropdowns
function viewclassdrop(req, res, next) {
  db.query('SELECT * FROM tblmemclass WHERE status=1 ', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewclassdrop = results;
    return next();
  })
}

//edit membership

router.post('/membership/edit', (req, res) => {

  db.query("UPDATE tblmemrates SET  memclass=?, memfee=?, memperiod=?, memcat=? WHERE memrateid=?", [req.body.class, req.body.memfee, req.body.memdura, req.body.category, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/membership');
    }
  });
});

//delete membership

router.post('/membership/delete', (req, res) => {

  db.query("DELETE FROM tblmemrates WHERE memrateid=? ", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/membership');
    }
  });
});

//view membership
function viewMembership(req, res, next) {
  db.query('SELECT u.*, b.*, s.* from tblmemrates u inner join tblcat b ON u.memcat = b.membershipID JOIN tblmemclass s ON s.memclassid=u.memclass where b.status=1', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewMembership = results;
    return next();
  })
}


//insert membership classes

router.post('/memclass', (req, res) => {
  db.query("INSERT INTO tblmemclass ( memclassname,memclassdesc, status) VALUES (?, ?,1)", [req.body.classname, req.body.classdesc], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/memclass');
    }
  });
});

/*edit membership class*/

router.post('/memclass/edit', (req, res) => {
  db.query("UPDATE tblmemclass SET memclassname=?,memclassdesc=? WHERE memclassid=?", [req.body.classname, req.body.classdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/memclass');
    }
  });
});

//delete memebrship class

router.post('/memclass/delete', (req, res) => {
  db.query("UPDATE tblmemclass SET status=2 WHERE memclassid=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/memclass');
    }
  });
});

//view membership classes
function viewHie(req, res, next) {
  db.query('SELECT * FROM tblmemclass WHERE status=1', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewHie = results;
    return next();
  })
}

//Transactions

//view pending
function viewPend(req, res, next) {
  db.query('SELECT u.*,m.*,cl.*,ct.*  FROM tbluser u inner join tblmemrates m ON u.memrateid=m.memrateid inner join tblmemclass cl ON m.memclass=cl.memclassid inner join tblcat ct ON m.memcat=ct.membershipID WHERE usertype=8 or usertype=9', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewPend = results;
    return next();
  })
}

//view update interbranch
function viewUpdate(req, res, next) {
  db.query("UPDATE tbluser u join tblmemrates m ON u.memrateid=m.memrateid SET u.branch=NULL, u.usertype=9 where m.memcat=4 AND u.signdate IS NULL", (err, results, fields) => {
    if (err)
      console.log(err);

    else {
      console.log('AAAAAAAA')
      return next()
    };
  })
};

//function useraddid
function useraddid(req, res, next) {
  db.query('SELECT (userid+1)id FROM tbluser ORDER BY userid DESC LIMIT 1 ', function (err, results, fields) {
    if (err) return res.send(err)
    req.newuserid = results[0].id
    console.log('puta')
    console.log(req.newuserid)
    return next();
  })
}


//update of pending to regular

router.post('/pending/update', useraddid, (req, res) => {
  if (req.body.newcode === req.body.codenow)
    db.query("UPDATE tbluser SET  signdate=CURDATE(),usertype=2,userpassword=12345 WHERE userid=?", [req.body.newid], (err, results, fields) => {
      db.query("UPDATE tbluser u inner join tblmemrates mems ON u.memrateid=mems.memrateid inner join tblcat ct ON mems.memcat=ct.membershipID inner join tblmemclass cl ON mems.memclass= cl.memclassid SET u.expiry = case when cl.memclassid = mems.memclass then curdate() + interval mems.memperiod MONTH END where usertype=2 and userid=?", [req.body.newid], (err, results, fields) => {
        if (err)
          console.log(err);
        else {
          res.redirect('/pending');
        }
      });
    });
  else {
    res.redirect('/pending');
  }

});

//view of regular exclusive members
function viewReg(req, res, next) {
  db.query('SELECT u.*, bn.branchname, memrate.memclassname, memrate.membershipname FROM tbluser u INNER JOIN tblbranch AS bn ON bn.branchid = u.branch INNER JOIN (select mr.memrateid, mc.memclassname, tc.membershipname FROM tblmemrates mr INNER JOIN tblmemclass AS mc ON mc.memclassid = mr.memclass INNER JOIN tblcat AS tc ON tc.membershipid = mr.memcat Group by mr.memrateid ) AS MemRate WHERE u.memrateid=memrate.memrateid and usertype=2', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewReg = results;
    return next();
  })
}

//view of regular interbranch members
function viewInt(req, res, next) {
  db.query('select u.* ,mems.memrateid,ct.membershipname,cl.memclassname from tbluser u inner join tblmemrates mems ON u.memrateid=mems.memrateid inner join tblcat ct ON mems.memcat=ct.membershipID inner join tblmemclass cl ON mems.memclass= cl.memclassid where usertype=2 and u.branch IS NULL', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewInt = results;
    return next();
  })
}

//view update regular to suspended
function viewSusp(req, res, next) {
  db.query("UPDATE tbluser SET statusfront='Inactive', userpassword=NULL where expiry= CURDATE()", (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      console.log('bbbbbbbbbb')
      return next()
    };
  })
};

//view to payment
function viewPay(req, res, next) {
  db.query('select u.* ,mems.*,ct.membershipname,cl.memclassname from tbluser u inner join tblmemrates mems ON u.memrateid=mems.memrateid inner join tblcat ct ON mems.memcat=ct.membershipID inner join tblmemclass cl ON mems.memclass= cl.memclassid where usertype=2', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewPay = results;
    //moments expiration
    for (var i = 0; i < req.viewPay.length; i++) {
      req.viewPay[i].expiry = moment(results[i].expiry).format("LL");
    }
    return next();
  })
}

//payment
router.post('/payment',(req, res) => {
    db.query("UPDATE tbluser u inner join tblmemrates mems ON u.memrateid=mems.memrateid inner join tblcat ct ON mems.memcat=ct.membershipID inner join tblmemclass cl ON mems.memclass= cl.memclassid SET u.expiry = case when cl.memclassid = mems.memclass then u.expiry + interval mems.memperiod MONTH END where usertype=2 and userid=?", [req.body.id], (err, results, fields) => {
      db.query("UPDATE tbluser u inner join tblmemrates mems ON u.memrateid=mems.memrateid inner join tblcat ct ON mems.memcat=ct.membershipID inner join tblmemclass cl ON mems.memclass= cl.memclassid SET recentpay=CURDATE() where usertype=2 and userid=?", [req.body.id], (err, results, fields) => {
        if (err)
          console.log(err);
        else {
          res.redirect('/payment');
        }
      });
      });
  })


//A-TEAM FITNESS FUNCTIONS

// GENERAL
function reports(req, res) {
  res.render('admin/general/views/reports');
}

function userd(req, res) {
  res.render('admin/general/views/user');
}

function utils(req, res) {
  res.render('admin/general/views/utils');
}

// MAINTENANCE
function branch(req, res) {
  res.render('admin/maintenance/views/m-branch', {
    branches: req.viewBranch,
    drops: req.viewStaffDropdown
  });
}

function category(req, res) {
  res.render('admin/maintenance/views/m-category', {
    cats: req.viewCategory
  });
}

function classes(req, res) {
  res.render('admin/maintenance/views/m-classes', {
    classes: req.viewClass
  });
}

function discount(req, res) {
  res.render('admin/maintenance/views/m-discount', {
    discounts: req.viewDiscount
  });
}

function facility(req, res) {
  res.render('admin/maintenance/views/m-facility', {
    facs: req.viewFac
  });
}

function general(req, res) {
  res.render('admin/maintenance/views/m-general', {
    gens: req.viewGen
  });
}

function membership(req, res) {
  res.render('admin/maintenance/views/m-membership', {
    drops: req.viewcatdrop,
    mems: req.viewMembership,
    classes: req.viewclassdrop
  });
}

function specs(req, res) {
  res.render('admin/maintenance/views/m-specialization', {
    specials: req.viewSpecial
  });
}

function staff(req, res) {
  res.render('admin/maintenance/views/m-staff', {
    staffs: req.viewStaff
  });
}

function trains(req, res) {
  res.render('admin/maintenance/views/m-trainer', {
    drops: req.viewbranchdrop,
    spes: req.viewspecialdrop,
    trains: req.viewTrainer
  });
}

function memclass(req, res) {
  res.render('admin/maintenance/views/m-mclasses', {
    Hays: req.viewHie
  });
}

// TRANSACTIONS

function t_class(req, res) {
  res.render('admin/transactions/views/t-classes');
}

function t_event(req, res) {
  res.render('admin/transactions/views/t-event');
}

function freezed(req, res) {
  res.render('admin/transactions/views/t-freezed');
}

function income(req, res) {
  res.render('admin/transactions/views/t-income');
}

function payment(req, res) {
  res.render('admin/transactions/views/t-payment', {
    pays: req.viewPay
  });
}

function pending(req, res) {
  res.render('admin/transactions/views/t-pending', {
    pends: req.viewPend
  });
}

function personal(req, res) {
  res.render('admin/transactions/views/t-personal');
}

function regular(req, res) {
  res.render('admin/transactions/views/t-regular', {
    regs: req.viewReg
  });
}

function Interregular(req, res) {
  res.render('admin/transactions/views/t-interregular', {
    intb: req.viewInt
  });
}


//A-TEAM FITNESS GETS

//GENERAL
router.get('/reports', reports);
router.get('/user', userd);
router.get('/utilities', utils);

//MAINTENANCE
router.get('/branch', viewBranch, viewStaffDropdown, branch);
router.get('/category', viewCategory, category);
router.get('/classes', viewClass, classes);
router.get('/discount', viewDiscount, discount);
router.get('/facility', viewFac, facility);
router.get('/general', viewGen, general);
router.get('/membership', viewclassdrop, viewMembership, viewcatdrop, membership);
router.get('/specialization', viewSpecial, specs);
router.get('/staff', viewStaff, staff);
router.get('/trains', viewTrainer, viewspecialdrop, viewbranchdrop, trains);
router.get('/memclass', viewHie, memclass);

//TRANSACTIONS
router.get('/t-class', t_class);
router.get('/t-event', t_event);
router.get('/freezed', freezed);
router.get('/income', income);
router.get('/payment', viewPay, payment);
router.get('/pending', viewUpdate, viewPend, pending);
router.get('/personal', personal);
router.get('/regular', viewSusp, viewReg, regular);
router.get('/interregular', viewSusp, viewInt, Interregular);
/**
 * Here we just export said router on the 'index' property of this module.
 */
exports.index = router;