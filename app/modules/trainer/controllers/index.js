module.exports = (req, res) => {
    if (typeof process.env.ENABLE_DATABASE !== 'undefined' && process.env.ENABLE_DATABASE === 'false') { 
        return render([]);
    }

    var db = require('../../../lib/database')();
    db.query('SELECT * FROM tbltrainer WHERE trainerid = ?', [req.session.trainer.trainerid], function(err,results,fields) {
        if (err) return res.send(err);
        render(results);
    });
     
    function render(){
        res.render('trainer/views/dashboard');
    }
}
