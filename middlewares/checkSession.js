const checkSession = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
    res.locals.userNickname = req.session.userNickname;
    res.locals.userAdmin = req.session.userAdmin;
    return next();
  }
  return next();
};

module.exports = checkSession;
