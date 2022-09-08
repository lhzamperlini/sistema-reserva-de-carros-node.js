// Helper que impede usuario de acessar a dashboard sem estar logado.
module.exports.checkAuth = function (req, res, next) {
    const userId = req.session.userid

    if (!userId) {
        res.redirect('/login')
    }

    next()
}