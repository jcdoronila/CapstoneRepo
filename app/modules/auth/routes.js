var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();
var SignupRouter = express.Router();
var db = require('../../lib/database')();
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

var authMiddleware = require('./middlewares/auth');

var mailer = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: true,
    auth:{
        user: 'ateamsupmanila@gmail.com',
        pass: 'ateammanila'
    },
    tls:{
        rejectUnauthorized:false
    }
});
mailer.use('compile', hbs({
    viewpath: '',
    extname:'.html'
}));



//view membership
function viewMembership(req, res, next){
  db.query('SELECT u.*, b.*, s.* from tblmemrates u inner join tblcat b ON u.memcat = b.membershipID JOIN tblmemclass s ON s.memclassid=u.memclass where b.status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewMembership = results;
    return next();
  })
}

//view membership classes
function viewHie(req, res, next){
  db.query('SELECT * FROM tblmemclass WHERE status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewHie = results;
    return next();
  })
}

//view category
/*function viewCategory(req, res, next){
  db.query('SELECT * FROM tblcat WHERE status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewCategory = results;
    return next();
  })
}*/

//view special
function viewSpecial(req, res, next){
  db.query('SELECT * FROM tblspecial WHERE status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewSpecial = results;
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


loginRouter.route('/')
    .get(authMiddleware.adminNoAuth, viewSpecial, viewBranch, viewHie,viewMembership, (req, res) => {
        res.render('auth/views/landing', {  drop: req.viewHie, 
                                            specs: req.viewSpecial, 
                                            bras: req.viewBranch, 
                                            cat:req.viewMembership});
    })
    // .get(authMiddleware.trainerNoAuth, (req, res) => {
    //     res.render('auth/views/landing', req.query);
    // })
    // .get(authMiddleware.memberNoAuth, (req, res) => {
    //     res.render('auth/views/landing', req.query);
    // })
    // .get(authMiddleware.staffHasAuth, (req, res) => {
    //     res.render('auth/views/landing', req.query);
    // })
    .post((req, res) => {
        var db = require('../../lib/database')();

        db.query(`SELECT * FROM tbluser WHERE useremail="${req.body.userID}" OR userusername="${req.body.userID}"`, (err, results, fields) => {
            if (err) throw err;
            if (results.length === 0) return res.redirect('/login?henlo');

            var user = results[0];

            if (user.userpassword !== req.body.password) return res.redirect('/login?incorrect');
            // delete user.password;
            
            // req.session.user = user;

            // return res.redirect('/');
            
            // switch(user.usertype)
            // {
            //     case 1: delete user.password;
            //             req.session.user = user;
            //             console.log(req.session);
            //             return res.redirect('/');
            //             break;
            //     case 2: delete user.password;
            //             req.session.trainer = user;
            //             console.log(req.session);
            //             return res.redirect('/trainer');
            //             break;
            //     case 3: delete user.password;
            //             req.session.user = user;
            //             console.log(req.session);
            //             return res.redirect('/member');
            //             break;
            //     case 4: delete user.password;
            //             req.session.staff = user;
            //             console.log(req.session);
            //             return res.redirect('/staffs');
            //             break;
            // }
            if (user.usertype == 1)
            {
                delete user.password;
                req.session.user = user;
                console.log(req.session);
                return res.redirect('/');
            }
            else if (user.usertype == 3)
            {
                delete user.password;
                req.session.trainer = user;
                console.log(req.session);
                return res.redirect('/trainer');
            }
            else if (user.usertype == 2)
            {
                delete user.password;
                req.session.member = user;
                console.log(req.session);
                return res.redirect('/member');
            }
            else if (user.usertype == 4)
            {
                delete user.password;
                req.session.staff = user;
                console.log(req.session);
                return res.redirect('/staffs');
            }


            // if (user.strPassword == req.body.password || user.strType == "admin") res.redirect('/login?incorrect');
            // delete user.password;
            
            // req.session.user = user;

            // return res.redirect('/admin');

        });
    });


function codegen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvqxyz1234567890";
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
    }

//function useraddid
function useraddid(req, res, next){
  db.query('SELECT (userid+1)id FROM tbluser ORDER BY userid DESC LIMIT 1;',function(err, results, fields){
    if(err) return res.send(err)
    req.newuserid=results[0].id
    console.log('puta')
    console.log(req.newuserid)
    return next();
    })
}


SignupRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/landing', req.query);
    })

    .post(useraddid,(req, res) => {
        var db = require('../../lib/database')();
            var autogen= codegen();
            fullname =(req.body.fname +" "+ req.body.lname);
            code = autogen;
                db.query("INSERT INTO tbluser (userfname, userlname, usergender, userbday, useraddress, usermobile, useremail, userusername, memrateid, branch, specialization, usertype,paymentcode ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 8, ? ) ",[ req.body.fname, req.body.lname, req.body.gen, req.body.bday, req.body.addr, req.body.mobile, req.body.email, req.body.username, req.body.membership, req.body.branch, req.body.specs, autogen], (err, results, fields)=>{
                    db.query('select u.userfname,u.userlname ,mems.memrateid,mems.memfee,ct.membershipname,cl.memclassname from tbluser u inner join tblmemrates mems ON u.memrateid=mems.memrateid inner join tblcat ct ON mems.memcat=ct.membershipID inner join tblmemclass cl ON mems.memclass= cl.memclassid where userid=?',[req.newuserid],(err, results, fields)=>{
                        members=(results[0].memclassname +" "+results[0].membershipname)
                        fee=results[0].memfee
                                if (err) console.log(err);
                                    else{
                                        mailer.sendMail({
                                            from: 'ateamsupmanila@gmail.com',
                                            to:req.body.email,
                                            subject:'Payment Code ',
                                            html:
                                                "<table cellpadding='0' cellspacing='0' width='50%' style='margin:0 auto; box-shadow: 0 2px 10px -2px rgba(0, 0, 0, .2);'> <tr> <td bgcolor='gold' style='width:70%; margin:0 auto; box-shadow: 0 2px 10px -2px rgba(0, 0, 0, .2);'> <table cellpadding='0' cellspacing='0' width='100%' style='max-width: 500px;' class='wrapper'> <tr> <td valign='top' style='padding: 0 10px;' class='logo'><a href='http://litmus.com' target='_blank'> <img src='https://i.imgur.com/zeItuiJ.png' width='60' height='60' style='border:4px solid white; border-radius:50%;position:relative; top:15px;display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;'> <span style='float:right; position:relative; color: white; top:-35px; left:-155px; font-size:28px; font-weight:bold;font-family:sans-serif;'> A - TEAM FITNESS</span></a></td></tr></table> </td></tr><tr> <td bgcolor='#333333'> <table cellpadding='0' cellspacing='0' width='100%' style='max-width: 500px;' class='wrapper'> <tr> <td style='padding: 20px 0;'></td></tr></table> </td></tr><tr> <td bgcolor='#ffffff' align='center' style='padding: 0 15px 10px 15px;' class='section-padding'> <table cellpadding='0' cellspacing='0' width='100%' style='max-width: 500px;' class='responsive-table'> <tr> <td> <table width='100%' cellspacing='0' cellpadding='0'> <tr> <td align='left' style='padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;' class='padding'><br>Hello <b> " +fullname+ " </b>, <br><br>Thank you for subscribing to our <b> " +members+ " Membership application </b>. To complete the membership application, you need to present this code to one of our branches or the admin itself and pay the necessary amount depending on the membership you chose in order to validate and officially register your application.<br><br><br></td></tr><tr> <td align='center'> <div style='background-color:#333333; width:100%; height:100px; margin-bottom:20px'> <p align='center' style='font-size: 40px; font-family: Helvetica, Arial, sans-serif; color: #f1e8e8; padding-top: 30px;'>"+code+"</p></div></td></tr></table> </td></tr></table> </td></tr><tr> <td bgcolor='#F5F7FA' align='center' style='padding: 0 0 20px 0;' class='section-padding'> <table cellpadding='0' cellspacing='0' width='100%' style='max-width: 500px;' class='responsive-table'> <tr> <td align='left' style='padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;'>Total Amount: <b>PHP "+fee+".00</b> <br></tr></table></td></tr><tr><td bgcolor=' #E6E9ED' align='center' style='padding: 0' class='section-padding'> <table cellpadding='0' cellspacing='0' width='100%' style='padding-bottom: 20px; max-width: 500px;' class='responsive-table'> <tr> <td align='center' style='padding: 40px 0 0 0; font-size: 25px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #333333;' class='padding' colspan='2'><b>Current Rates</b></td></tr><tr> <td align='center' height='100%' valign='top' width='100%' colspan='2'> <table align='center' cellpadding='0' cellspacing='0' width='100%' style='max-width:500;'> <tr> <td align='center' valign='top' style='font-size:0;'> <div style='display:inline-block; margin: 0 -2px; max-width:385px; vertical-align:top; width:100%;'> <table align='left' cellpadding='0' cellspacing='0' width='100%'> <tr> <td style='padding: 40px 0 0 0;' class='no-padding'> <table cellspacing='0' cellpadding='0' width='100%'> <tr> <td align='left' style='padding: 0 0 5px 25px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #333333;' class='padding'>GOLD Membership</td></tr><tr> <td align='left' style='padding: 10px 0 15px 25px; font-size: 16px; line-height: 24px; font-family: Helvetica, Arial, sans-serif; color: #666666;' class='padding'>Interbranch: <b>PHP 5000.00</b><br>Exclusive: <b>PHP "+fee+"</b></td></tr></table> </td></tr></table> </div></td></tr></table> </td></tr><tr> <td align='center' height='100%' valign='top' width='100%' colspan='2'> <table align='center' cellpadding='0' cellspacing='0' width='100%' style='max-width:500;'> <tr> <td align='center' valign='top' style='font-size:0;'> <div style='display:inline-block; margin: 0 -2px; max-width:385px; vertical-align:top; width:100%;'> <table align='left' cellpadding='0' cellspacing='0' width='100%'> <tr> <td style='padding: 40px 0 0 0;' class='no-padding'> <table cellspacing='0' cellpadding='0' width='100%'> <tr> <td align='left' style='padding: 0 0 5px 25px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #333333;' class='padding'>SILVER Membership</td></tr><tr> <td align='left' style='padding: 10px 0 15px 25px; font-size: 16px; line-height: 24px; font-family: Helvetica, Arial, sans-serif; color: #666666;' class='padding'>Interbranch: <b>PHP 5000.00</b><br>Exclusive: <b>PHP "+fee+".00</b></td></tr></table> </td></tr></table> </div></td></tr></table> </td></tr><tr> <td align='center' height='100%' valign='top' width='100%' colspan='2'> <table align='center' cellpadding='0' cellspacing='0' width='100%' style='max-width:500;'> <tr> <td align='center' valign='top' style='font-size:0;'> <div style='display:inline-block; margin: 0 -2px; max-width:385px; vertical-align:top; width:100%;'> <table align='left' cellpadding='0' cellspacing='0' width='100%'> <tr> <td style='padding: 40px 0 0 0;' class='no-padding'> <table cellspacing='0' cellpadding='0' width='100%'> <tr> <td align='left' style='padding: 0 0 5px 25px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #333333;' class='padding'>BRONZE Membership</td></tr><tr> <td align='left' style='padding: 10px 0 15px 25px; font-size: 16px; line-height: 24px; font-family: Helvetica, Arial, sans-serif; color: #666666;' class='padding'>Interbranch: <b>PHP 5000.00</b><br>Exclusive: <b>PHP "+fee+".00</b></td></tr></table> </td></tr></table> </div></td></tr></table><br><br></td></tr></table> </td></tr><tr> <td bgcolor='#333333' align='center' style='padding: 20px 0px;'> <table width='100%' cellspacing='0' cellpadding='0' align='center' style='max-width: 500px;' class='responsive-table'> <tr> <td align='center' style='font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#ffffff;'>Newton Plaza, 4408 Old. Sta. Mesa St. Sta. Mesa Manila, Philippines<br><a href='http://litmus.com' target='_blank' style='color: #ffffff; text-decoration: none;'>A-Team Fitness.com</a><span style='font-family: Arial, sans-serif; font-size: 12px; color: #444444;'>&nbsp;&nbsp;|&nbsp;&nbsp;</span><a style='color: #ffffff; text-decoration: none;'>by A-Team Fitness team</a></td></tr></table> </td></tr></table>",
                                            template: 'send', //name ng html file na irerender
                                            },
                                            function(err, response){
                                                if(err){
                                                    console.log("Payment code NOT sent!");
                                                    console.log(err);
                                                }
                                                else{
                                                    console.log("Payment code sent!");
                                                    }
                                                }
                                            );
                                        res.redirect('/login');
                            }
                    });
        });
 });

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

exports.login = loginRouter;
exports.logout = logoutRouter;
exports.signup = SignupRouter