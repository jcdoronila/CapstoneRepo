exports.hasAuth = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return next();
    return res.redirect('/login?unauthorized');
}

exports.noAuthed = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return res.redirect('/');
    return next();
}

//ADMIN
exports.adminHasAuth = (req, res, next) => {
    if (req.session && req.session.admin && Object.keys(req.session.admin).length > 0) return next();
    return res.redirect('/login?unauthorized');
}

exports.adminNoAuth = (req, res, next) => {
    if (req.session && req.session.admin && Object.keys(req.session.admin).length > 0) return res.redirect('/');
    return next();
}

//TRAINER
exports.trainerHasAuth = (req, res, next) => {
    if (req.session && req.session.trainer && Object.keys(req.session.trainer).length > 0) return next();
    return res.redirect('/login?unauthorized');
}

exports.trainerNoAuth = (req, res, next) => {
    if (req.session && req.session.trainer && Object.keys(req.session.trainer).length > 0) return res.redirect('/trainer');
    return next();
}
//MEMBER

exports.memberHasAuth = (req, res, next) => {
    if (req.session && req.session.member && Object.keys(req.session.member).length > 0) return next();
    return res.redirect('/login?unauthorized');
}

exports.memberNoAuth = (req, res, next) => {
    if (req.session && req.session.member && Object.keys(req.session.member).length > 0) return res.redirect('/member');
    return next();
}
//STAFF
exports.staffHasAuth = (req, res, next) => {
    if (req.session && req.session.staff && Object.keys(req.session.staff).length > 0) return next();
    return res.redirect('/login?unauthorized');
}

exports.staffNoAuth = (req, res, next) => {
    if (req.session && req.session.staff && Object.keys(req.session.staff).length > 0) return res.redirect('/staffs');
    return next();
}